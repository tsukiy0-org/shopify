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

    app.use(
      new AuthRouter(accessTokenRepository, {
        requiredScopes: [
          "read_orders",
          "read_script_tags",
          "write_script_tags",
        ].map(AccessScope.check),
        hostUrl: Url.check(process.env.HOST_URL),
        appUrl: Url.check("https://google.com"),
        apiKey: ApiKey.check(process.env.API_KEY),
        apiSecretKey: ApiSecretKey.check(process.env.API_SECRET_KEY),
        onComplete: async () => {
          console.log("done");
        },
      }).build(),
    );

    return app;
  };
}
