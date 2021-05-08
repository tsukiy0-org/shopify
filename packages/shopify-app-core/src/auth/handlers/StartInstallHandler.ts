import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IAppInstallationService } from "../services/IAppInstallationService";
import { IOAuthService } from "../services/IOAuthService";
import { StartInstallRequest } from "./models/StartInstallRequest";

export class StartInstallHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
    private readonly appInstallationService: IAppInstallationService,
    private readonly config: {
      apiKey: ApiKey;
    },
  ) {}

  handle = async (
    request: StartInstallRequest,
    onInstall: (authorizeUrl: URL) => Promise<void>,
    onInstalled: () => Promise<void>,
  ): Promise<void> => {
    const authorizeUrl = this.oAuthService.buildAuthorizeUrl(
      request.shopId,
      request.requiredScopes,
      request.redirectUrl,
      this.config.apiKey,
    );

    const token = await this.getToken(request.shopId);

    if (!token) {
      await onInstall(authorizeUrl);
      return;
    }

    const scopes = await this.appInstallationService.listAccessScopes(
      request.shopId,
    );

    if (!this.hasRequiredScopes(request.requiredScopes, scopes)) {
      await onInstall(authorizeUrl);
      return;
    }

    await onInstalled();
  };

  private getToken = async (
    shopId: ShopId,
  ): Promise<AccessToken | undefined> => {
    try {
      return await this.accessTokenRepository.get(shopId);
    } catch {
      return undefined;
    }
  };

  private hasRequiredScopes = (
    requiredScopes: AccessScope[],
    scopes: AccessScope[],
  ): boolean => {
    for (const scope of requiredScopes) {
      if (!scopes.includes(scope)) {
        return false;
      }
    }

    return true;
  };
}
