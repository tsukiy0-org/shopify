import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";

export interface IOAuthService {
  buildAuthorizeUrl(
    shopId: ShopId,
    scopes: AccessScope[],
    redirectUrl: URL,
  ): URL;
  getAccessToken(shopId: ShopId, code: string): Promise<AccessToken>;
}
