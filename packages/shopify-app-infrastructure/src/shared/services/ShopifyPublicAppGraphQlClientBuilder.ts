import { IAccessTokenRepository, ShopId } from "@tsukiy0/shopify-app-core";
import { GraphQLClient } from "graphql-request";
import { API_VERSION } from "./constants";
import { IGraphQlClientBuilder } from "./IGraphQlClientBuilder";

export class ShopifyPublicAppGraphQlClientBuilder
  implements IGraphQlClientBuilder {
  constructor(private readonly accessTokenRepository: IAccessTokenRepository) {}

  build = async (shopId: ShopId): Promise<GraphQLClient> => {
    const token = await this.accessTokenRepository.get(shopId);
    return new GraphQLClient(
      `https://${shopId}/admin/api/${API_VERSION}/graphql.json`,
      {
        headers: {
          "X-Shopify-Access-Token": token,
        },
      },
    );
  };
}
