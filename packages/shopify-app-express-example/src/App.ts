import express, { Application } from "express";
import {
  AuthRouter,
  UsageSubscriptionRouter,
  WebhookRouter,
} from "@tsukiy0/shopify-app-express";
import { AccessScope } from "@tsukiy0/shopify-app-core";
import { Url } from "@tsukiy0/extensions-core";
import {
  CorrelationMiddleware,
  LoggerMiddleware,
} from "@tsukiy0/extensions-express";
import { ServicesMiddleware } from "./middlewares/ServicesMiddleware";
import { PrivateRouter } from "./routers/PrivateRouter";

export class App {
  static build = (): Application => {
    const app = express();

    const correlationMiddleware = new CorrelationMiddleware();
    const loggerMiddleware = new LoggerMiddleware(
      "shopify-app-express-example",
      correlationMiddleware,
    );
    const servicesMiddleware = new ServicesMiddleware();
    const authRouter = new AuthRouter(async (_, res) => {
      const {
        shopifyApiKey,
        shopifyApiSecretKey,
        hostUrl,
        accessTokenRepository,
      } = servicesMiddleware.getServices(res);

      return {
        accessTokenRepository,
        apiKey: shopifyApiKey,
        apiSecretKey: shopifyApiSecretKey,
        hostUrl,
        appUrl: Url.check("https://google.com"),
        requiredScopes: [
          "read_orders",
          "read_script_tags",
          "write_script_tags",
        ].map(AccessScope.check),
        onComplete: async (_) => console.log(_),
      };
    }).build();

    const webhookRouter = new WebhookRouter(async (_, res) => {
      const { shopifyApiSecretKey, webhookHandler } =
        servicesMiddleware.getServices(res);

      return {
        webhookHandler,
        apiSecretKey: shopifyApiSecretKey,
      };
    }).build();

    const usageSubscriptionRouter = new UsageSubscriptionRouter(
      async (_, res) => {
        const { shopifyApiKey, shopifyApiSecretKey, accessTokenRepository } =
          servicesMiddleware.getServices(res);

        return {
          apiKey: shopifyApiKey,
          apiSecretKey: shopifyApiSecretKey,
          accessTokenRepository,
          name: "test name",
          terms: "test terms",
          test: true,
        };
      },
    ).build();

    const jwtAuthRouter = new PrivateRouter(servicesMiddleware);

    app.use(correlationMiddleware.handler);
    app.use(loggerMiddleware.handler);
    app.use(servicesMiddleware.handler);
    app.use(authRouter);
    app.use(webhookRouter);
    app.use(usageSubscriptionRouter);
    app.use(jwtAuthRouter);

    return app;
  };
}
