import {
  AccessToken,
  IAccessTokenRepository,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient } from "../shared/services/ShopifyGraphQlClient";

class TestTokenRepository implements IAccessTokenRepository {
  constructor(private readonly token: AccessToken) {}

  put(shopId: ShopId, token: AccessToken): Promise<void> {
    throw new Error("Method not implemented.");
  }

  get = async (shopId: ShopId): Promise<AccessToken> => {
    return this.token;
  };
}

export class ShopifyGraphQlClientSetup {
  static setup = (config: { token: AccessToken }): ShopifyGraphQlClient => {
    const client = new ShopifyGraphQlClient(
      new TestTokenRepository(config.token),
    );

    return client;
  };
}
