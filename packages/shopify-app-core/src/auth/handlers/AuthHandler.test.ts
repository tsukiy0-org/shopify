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
  let accessTokenRepository: IAccessTokenRepository;
  let oAuthService: IOAuthService;
  let appInstallationService: IAppInstallationService;
  let sut: IAuthHandler;

  beforeEach(() => {
    accessTokenRepository = {} as IAccessTokenRepository;
    oAuthService = {} as IOAuthService;
    appInstallationService = {} as IAppInstallationService;
    sut = new AuthHandler(
      accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey,
        apiSecretKey,
      },
    );
  });

  describe("startInstall", () => {
    const request: StartInstallRequest = {
      shopId: ShopId.check("test.myshopify.com"),
      requiredScopes: ["read_orders", "write_orders"].map(AccessScope.check),
      redirectUrl: "https://success.com",
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
        request.requiredScopes,
        request.redirectUrl,
        apiKey,
      );
      expect(actual).toEqual({
        authorizeUrl,
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
          authorizeUrl,
        });
      });

      it("when not have scopes then return authorize url", async () => {
        appInstallationService.listAccessScopes = jest
          .fn()
          .mockResolvedValue(["read_orders"].map(AccessScope.check));

        const actual = await sut.startInstall(request);

        expect(actual).toEqual({
          authorizeUrl,
        });
      });

      [
        ["read_orders", "write_orders"],
        ["read_orders", "write_orders", "other_access"],
      ].forEach((scopes) => {
        it("when has scopes then return nothing", async () => {
          appInstallationService.listAccessScopes = jest
            .fn()
            .mockResolvedValue(scopes.map(AccessScope.check));

          const actual = await sut.startInstall(request);

          expect(actual).toEqual({
            authorizeUrl: undefined,
          });
        });
      });
    });
  });

  describe("completeInstall", () => {
    const request: CompleteInstallRequest = {
      shopId: ShopId.check("test.myshopify.com"),
      accessCode: "accessCode",
    };

    it("puts token into repository and calls onInstalled", async () => {
      const accessToken = AccessToken.check("accessToken");
      oAuthService.getAccessToken = jest.fn().mockResolvedValue(accessToken);
      accessTokenRepository.put = jest.fn();

      await sut.completeInstall(request);

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
