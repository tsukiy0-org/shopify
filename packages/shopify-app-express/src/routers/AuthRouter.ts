import { Response, Router } from "express";
import {
  AccessScope,
  StartInstallRequest,
  CompleteInstallRequest,
  IAccessTokenRepository,
  AuthHandler,
  ApiKey,
  ApiSecretKey,
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
      hostUrl: URL;
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
      onSuccess: (res: Response) => Promise<void>;
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

    router.use(
      promisifyHandler(async (req, res) => {
        const query = req.query;
        requestVerifier.verifyHmacQuery(query);
      }),
    );

    router.get(
      "/shopify/auth/start",
      promisifyHandler(async (req, res) => {
        const redirectUrl = this.buildUrl("/shopify/auth/complete");

        const response = await handler.startInstall(
          StartInstallRequest.check({
            shopId: req.query.shop,
            requiredScopes: this.config.requiredScopes,
            redirectUrl,
          }),
        );

        if (response.authorizeUrl) {
          return res.redirect(response.authorizeUrl.toString());
        }

        await this.config.onSuccess(res);
      }),
    );

    router.get(
      "/shopify/auth/complete",
      promisifyHandler(async (req, res) => {
        await handler.completeInstall(
          CompleteInstallRequest.check({
            shopId: req.query.shop,
            accessCode: req.query.code,
          }),
        );

        await this.config.onSuccess(res);
      }),
    );

    return router;
  };

  private buildUrl = (appendPath: string) => {
    const newUrl = new URL(this.config.hostUrl.toString());
    newUrl.pathname = path.join(this.config.hostUrl.pathname, appendPath);
    return newUrl;
  };
}
