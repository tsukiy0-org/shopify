import { ShopId } from "@tsukiy0/shopify-app-core";
import { GraphQLClient } from "graphql-request";
import { API_VERSION } from "./constants";
import { IGraphQlClientBuilder } from "./IGraphQlClientBuilder";

export class ShopifyPrivateAppGraphQlClientBuilder
  implements IGraphQlClientBuilder
{
  constructor(
    private readonly apiKey: string,
    private readonly password: string,
  ) {}

  build = async (shopId: ShopId): Promise<GraphQLClient> => {
    return new GraphQLClient(
      `https://${this.apiKey}:${this.password}@${shopId}/admin/api/${API_VERSION}/graphql.json`,
      {},
    );
  };
}
