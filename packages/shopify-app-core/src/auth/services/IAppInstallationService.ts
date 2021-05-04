import { AccessScope } from "../models/AccessScope";

export interface IAppInstallationService {
  listAccessScopes(): Promise<AccessScope[]>;
}
