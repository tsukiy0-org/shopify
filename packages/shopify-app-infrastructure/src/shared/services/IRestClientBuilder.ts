import { ShopId } from "@tsukiy0/shopify-app-core";

export interface IRestClientBuilder {
  build(shopId: ShopId): Promise<{
    baseUrl: string;
    headers: Record<string, string>;
  }>;
}
