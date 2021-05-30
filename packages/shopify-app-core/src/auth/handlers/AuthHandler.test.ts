import { ShopId, UnauthorizedError, Url } from "../../shared";
import { AccessScope } from "../models/AccessScope";
import { AccessToken } from "../models/AccessToken";
import { ApiKey } from "../models/ApiKey";
import { ApiSecretKey } from "../models/ApiSecretKey";
import {
  AccessTokenNotFoundError,
  IAccessTokenRepository,
} from "../services/IAccessTokenRepository";
import { IAppInstallationService } from "../services/IAppInstallationService";
import { IOAuthService } from "../services/IOAuthService";
import { AuthHandler } from "./AuthHandler";
import { IAuthHandler } from "./IAuthHandler";
import { CompleteInstallRequest } from "./models/CompleteInstallRequest";
import { StartInstallRequest } from "./models/StartInstallRequest";

describe("AuthHandler", () => {
  const apiKey = ApiKey.check("apiKey");
  const apiSecretKey = ApiSecretKey.check("apiSecretKey");
  const requiredScopes = ["read_orders", "write_orders"].map(AccessScope.check);
  let accessTokenRepository: IAccessTokenRepository;
  let oAuthService: IOAuthService;
  let appInstallationService: IAppInstallationService;
  let onComplete: (shopId: ShopId) => Promise<void>;
  let sut: IAuthHandler;

  beforeEach(() => {
    accessTokenRepository = {} as IAccessTokenRepository;
    oAuthService = {} as IOAuthService;
    appInstallationService = {} as IAppInstallationService;
    onComplete = jest.fn();
    sut = new AuthHandler(
      accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey,
        apiSecretKey,
        onComplete,
        requiredScopes,
      },
    );
  });

  describe("startInstall", () => {
    const request: StartInstallRequest = {
      shopId: ShopId.check("test.myshopify.com"),
      completeUrl: Url.check("https://complete.com"),
      appUrl: Url.check("https://app.com"),
    };
    const authorizeUrl = Url.check("https://install.com");

    beforeEach(() => {
      oAuthService.buildAuthorizeUrl = jest.fn().mockReturnValue(authorizeUrl);
    });

    it("when no token then call onInstall", async () => {
      accessTokenRepository.get = jest
        .fn()
        .mockRejectedValue(new AccessTokenNotFoundError());

      const actual = await sut.startInstall(request);

      expect(oAuthService.buildAuthorizeUrl).toHaveBeenCalledWith(
        request.shopId,
        requiredScopes,
        request.completeUrl,
        apiKey,
      );
      expect(actual).toEqual({
        redirectUrl: authorizeUrl,
      });
    });

    describe("when has token", () => {
      const accessToken = AccessToken.check("accessToken");

      beforeEach(() => {
        accessTokenRepository.get = jest.fn().mockResolvedValue(accessToken);
      });

      it("when unauthorized to get scope then return authorize url", async () => {
        appInstallationService.listAccessScopes = jest
          .fn()
          .mockRejectedValue(new UnauthorizedError());

        const actual = await sut.startInstall(request);

        expect(actual).toEqual({
          redirectUrl: authorizeUrl,
        });
      });

      it("when not have scopes then return authorize url", async () => {
        appInstallationService.listAccessScopes = jest
          .fn()
          .mockResolvedValue(["read_orders"].map(AccessScope.check));

        const actual = await sut.startInstall(request);

        expect(actual).toEqual({
          redirectUrl: authorizeUrl,
        });
      });

      [
        ["read_orders", "write_orders"],
        ["read_orders", "write_orders", "other_access"],
      ].forEach((scopes) => {
        it("when has scopes then return app url", async () => {
          appInstallationService.listAccessScopes = jest
            .fn()
            .mockResolvedValue(scopes.map(AccessScope.check));

          const actual = await sut.startInstall(request);

          expect(actual).toEqual({
            redirectUrl: request.appUrl,
          });
        });
      });
    });
  });

  describe("completeInstall", () => {
    it("puts token into repository and calls onInstalled", async () => {
      const accessToken = AccessToken.check("accessToken");
      const appUrl = Url.check("https://google.com");
      const request: CompleteInstallRequest = {
        shopId: ShopId.check("test.myshopify.com"),
        accessCode: "accessCode",
      };

      oAuthService.getAccessToken = jest.fn().mockResolvedValue(accessToken);
      appInstallationService.getAppUrl = jest.fn().mockResolvedValue(appUrl);
      accessTokenRepository.put = jest.fn();

      const actual = await sut.completeInstall(request);

      expect(actual).toEqual({
        appUrl,
      });
      expect(onComplete).toHaveBeenCalledWith(request.shopId);
      expect(oAuthService.getAccessToken).toHaveBeenCalledWith(
        request.shopId,
        request.accessCode,
        apiKey,
        apiSecretKey,
      );
      expect(accessTokenRepository.put).toHaveBeenCalledWith(
        request.shopId,
        accessToken,
      );
    });
  });
});
