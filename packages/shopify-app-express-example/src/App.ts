import express, { Application } from "express";
import { MemoryAccessTokenRepository } from "./utils/MemoryAccessTokenRepository";
import {
  AuthRouter,
  UsageSubscriptionRouter,
  WebhookRouter,
} from "@tsukiy0/shopify-app-express";
import {
  AccessScope,
  ApiKey,
  ApiSecretKey,
  AuthHandler,
  UsageSubscriptionHandler,
  WebhookHandler,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  GqlAppUsageSubscriptionService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { Url } from "@tsukiy0/extensions-core";

export class App {
  static build = (): Application => {
    const app = express();

    const apiKey = ApiKey.check(process.env.API_KEY);
    const apiSecretKey = ApiSecretKey.check(process.env.API_SECRET_KEY);
    const accessTokenRepository = new MemoryAccessTokenRepository();
    const oAuthService = new HttpOAuthService();
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const appUsageSubscriptionService = new GqlAppUsageSubscriptionService(
      shopifyGraphQlClient,
    );
    const authHandler = new AuthHandler(
      accessTokenRepository,
      oAuthService,
      appInstallationService,
      {
        apiKey,
        apiSecretKey,
        requiredScopes: [
          "read_orders",
          "read_script_tags",
          "write_script_tags",
        ].map(AccessScope.check),
        onComplete: async () => {
          console.log("done");
        },
      },
    );
    const webhookHandler = new WebhookHandler({});
    const usageSubscriptionHandler = new UsageSubscriptionHandler(
      appUsageSubscriptionService,
      appInstallationService,
      {
        name: "test name",
        terms: "test terms",
        test: true,
      },
    );

    app.use(
      new AuthRouter(
        () => {
          return { authHandler };
        },
        {
          hostUrl: Url.check(process.env.HOST_URL),
          appUrl: Url.check("https://google.com"),
          apiSecretKey,
        },
      ).build(),
    );

    app.use(
      new WebhookRouter(webhookHandler, {
        apiSecretKey,
      }).build(),
    );

    app.use(
      new UsageSubscriptionRouter(
        () => {
          return { usageSubscriptionHandler };
        },
        {
          apiSecretKey,
        },
      ).build(),
    );

    return app;
  };
}
