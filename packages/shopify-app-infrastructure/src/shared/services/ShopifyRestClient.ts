import {
  IAccessTokenRepository,
  ShopId,
  ShopifyAppError,
} from "@tsukiy0/shopify-app-core";
import fetch from "cross-fetch";
import { API_VERSION } from "./constants";

export class ShopifyRestClient {
  constructor(private readonly accessTokenRepository: IAccessTokenRepository) {}

  request = async <T = any>(
    shopId: ShopId,
    path: string,
    request: RequestInit,
  ): Promise<T> => {
    const token = await this.accessTokenRepository.get(shopId);
    const url = this.build(shopId, path);
    const r = await fetch(url, {
      ...request,
      headers: {
        ...request.headers,
        "X-Shopify-Access-Token": token,
        Accept: "application/json",
      },
    });

    if (r.status !== 200) {
      throw new ShopifyRequestError();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await r.json();
  };

  private build = (shopId: ShopId, path: string) => {
    return `https://${shopId}/admin/api/${API_VERSION}${path}`;
  };
}

export class ShopifyRequestError extends ShopifyAppError {}
