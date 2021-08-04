import { Router } from "express";
import { JwtAuthMiddleware } from "packages/shopify-app-express/src/middlewares/JwtAuthMiddleware";
import { ServicesMiddleware } from "../middlewares/ServicesMiddleware";
import { promisifyHandler } from "@tsukiy0/extensions-express";
import { Guid } from "@tsukiy0/extensions-core";
import { json } from "body-parser";

export class PrivateRouter {
  constructor(private readonly servicesMiddleware: ServicesMiddleware) {}

  build = (): Router => {
    const router = Router();

    const jwtAuthMiddleware = new JwtAuthMiddleware(async (_, res) => {
      const { shopifyApiSecretKey } = this.servicesMiddleware.getServices(res);

      return {
        apiSecretKey: shopifyApiSecretKey,
      };
    });

    router.get(
      "/private/v1",
      jwtAuthMiddleware.handler,
      promisifyHandler(async (req, res) => {
        res.status(200).end();
      }),
    );

    router.post(
      "/private/v1/webhookTest",
      jwtAuthMiddleware.handler,
      json(),
      promisifyHandler(async (req, res) => {
        const shopId = jwtAuthMiddleware.getShopId(res);
        const { collectionService } = this.servicesMiddleware.getServices(res);
        const { title } = req.body;

        await collectionService.create(shopId, Guid.check(title));
      }),
    );

    return router;
  };
}
