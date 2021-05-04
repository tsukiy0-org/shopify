import { ShopId } from "../../shared";
import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IOAuthService } from "../services/IOAuthService";

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
    shopId: ShopId,
    code: string,
    onInstalled: () => Promise<void>,
  ): Promise<void> => {
    const token = await this.oAuthService.getAccessToken(
      shopId,
      code,
      this.config.apiKey,
      this.config.apiSecretKey,
    );
    await this.accessTokenRepository.put(shopId, token);

    await onInstalled();
  };
}
