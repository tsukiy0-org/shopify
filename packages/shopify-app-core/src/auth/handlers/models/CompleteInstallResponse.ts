import { Record, Static } from "runtypes";
import { Url } from "../../../shared";

export const CompleteInstallResponse = Record({
  appUrl: Url,
});

export type CompleteInstallResponse = Static<typeof CompleteInstallResponse>;
