import { Router } from "express";
import {
  AccessScope,
  ShopId,
  IAuthHandler,
  StartInstallRequest,
  CompleteInstallRequest,
} from "@tsukiy0/shopify-app-core";
import path from "path";
import { promisifyHandler } from "./utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";

export class AuthRouter {
  constructor(
    private readonly authHandler: IAuthHandler,
    private readonly requestVerifier: RequestVerifier,
    private readonly config: {
      requiredScopes: AccessScope[];
      hostUrl: URL;
      appUrl: URL;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    router.get(
      "/shopify/auth/start",
      promisifyHandler(async (req, res) => {
        this.requestVerifier.verifyAuth(req.query);

        const shopId = ShopId.check(req.query.shop);
        const redirectUrl = new URL(this.config.hostUrl.toString());
        redirectUrl.pathname = path.join(
          this.config.hostUrl.pathname,
          "/shopify/auth/complete",
        );

        const response = await this.authHandler.startInstall(
          StartInstallRequest.check({
            shopId,
            requiredScopes: this.config.requiredScopes,
            redirectUrl,
          }),
        );

        if (response.authorizeUrl) {
          return res.redirect(response.authorizeUrl.toString());
        }

        return res.redirect(this.config.appUrl.toString());
      }),
    );

    router.get(
      "/shopify/auth/complete",
      promisifyHandler(async (req, res) => {
        this.requestVerifier.verifyAuth(req.query);

        const shopId = ShopId.check(req.query.shop);

        await this.authHandler.completeInstall(
          CompleteInstallRequest.check({
            shopId,
            accessCode: req.query.code as string,
          }),
        );

        return res.redirect(this.config.appUrl.toString());
      }),
    );

    return router;
  };
}
