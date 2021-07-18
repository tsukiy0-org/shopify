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
import { Url, UrlExtensions } from "@tsukiy0/extensions-core";
import { VerifyHmacQueryMiddleware } from "../middlewares/VerifyHmacQueryMiddleware";

export class AuthRouter {
  constructor(
    private readonly props: {
      accessTokenRepository: IAccessTokenRepository;
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
      this.props.accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const authHandler = new AuthHandler(
      this.props.accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey: this.props.apiKey,
        apiSecretKey: this.props.apiSecretKey,
        requiredScopes: this.props.requiredScopes,
        onComplete: this.props.onComplete,
      },
    );

    const verifyHmacQueryMiddleware = new VerifyHmacQueryMiddleware({
      apiSecretKey: this.props.apiSecretKey,
    });

    router.get(
      "/shopify/v1/auth/start",
      verifyHmacQueryMiddleware.handler,
      promisifyHandler(async (req, res) => {
        const completeUrl = UrlExtensions.appendPath(
          this.props.hostUrl,
          "/shopify/v1/auth/complete",
        );
        const appUrl = UrlExtensions.appendQuery(
          this.props.appUrl,
          req.query as Record<string, string>,
        );
        const shopId = verifyHmacQueryMiddleware.getShopId(res);

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
      "/shopify/v1/auth/complete",
      verifyHmacQueryMiddleware.handler,
      promisifyHandler(async (req, res) => {
        const shopId = verifyHmacQueryMiddleware.getShopId(res);

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
