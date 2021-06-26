import { ShopId } from "@tsukiy0/shopify-app-core";
import { GraphQLClient } from "graphql-request";

export interface IGraphQlClientBuilder {
  build(shopId: ShopId): Promise<GraphQLClient>;
}
