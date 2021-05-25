import { ShopId } from "../../shared/models/ShopId";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IAppInstallationService } from "../services/IAppInstallationService";
import { IOAuthService } from "../services/IOAuthService";
import { IAuthHandler } from "./IAuthHandler";
import { CompleteInstallRequest } from "./models/CompleteInstallRequest";
import { StartInstallRequest } from "./models/StartInstallRequest";
import {
  StartInstallReponse,
  StartInstallResponse,
} from "./models/StartInstallResponse";

export class AuthHandler implements IAuthHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
    private readonly appInstallationService: IAppInstallationService,
    private readonly config: {
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
    },
  ) {}
  startInstall = async (
    request: StartInstallRequest,
  ): Promise<StartInstallResponse> => {
    const authorizeUrl = this.oAuthService.buildAuthorizeUrl(
      request.shopId,
      request.requiredScopes,
      request.redirectUrl,
      this.config.apiKey,
    );

    const token = await this.getToken(request.shopId);

    if (!token) {
      return StartInstallReponse.check({
        authorizeUrl,
      });
    }

    const scopes = await this.appInstallationService.listAccessScopes(
      request.shopId,
    );

    if (!this.hasRequiredScopes(request.requiredScopes, scopes)) {
      return StartInstallReponse.check({
        authorizeUrl,
      });
    }

    return StartInstallReponse.check({
      authorizeUrl: undefined,
    });
  };

  completeInstall = async (request: CompleteInstallRequest): Promise<void> => {
    const token = await this.oAuthService.getAccessToken(
      request.shopId,
      request.accessCode,
      this.config.apiKey,
      this.config.apiSecretKey,
    );

    await this.accessTokenRepository.put(request.shopId, token);
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
