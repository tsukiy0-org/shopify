import {
  AccessToken,
  AccessTokenNotFoundError,
  IAccessTokenRepository,
  ShopId,
} from "@tsukiy0/shopify-app-core";

export class MemoryAccessTokenRepository implements IAccessTokenRepository {
  private store: {
    shopId: ShopId;
    accessToken: AccessToken;
  }[] = [];

  put = async (shopId: ShopId, token: AccessToken): Promise<void> => {
    const entry = this.store.find((_) => _.shopId == shopId);

    console.log(token);

    if (entry) {
      entry.accessToken = token;
    } else {
      this.store = [
        ...this.store,
        {
          shopId,
          accessToken: token,
        },
      ];
    }
  };

  get = async (shopId: ShopId): Promise<AccessToken> => {
    const entry = this.store.find((_) => _.shopId == shopId);

    if (!entry) {
      throw new AccessTokenNotFoundError();
    }

    return entry.accessToken;
  };
}
