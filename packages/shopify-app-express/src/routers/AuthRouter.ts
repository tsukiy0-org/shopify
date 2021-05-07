import { Router } from "express";
import {
  AccessScope,
  AccessToken,
  AccessTokenNotFoundError,
  ApiKey,
  ApiSecretKey,
  CompleteInstallHandler,
  IAccessTokenRepository,
  IAppInstallationService,
  IOAuthService,
  ShopId,
  StartInstallHandler,
} from "@tsukiy0/shopify-app-core";
import path from "path";
import { promisifyHandler } from "./utils/promisifyHandler";

export class AuthRouter {
  constructor(
    private readonly oAuthService: IOAuthService,
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly appInstallationService: IAppInstallationService,
    private readonly config: {
      requiredScopes: AccessScope[];
      apiKey: ApiKey;
      apiSecret: ApiSecretKey;
      hostUrl: URL;
      onSuccess: () => Promise<void>;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    router.get(
      "/shopify/auth/start",
      promisifyHandler(async (req, res) => {
        // @TODO validate request

        const handler = new StartInstallHandler(
          this.accessTokenRepository,
          this.oAuthService,
          this.appInstallationService,
          {
            apiKey: this.config.apiKey,
          },
        );

        const shopId = ShopId.check(req.query.shop);

        const redirectUrl = new URL(this.config.hostUrl.toString());
        redirectUrl.pathname = path.join(
          this.config.hostUrl.pathname,
          "/shopify/auth/complete",
        );

        await handler.handle(
          shopId,
          this.config.requiredScopes,
          redirectUrl,
          async (authorizeUrl) => {
            res.redirect(authorizeUrl.toString());
          },
          this.config.onSuccess,
        );
      }),
    );

    router.get(
      "/shopify/auth/complete",
      promisifyHandler(async (req, res) => {
        // @TODO validate request

        const handler = new CompleteInstallHandler(
          this.accessTokenRepository,
          this.oAuthService,
          {
            apiKey: this.config.apiKey,
            apiSecretKey: this.config.apiSecret,
          },
        );

        const shopId = ShopId.check(req.query.shopId);

        await handler.handle(
          shopId,
          req.query.code as string,
          this.config.onSuccess,
        );
      }),
    );

    return router;
  };
}
