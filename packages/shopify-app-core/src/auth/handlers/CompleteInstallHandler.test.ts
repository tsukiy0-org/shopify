import { ShopId } from "../../shared";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";
import { IAccessTokenRepository } from "../services/IAccessTokenRepository";
import { IOAuthService } from "../services/IOAuthService";
import { CompleteInstallHandler } from "./CompleteInstallHandler";

describe("CompleteInstallHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  const apiKey = ApiKey.check("apiKey");
  const apiSecretKey = ApiSecretKey.check("apiSecretKey");
  let accessTokenRepository: IAccessTokenRepository;
  let oAuthService: IOAuthService;
  let onInstalled: () => Promise<void>;
  let sut: CompleteInstallHandler;

  beforeEach(() => {
    accessTokenRepository = {} as IAccessTokenRepository;
    oAuthService = {} as IOAuthService;
    onInstalled = jest.fn();
    sut = new CompleteInstallHandler(accessTokenRepository, oAuthService, {
      apiKey,
      apiSecretKey,
    });
  });

  it("puts token into repository and calls onInstalled", async () => {
    const code = "code";
    const accessToken = AccessToken.check("accessToken");
    oAuthService.getAccessToken = jest.fn().mockResolvedValue(accessToken);
    accessTokenRepository.put = jest.fn();

    await sut.handle(shopId, code, onInstalled);

    expect(oAuthService.getAccessToken).toHaveBeenCalledWith(
      shopId,
      code,
      apiKey,
      apiSecretKey,
    );
    expect(accessTokenRepository.put).toHaveBeenCalledWith(shopId, accessToken);
    expect(onInstalled).toHaveBeenCalled();
  });
});
