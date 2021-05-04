import { ShopId } from "../../shared";
import { ShopifyAppError } from "../../shared/models/ShopifyAppError";
import { AuthToken } from "../models/AuthToken";

export interface IAuthTokenService {
  set(shopId: ShopId, authToken: AuthToken): Promise<void>;
  get(shopId: ShopId): Promise<AuthToken>;
}

export class TokenNotFoundError extends ShopifyAppError {}
