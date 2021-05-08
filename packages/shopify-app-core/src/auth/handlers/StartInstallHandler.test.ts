import { ShopId } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import {
  AccessTokenNotFoundError,
  IAccessTokenRepository,
} from "../services/IAccessTokenRepository";
import { IAppInstallationService } from "../services/IAppInstallationService";
import { IOAuthService } from "../services/IOAuthService";
import { StartInstallRequest } from "./models/StartInstallRequest";
import { StartInstallHandler } from "./StartInstallHandler";

describe("StartInstallHandler", () => {
  const request = StartInstallRequest.check({
    shopId: ShopId.check("test.myshopify.com"),
    requiredScopes: ["read_orders", "write_orders"].map(AccessScope.check),
    redirectUrl: new URL("https://success.com"),
  });
  const installUrl = new URL("https://install.com");
  const apiKey = ApiKey.check("apiKey");
  let accessTokenRepository: IAccessTokenRepository;
  let oAuthService: IOAuthService;
  let appInstallationService: IAppInstallationService;
  let onInstall: (authorizeUrl: URL) => Promise<void>;
  let onInstalled: () => Promise<void>;
  let sut: StartInstallHandler;

  beforeEach(() => {
    accessTokenRepository = {} as IAccessTokenRepository;
    oAuthService = {} as IOAuthService;
    appInstallationService = {} as IAppInstallationService;
    onInstall = jest.fn();
    onInstalled = jest.fn();
    sut = new StartInstallHandler(
      accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey,
      },
    );
  });

  beforeEach(() => {
    oAuthService.buildAuthorizeUrl = jest.fn().mockReturnValue(installUrl);
  });

  it("when no token then call onInstall", async () => {
    accessTokenRepository.get = jest
      .fn()
      .mockRejectedValue(new AccessTokenNotFoundError());

    await sut.handle(request, onInstall, onInstalled);

    expect(oAuthService.buildAuthorizeUrl).toHaveBeenCalledWith(
      request.shopId,
      request.requiredScopes,
      request.redirectUrl,
      apiKey,
    );
    expect(onInstall).toHaveBeenCalledWith(installUrl);
  });

  describe("when has token", () => {
    const accessToken = AccessToken.check("accessToken");

    beforeEach(() => {
      accessTokenRepository.get = jest.fn().mockResolvedValue(accessToken);
    });

    it("when not have scopes then call onInstall", async () => {
      appInstallationService.listAccessScopes = jest
        .fn()
        .mockResolvedValue(["read_orders"].map(AccessScope.check));

      await sut.handle(request, onInstall, onInstalled);

      expect(onInstall).toHaveBeenCalledWith(installUrl);
    });

    [
      ["read_orders", "write_orders"],
      ["read_orders", "write_orders", "other_access"],
    ].forEach((scopes) => {
      it("when has scopes then call onInstalled", async () => {
        appInstallationService.listAccessScopes = jest
          .fn()
          .mockResolvedValue(scopes.map(AccessScope.check));

        await sut.handle(request, onInstall, onInstalled);

        expect(onInstalled).toHaveBeenCalled();
      });
    });
  });
});
