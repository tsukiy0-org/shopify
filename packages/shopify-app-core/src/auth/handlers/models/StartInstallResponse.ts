import { Record, Static } from "runtypes";
import { Url } from "../../../shared";

export const StartInstallReponse = Record({
  authorizeUrl: Url.optional(),
});

export type StartInstallResponse = Static<typeof StartInstallReponse>;
