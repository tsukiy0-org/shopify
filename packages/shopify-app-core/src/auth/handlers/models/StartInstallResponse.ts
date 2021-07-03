import { Url } from "@tsukiy0/extensions-core";
import { Record, Static } from "runtypes";

export const StartInstallReponse = Record({
  redirectUrl: Url,
});

export type StartInstallResponse = Static<typeof StartInstallReponse>;
