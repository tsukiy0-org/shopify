import { ShopId } from "../../../shared";
import { Record, Static, String } from "runtypes";

export const CompleteInstallRequest = Record({
  shopId: ShopId,
  accessCode: String.withConstraint((_) => _.length > 0),
}).withBrand("CompleteInstallRequest");

export type CompleteInstallRequest = Static<typeof CompleteInstallRequest>;
