import { Request, Response, Router } from "express";
import {
  StartInstallRequest,
  CompleteInstallRequest,
  ApiSecretKey,
  ShopId,
  Url,
  UrlExtensions,
  IAuthHandler,
} from "@tsukiy0/shopify-app-core";
import { promisifyHandler } from "./utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";

export class AuthRouter {
  constructor(
    private readonly buildDeps: (
      req: Request,
      res: Response,
    ) => {
      authHandler: IAuthHandler;
    },
    private readonly config: {
      hostUrl: Url;
      appUrl: Url;
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const requestVerifier = new RequestVerifier({
      apiSecretKey: this.config.apiSecretKey,
    });

    const verifyHmacQueryMiddleware = promisifyHandler(async (req, res) => {
      const query = req.query;
      requestVerifier.verifyHmacQuery(query);
    });

    router.use("/shopify/auth", verifyHmacQueryMiddleware);

    router.get(
      "/shopify/auth/start",
      promisifyHandler(async (req, res) => {
        const redirectUrl = UrlExtensions.appendPath(
          this.config.hostUrl,
          "/shopify/auth/complete",
        );
        const appUrl = UrlExtensions.appendQuery(
          this.config.appUrl,
          req.query as Record<string, string>,
        );
        const shopId = ShopId.check(req.query.shop);
        const { authHandler } = this.buildDeps(req, res);

        const response = await authHandler.startInstall(
          StartInstallRequest.check({
            shopId,
            redirectUrl,
          }),
        );

        if (response.authorizeUrl) {
          return res.redirect(response.authorizeUrl);
        }

        return res.redirect(appUrl);
      }),
    );

    router.get(
      "/shopify/auth/complete",
      promisifyHandler(async (req, res) => {
        const shopId = ShopId.check(req.query.shop);
        const { authHandler } = this.buildDeps(req, res);

        const response = await authHandler.completeInstall(
          CompleteInstallRequest.check({
            shopId,
            accessCode: req.query.code,
          }),
        );

        res.redirect(response.appUrl);
      }),
    );

    return router;
  };
}
