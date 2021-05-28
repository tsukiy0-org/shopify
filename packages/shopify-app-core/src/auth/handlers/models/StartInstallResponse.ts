import { Url } from "@tsukiy0/shopify-app-core";
import { Record, Static } from "runtypes";

export const StartInstallReponse = Record({
  authorizeUrl: Url.optional(),
});

export type StartInstallResponse = Static<typeof StartInstallReponse>;
