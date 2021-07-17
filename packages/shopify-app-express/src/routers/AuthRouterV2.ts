import { Router } from "express";
import {
  StartInstallRequest,
  CompleteInstallRequest,
  ApiSecretKey,
  ShopId,
  ApiKey,
  IAccessTokenRepository,
  AuthHandler,
  AccessScope,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { promisifyHandler } from "./utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Url, UrlExtensions } from "@tsukiy0/extensions-core";

export class AuthRouterV2 {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly config: {
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
      hostUrl: Url;
      appUrl: Url;
      requiredScopes: AccessScope[];
      onComplete: (shopId: ShopId) => Promise<void>;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const oAuthService = new HttpOAuthService();
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      this.accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const authHandler = new AuthHandler(
      this.accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey: this.config.apiKey,
        apiSecretKey: this.config.apiSecretKey,
        requiredScopes: this.config.requiredScopes,
        onComplete: this.config.onComplete,
      },
    );

    const requestVerifier = new RequestVerifier({
      apiSecretKey: this.config.apiSecretKey,
    });

    const verifyHmacQueryMiddleware = promisifyHandler(async (req) => {
      const query = req.query;
      requestVerifier.verifyHmacQuery(query);
    });

    router.get(
      "/shopify/auth/start",
      verifyHmacQueryMiddleware,
      promisifyHandler(async (req, res) => {
        const completeUrl = UrlExtensions.appendPath(
          this.config.hostUrl,
          "/shopify/auth/complete",
        );
        const appUrl = UrlExtensions.appendQuery(
          this.config.appUrl,
          req.query as Record<string, string>,
        );
        const shopId = ShopId.check(req.query.shop);

        const response = await authHandler.startInstall(
          StartInstallRequest.check({
            shopId,
            completeUrl,
            appUrl,
          }),
        );

        return res.redirect(response.redirectUrl);
      }),
    );

    router.get(
      "/shopify/auth/complete",
      verifyHmacQueryMiddleware,
      promisifyHandler(async (req, res) => {
        const shopId = ShopId.check(req.query.shop);

        const response = await authHandler.completeInstall(
          CompleteInstallRequest.check({
            shopId,
            accessCode: req.query.code,
          }),
        );

        res.redirect(response.appUrl);
      }),
    );

    return router;
  };
}
