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
  UsageSubscriptionHandler,
  WebhookHandler,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  GqlAppUsageSubscriptionService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { Url } from "@tsukiy0/extensions-core";

export class App {
  static build = (): Application => {
    const app = express();

    const apiKey = ApiKey.check(process.env.API_KEY);
    const apiSecretKey = ApiSecretKey.check(process.env.API_SECRET_KEY);
    const accessTokenRepository = new MemoryAccessTokenRepository();
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      accessTokenRepository,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const appUsageSubscriptionService = new GqlAppUsageSubscriptionService(
      shopifyGraphQlClient,
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
      new AuthRouter({
        accessTokenRepository,
        apiKey,
        apiSecretKey,
        hostUrl: Url.check(process.env.HOST_URL),
        appUrl: Url.check("https://google.com"),
        requiredScopes: [
          "read_orders",
          "read_script_tags",
          "write_script_tags",
        ].map(AccessScope.check),
        onComplete: async (_) => console.log(_),
      }).build(),
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
