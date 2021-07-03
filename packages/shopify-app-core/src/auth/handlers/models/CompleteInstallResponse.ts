import { Url } from "@tsukiy0/extensions-core";
import { Record, Static } from "runtypes";

export const CompleteInstallResponse = Record({
  appUrl: Url,
});

export type CompleteInstallResponse = Static<typeof CompleteInstallResponse>;
