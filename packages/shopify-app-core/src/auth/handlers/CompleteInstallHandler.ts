import { ShopId } from "../../shared";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IOAuthService } from "../services/IOAuthService";

export class CompleteInstallHandler {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly oAuthService: IOAuthService,
  ) {}

  handle = async (
    shopId: ShopId,
    code: string,
    onInstalled: () => Promise<void>,
  ): Promise<void> => {
    const token = await this.oAuthService.getAccessToken(shopId, code);
    await this.accessTokenRepository.put(shopId, token);

    await onInstalled();
  };
}
