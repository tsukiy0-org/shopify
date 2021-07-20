import { Router, Request, Response } from "express";
import {
  StartInstallRequest,
  CompleteInstallRequest,
  ApiSecretKey,
  ShopId,
  ApiKey,
  IAccessTokenRepository,
  AuthHandler,
  AccessScope,
  IAuthHandler,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { promisifyHandler } from "./utils/promisifyHandler";
import { Url, UrlExtensions } from "@tsukiy0/extensions-core";
import { VerifyHmacQueryMiddleware } from "../middlewares/VerifyHmacQueryMiddleware";

type Props = {
  accessTokenRepository: IAccessTokenRepository;
  apiKey: ApiKey;
  apiSecretKey: ApiSecretKey;
  hostUrl: Url;
  appUrl: Url;
  requiredScopes: AccessScope[];
  onComplete: (shopId: ShopId) => Promise<void>;
};

export class AuthRouter {
  constructor(
    private readonly getProps: (req: Request, res: Response) => Promise<Props>,
  ) {}

  build = (): Router => {
    const router = Router();

    const verifyHmacQueryMiddleware = new VerifyHmacQueryMiddleware(
      this.getProps,
    );

    router.get(
      "/shopify/v1/auth/start",
      verifyHmacQueryMiddleware.handler,
      promisifyHandler(async (req, res) => {
        const props = await this.getProps(req, res);
        const { authHandler } = this.buildServices(props);

        const completeUrl = UrlExtensions.appendPath(
          props.hostUrl,
          "/shopify/v1/auth/complete",
        );
        const appUrl = UrlExtensions.appendQuery(
          props.appUrl,
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
        const props = await this.getProps(req, res);
        const { authHandler } = this.buildServices(props);
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

  private buildServices = (
    props: Props,
  ): {
    authHandler: IAuthHandler;
  } => {
    const oAuthService = new HttpOAuthService();
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      props.accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const authHandler = new AuthHandler(
      props.accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey: props.apiKey,
        apiSecretKey: props.apiSecretKey,
        requiredScopes: props.requiredScopes,
        onComplete: props.onComplete,
      },
    );

    return {
      authHandler,
    };
  };
}
