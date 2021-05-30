import { UnauthorizedError } from "../../shared";
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
import { CompleteInstallResponse } from "./models/CompleteInstallResponse";
import { StartInstallRequest } from "./models/StartInstallRequest";
import { StartInstallResponse } from "./models/StartInstallResponse";

export class AuthHandler implements IAuthHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
    private readonly appInstallationService: IAppInstallationService,
    private readonly config: {
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
      requiredScopes: AccessScope[];
      onComplete: (shopId: ShopId) => Promise<void>;
    },
  ) {}
  startInstall = async (
    request: StartInstallRequest,
  ): Promise<StartInstallResponse> => {
    const authorizeUrl = this.oAuthService.buildAuthorizeUrl(
      request.shopId,
      this.config.requiredScopes,
      request.completeUrl,
      this.config.apiKey,
    );

    const token = await this.getToken(request.shopId);

    if (!token) {
      return {
        redirectUrl: authorizeUrl,
      };
    }

    try {
      const scopes = await this.appInstallationService.listAccessScopes(
        request.shopId,
      );

      if (!this.hasRequiredScopes(this.config.requiredScopes, scopes)) {
        return {
          redirectUrl: authorizeUrl,
        };
      }
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        return {
          redirectUrl: authorizeUrl,
        };
      }

      throw e;
    }

    return {
      redirectUrl: request.appUrl,
    };
  };

  completeInstall = async (
    request: CompleteInstallRequest,
  ): Promise<CompleteInstallResponse> => {
    const token = await this.oAuthService.getAccessToken(
      request.shopId,
      request.accessCode,
      this.config.apiKey,
      this.config.apiSecretKey,
    );

    await this.accessTokenRepository.put(request.shopId, token);

    await this.config.onComplete(request.shopId);

    return {
      appUrl: await this.appInstallationService.getAppUrl(request.shopId),
    };
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
