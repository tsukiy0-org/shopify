import { IAccessTokenRepository, ShopId } from "@tsukiy0/shopify-app-core";
import { API_VERSION } from "./constants";
import { IRestClientBuilder } from "./IRestClientBuilder";

export class ShopifyPublicAppRestClientBuilder implements IRestClientBuilder {
  constructor(private readonly accessTokenRepository: IAccessTokenRepository) {}

  build = async (
    shopId: ShopId,
  ): Promise<{
    baseUrl: string;
    headers: Record<string, string>;
  }> => {
    const token = await this.accessTokenRepository.get(shopId);

    return {
      baseUrl: `https://${shopId}/admin/api/${API_VERSION}`,
      headers: {
        "X-Shopify-Access-Token": token,
      },
    };
  };
}
