import { Record, Static, InstanceOf } from "runtypes";

export const StartInstallReponse = Record({
  authorizeUrl: InstanceOf(URL).optional(),
}).withBrand("StartInstallResponse");

export type StartInstallResponse = Static<typeof StartInstallReponse>;
