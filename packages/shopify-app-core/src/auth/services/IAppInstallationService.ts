import { Url } from "@tsukiy0/extensions-core";
import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";

export interface IAppInstallationService {
  listAccessScopes(shopId: ShopId): Promise<AccessScope[]>;
  getAppUrl(shopId: ShopId): Promise<Url>;
}
