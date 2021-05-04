import { ShopId } from "../../shared";
import { ShopifyAppError } from "../../shared/models/ShopifyAppError";
import { AccessToken } from "../models/AccessToken";

export interface IAccessTokenRepository {
  set(shopId: ShopId, token: AccessToken): Promise<void>;
  get(shopId: ShopId): Promise<AccessToken>;
}

export class AccessTokenNotFoundError extends ShopifyAppError {}
