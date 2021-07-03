import { Url } from "@tsukiy0/extensions-core";
import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";

export interface IOAuthService {
  buildAuthorizeUrl(
    shopId: ShopId,
    scopes: AccessScope[],
    redirectUrl: Url,
    apiKey: ApiKey,
  ): Url;
  getAccessToken(
    shopId: ShopId,
    code: string,
    apiKey: ApiKey,
    apiSecretKey: ApiSecretKey,
  ): Promise<AccessToken>;
}
