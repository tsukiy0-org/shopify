import { ShopId, Url } from "../../../shared";
import { Record, Static } from "runtypes";

export const StartInstallRequest = Record({
  shopId: ShopId,
  redirectUrl: Url,
});

export type StartInstallRequest = Static<typeof StartInstallRequest>;
