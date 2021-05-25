import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";
import {
  GqlAppInstallationService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { MemoryAccessTokenRepository } from "./utils/MemoryAccessTokenRepository";
import { AuthRouter, RequestVerifier } from "@tsukiy0/shopify-app-express";
import {
  AccessScope,
  ApiKey,
  ApiSecretKey,
  AuthHandler,
} from "@tsukiy0/shopify-app-core";

export class App {
  static build = (): Application => {
    const app = express();

    const accessTokenRepository = new MemoryAccessTokenRepository();
    const oAuthService = new HttpOAuthService();
    const shopifyGraphQlClient = new ShopifyGraphQlClient(
      accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );

    const authHandler = new AuthHandler(
      accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey: ApiKey.check(process.env.API_KEY),
        apiSecretKey: ApiSecretKey.check(process.env.API_SECRET_KEY),
      },
    );

    const requestVerifier = new RequestVerifier({
      apiSecretKey: ApiSecretKey.check(process.env.API_SECRET_KEY),
    });

    app.use(cors());
    app.use(
      json({
        verify: (req, res, buf) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (req as any).rawBody = buf.toString("utf-8");
        },
      }),
    );

    app.use(
      "/",
      new AuthRouter(authHandler, requestVerifier, {
        requiredScopes: [AccessScope.check("read_orders")],
        hostUrl: new URL(process.env.HOST_URL!),
        appUrl: new URL(process.env.APP_URL!),
      }).build(),
    );

    return app;
  };
}
