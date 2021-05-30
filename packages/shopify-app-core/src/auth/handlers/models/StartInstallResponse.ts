import { Record, Static } from "runtypes";
import { Url } from "../../../shared";

export const StartInstallReponse = Record({
  redirectUrl: Url,
});

export type StartInstallResponse = Static<typeof StartInstallReponse>;
