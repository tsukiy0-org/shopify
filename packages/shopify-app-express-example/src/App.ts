import express, { Application } from "express";
import cors from "cors";
import { json } from "body-parser";
import {
  GqlAppInstallationService,
  HttpOAuthService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { MemoryAccessTokenRepository } from "./utils/MemoryAccessTokenRepository";
import { AuthRouter } from "@tsukiy0/shopify-app-express";
import { ApiKey, ApiSecretKey } from "@tsukiy0/shopify-app-core";

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
      new AuthRouter(
        oAuthService,
        accessTokenRepository,
        appInstallationService,
        {
          requiredScopes: [],
          apiKey: ApiKey.check(process.env.API_KEY),
          apiSecretKey: ApiSecretKey.check(process.env.API_SECRET_KEY),
          hostUrl: new URL(""),
          onSuccess: async (res) => {
            res.status(200).end();
          },
        },
      ).build(),
    );

    app.get("/health", (_, res) => {
      console.log("hello");
      res.status(200);
      res.end();
    });

    return app;
  };
}
