import express, { Application } from "express";
import { MemoryAccessTokenRepository } from "./utils/MemoryAccessTokenRepository";
import { AuthRouter } from "@tsukiy0/shopify-app-express";
import {
  AccessScope,
  ApiKey,
  ApiSecretKey,
  Url,
} from "@tsukiy0/shopify-app-core";

export class App {
  static build = (): Application => {
    const app = express();

    const accessTokenRepository = new MemoryAccessTokenRepository();

    app.use("/success", (req, res) => {
      res.status(200).json({
        success: true,
      });
    });

    app.use(
      new AuthRouter(accessTokenRepository, {
        requiredScopes: [
          "read_orders",
          "read_script_tags",
          "write_script_tags",
        ].map(AccessScope.check),
        hostUrl: Url.check(process.env.HOST_URL),
        apiKey: ApiKey.check(process.env.API_KEY),
        apiSecretKey: ApiSecretKey.check(process.env.API_SECRET_KEY),
        onSuccess: async (_, res) => res.redirect("/success"),
        onComplete: async (_, res) => res.redirect("/success"),
      }).build(),
    );

    return app;
  };
}
