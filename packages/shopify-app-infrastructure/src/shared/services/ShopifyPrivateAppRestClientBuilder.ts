import { ShopId } from "@tsukiy0/shopify-app-core";
import { API_VERSION } from "./constants";
import { IRestClientBuilder } from "./IRestClientBuilder";

export class ShopifyPrivateAppRestClientBuilder implements IRestClientBuilder {
  constructor(
    private readonly apiKey: string,
    private readonly password: string,
  ) {}

  build = async (
    shopId: ShopId,
  ): Promise<{
    baseUrl: string;
    headers: Record<string, string>;
  }> => {
    return {
      baseUrl: `https://${this.apiKey}:${this.password}@${shopId}/admin/api/${API_VERSION}`,
      headers: {},
    };
  };
}
