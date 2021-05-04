import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IAppInstallationService } from "../services/IAppInstallationService";
import { IOAuthService } from "../services/IOAuthService";

export class StartInstallHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
    private readonly appInstallationService: IAppInstallationService,
  ) {}

  handle = async (
    shopId: ShopId,
    requiredScopes: AccessScope[],
    redirectUrl: URL,
    onInstall: (authorizeUrl: URL) => Promise<void>,
    onInstalled: () => Promise<void>,
  ): Promise<void> => {
    const authorizeUrl = this.oAuthService.buildAuthorizeUrl(
      shopId,
      requiredScopes,
      redirectUrl,
    );

    const token = await this.getToken(shopId);

    if (!token) {
      await onInstall(authorizeUrl);
      return;
    }

    const scopes = await this.appInstallationService.listAccessScopes(shopId);

    if (!this.hasRequiredScopes(requiredScopes, scopes)) {
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
