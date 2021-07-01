import {
  IAccessTokenRepository,
  ShopId,
  ShopifyAppError,
} from "@tsukiy0/shopify-app-core";
import fetch from "cross-fetch";
import { IRestClientBuilder } from "./IRestClientBuilder";
import { ShopifyPrivateAppRestClientBuilder } from "./ShopifyPrivateAppRestClientBuilder";
import { ShopifyPublicAppRestClientBuilder } from "./ShopifyPublicAppRestClientBuilder";

export class ShopifyRestClient {
  constructor(private readonly clientBuilder: IRestClientBuilder) {}

  static buildPublic = (
    accessTokenRepository: IAccessTokenRepository,
  ): ShopifyRestClient => {
    const builder = new ShopifyPublicAppRestClientBuilder(
      accessTokenRepository,
    );
    return new ShopifyRestClient(builder);
  };

  static buildPrivate = (
    apiKey: string,
    password: string,
  ): ShopifyRestClient => {
    const builder = new ShopifyPrivateAppRestClientBuilder(apiKey, password);
    return new ShopifyRestClient(builder);
  };

  request = async <T = any>(
    shopId: ShopId,
    path: string,
    request: RequestInit,
  ): Promise<T> => {
    const client = await this.clientBuilder.build(shopId);
    const url = `${client.baseUrl}${path}`;
    const r = await fetch(url, {
      ...request,
      headers: {
        Accept: "application/json",
        ...client.headers,
        ...request.headers,
      },
    });

    if (r.status !== 200) {
      throw new ShopifyRequestError();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await r.json();
  };
}

export class ShopifyRequestError extends ShopifyAppError {}
