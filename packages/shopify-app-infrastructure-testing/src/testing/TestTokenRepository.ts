import {
  AccessToken,
  IAccessTokenRepository,
  ShopId,
} from "@tsukiy0/shopify-app-core";

export class TestTokenRepository implements IAccessTokenRepository {
  constructor(private readonly token: AccessToken) {}

  put(shopId: ShopId, token: AccessToken): Promise<void> {
    throw new Error("Method not implemented.");
  }

  get = async (shopId: ShopId): Promise<AccessToken> => {
    return this.token;
  };
}
