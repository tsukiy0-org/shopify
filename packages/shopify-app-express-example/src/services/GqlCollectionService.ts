import {
  CollectionCreatePayload,
  MutationCollectionCreateArgs,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import { ShopId } from "@tsukiy0/shopify-app-core";
import { Guid } from "@tsukiy0/extensions-core";
import {
  ShopifyGraphQlClient,
  ShopifyUserError,
} from "@tsukiy0/shopify-app-infrastructure";

export class GqlCollectionService {
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
        mutation Test {
          collectionCreate(input: { title: "test" }) {
            collection {
              id
              title
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
