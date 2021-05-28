import { ShopId, Url } from "../../../shared";
import { Record, Static, Array } from "runtypes";
import { AccessScope } from "../../models/AccessScope";

export const StartInstallRequest = Record({
  shopId: ShopId,
  requiredScopes: Array(AccessScope).withConstraint((_) => _.length > 0),
  redirectUrl: Url,
});

export type StartInstallRequest = Static<typeof StartInstallRequest>;
