import {
  AccessScope,
  AccessToken,
  IOAuthService,
  ShopId,
} from "@tsukiy0/shopify-app-core";

export class HttpOAuthService implements IOAuthService {
  buildAuthorizeUrl = (
    shopId: ShopId,
    scopes: AccessScope[],
    redirectUrl: URL,
  ): URL => {
    throw new Error("Method not implemented.");
  };

  getAccessToken = async (
    shopId: ShopId,
    code: string,
  ): Promise<AccessToken> => {
    throw new Error("Method not implemented.");
  };
}
