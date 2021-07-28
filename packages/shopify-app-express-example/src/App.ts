import express, { Application } from "express";
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
import { SystemConfiguration, Url } from "@tsukiy0/extensions-core";
import { DynamoAccessTokenRepository } from "./services/DynamoAccessTokenRepository";

export class App {
  static build = (): Application => {
    const app = express();

    const config = new SystemConfiguration();
    const apiKey = ApiKey.check(config.get("API_KEY"));
    const apiSecretKey = ApiSecretKey.check(config.get("API_SECRET_KEY"));
    const accessTokenRepository = DynamoAccessTokenRepository.build(
      config.get("TABLE_NAME"),
    );
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
