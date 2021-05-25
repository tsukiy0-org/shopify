import { CompleteInstallRequest } from "./models/CompleteInstallRequest";
import { StartInstallRequest } from "./models/StartInstallRequest";
import { StartInstallResponse } from "./models/StartInstallResponse";

export interface IAuthHandler {
  startInstall(request: StartInstallRequest): Promise<StartInstallResponse>;
  completeInstall(request: CompleteInstallRequest): Promise<void>;
}
