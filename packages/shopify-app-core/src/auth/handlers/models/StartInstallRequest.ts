import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";
import { Url } from "@tsukiy0/extensions-core";

export const StartInstallRequest = Record({
  shopId: ShopId,
  completeUrl: Url,
  appUrl: Url,
});

export type StartInstallRequest = Static<typeof StartInstallRequest>;
