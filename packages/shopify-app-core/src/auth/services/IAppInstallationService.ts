import { ShopId, Url } from "../../shared";
import { AccessScope } from "../models/AccessScope";

export interface IAppInstallationService {
  listAccessScopes(shopId: ShopId): Promise<AccessScope[]>;
  getAppUrl(shopId: ShopId): Promise<Url>;
}
