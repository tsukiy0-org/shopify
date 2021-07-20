import { RequestHandler, Response } from "express";
import { AccessScope, ApiKey, ApiSecretKey } from "@tsukiy0/shopify-app-core";
import { promisifyHandler } from "@tsukiy0/extensions-express";
import { IAuthHandler } from "@tsukiy0/shopify-app-core";
import { Url } from "@tsukiy0/extensions-core";
import {
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";

type Services = {
  authHandler: IAuthHandler;
};

export class ServicesMiddleware {
  constructor(
    private readonly props: {
      apiKey: ApiKey;
      apiSecretKey: ApiSecretKey;
      hostUrl: Url;
      appUrl: Url;
      requiredScopes: AccessScope[];
    },
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
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

    res.locals.services = services;
  });

  getServices = (res: Response): Services => {
    return res.locals.services as Services;
  };
}
