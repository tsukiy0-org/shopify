import { ShopId } from "../../../shared";
import { Record, Static, Array, InstanceOf } from "runtypes";
import { AccessScope } from "../../models/AccessScope";

export const StartInstallRequest = Record({
  shopId: ShopId,
  requiredScopes: Array(AccessScope).withConstraint((_) => _.length > 0),
  redirectUrl: InstanceOf(URL),
}).withBrand("StartInstallationRequest");

export type StartInstallRequest = Static<typeof StartInstallRequest>;
