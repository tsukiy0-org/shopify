import { Response, Router } from "express";
import {
  AccessScope,
  StartInstallRequest,
  CompleteInstallRequest,
  IAccessTokenRepository,
  AuthHandler,
  ApiKey,
  ApiSecretKey,
  ShopId,
  Url,
} from "@tsukiy0/shopify-app-core";
import path from "path";
import { promisifyHandler } from "./utils/promisifyHandler";
import {
  GqlAppInstallationService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { RequestVerifier } from "../utils/RequestVerifier";

export class AuthRouter {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly config: {
      requiredScopes: AccessScope[];
      hostUrl: Url;
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
      onSuccess: (shopId: ShopId, res: Response) => Promise<void>;
      onComplete: (shopId: ShopId, res: Response) => Promise<void>;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const oAuthService = new HttpOAuthService();
    const shopifyGraphQlClient = new ShopifyGraphQlClient(
      this.accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );

    const handler = new AuthHandler(
      this.accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey: this.config.apiKey,
        apiSecretKey: this.config.apiSecretKey,
      },
    );

    const requestVerifier = new RequestVerifier({
      apiSecretKey: this.config.apiSecretKey,
    });

    const verifyHmacQueryMiddleware = promisifyHandler(async (req, res) => {
      const query = req.query;
      requestVerifier.verifyHmacQuery(query);
    });

    router.get(
      "/shopify/auth/start",
      verifyHmacQueryMiddleware,
      promisifyHandler(async (req, res) => {
        const redirectUrl = this.buildUrl("/shopify/auth/complete");
        const shopId = ShopId.check(req.query.shopId);

        const response = await handler.startInstall(
          StartInstallRequest.check({
            shopId,
            requiredScopes: this.config.requiredScopes,
            redirectUrl,
          }),
        );

        if (response.authorizeUrl) {
          return res.redirect(response.authorizeUrl);
        }

        await this.config.onSuccess(shopId, res);
      }),
    );

    router.get(
      "/shopify/auth/complete",
      verifyHmacQueryMiddleware,
      promisifyHandler(async (req, res) => {
        const shopId = ShopId.check(req.query.shopId);

        await handler.completeInstall(
          CompleteInstallRequest.check({
            shopId,
            accessCode: req.query.code,
          }),
        );

        await this.config.onComplete(shopId, res);
      }),
    );

    return router;
  };

  private buildUrl = (appendPath: string) => {
    const newUrl = new URL(this.config.hostUrl);
    newUrl.pathname = path.join(newUrl.pathname, appendPath);
    return newUrl;
  };
}
