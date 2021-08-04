import {
  GuidExtensions,
  PromiseExtensions,
  SystemConfiguration,
  TimespanExtensions,
} from "@tsukiy0/extensions-core";
import { ShopId } from "@tsukiy0/shopify-app-core";
import {
  DynamoAccessTokenRepository,
  DynamoWebhookTestRepository,
} from "@tsukiy0/shopify-app-infrastructure-testing";
import {
  CollectionCreatePayload,
  MutationCollectionCreateArgs,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import { Guid } from "@tsukiy0/extensions-core";
import {
  ShopifyGraphQlClient,
  ShopifyUserError,
} from "@tsukiy0/shopify-app-infrastructure";

class GqlCollectionService {
  constructor(private readonly client: ShopifyGraphQlClient) {}

  create = async (shopId: ShopId, title: Guid): Promise<void> => {
    const result = await this.client.request<
      {
        collectionCreate: CollectionCreatePayload;
      },
      MutationCollectionCreateArgs
    >(
      shopId,
      gql`
        mutation Test($input: CollectionInput!) {
          collectionCreate(input: $input) {
            collection {
              id
              title
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        input: {
          title,
        },
      },
    );

    if (result.collectionCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.collectionCreate.userErrors);
    }
  };
}

describe("WebhookRouter", () => {
  let shopId: ShopId;
  let collectionService: GqlCollectionService;
  let webhookTestRepository: DynamoWebhookTestRepository;

  beforeEach(() => {
    const config = new SystemConfiguration();
    const accessTokenRepository = DynamoAccessTokenRepository.build(
      config.get("TABLE_NAME"),
    );
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      accessTokenRepository,
    );
    shopId = ShopId.check(config.get("SHOP_ID_1"));
    collectionService = new GqlCollectionService(shopifyGraphQlClient);
    webhookTestRepository = DynamoWebhookTestRepository.build(
      config.get("TABLE_NAME"),
    );
  });

  it("triggers webhook", async () => {
    const title = GuidExtensions.generate();
    await collectionService.create(shopId, title);
    await PromiseExtensions.sleep(TimespanExtensions.seconds(10));

    const actual = await webhookTestRepository.exists(shopId, title);

    expect(actual).toBeTruthy();
  });
});
