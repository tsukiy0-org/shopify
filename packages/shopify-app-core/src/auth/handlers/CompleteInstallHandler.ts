import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IOAuthService } from "../services/IOAuthService";
import { CompleteInstallRequest } from "./models/CompleteInstallRequest";

export class CompleteInstallHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
    private readonly config: {
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  handle = async (
    request: CompleteInstallRequest,
    onInstalled: () => Promise<void>,
  ): Promise<void> => {
    const token = await this.oAuthService.getAccessToken(
      request.shopId,
      request.accessCode,
      this.config.apiKey,
      this.config.apiSecretKey,
    );
    await this.accessTokenRepository.put(request.shopId, token);

    await onInstalled();
  };
}
