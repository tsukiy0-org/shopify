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
  WebhookHandler,
} from "@tsukiy0/shopify-app-core";
import { Url } from "@tsukiy0/extensions-core";

export class App {
  static build = (): Application => {
    const app = express();

    const apiKey = ApiKey.check(process.env.API_KEY);
    const apiSecretKey = ApiSecretKey.check(process.env.API_SECRET_KEY);
    const accessTokenRepository = new MemoryAccessTokenRepository();
    const webhookHandler = new WebhookHandler({});

    app.use(
      new AuthRouter(async () => ({
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
      })).build(),
    );

    app.use(
      new WebhookRouter(async () => ({
        webhookHandler,
        apiSecretKey,
      })).build(),
    );

    app.use(
      new UsageSubscriptionRouter(async () => {
        return {
          apiKey,
          apiSecretKey,
          accessTokenRepository,
          name: "test name",
          terms: "test terms",
          test: true,
        };
      }).build(),
    );

    return app;
  };
}
