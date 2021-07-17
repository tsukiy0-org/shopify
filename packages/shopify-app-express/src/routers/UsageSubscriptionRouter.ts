import {
  ApiSecretKey,
  CreateUsageSubscriptionRequest,
  GetUsageSubscriptionRequest,
  IUsageSubscriptionHandler,
  UpdateUsageSubscriptionCappedAmountRequest,
} from "@tsukiy0/shopify-app-core";
import { json } from "body-parser";
import { Request, Response, Router } from "express";
import { JwtAuthMiddleware } from "../middlewares/JwtAuthMiddleware";
import { promisifyHandler } from "./utils/promisifyHandler";

export class UsageSubscriptionRouter {
  constructor(
    private readonly buildDeps: (
      req: Request,
      res: Response,
    ) => {
      usageSubscriptionHandler: IUsageSubscriptionHandler;
    },
    private readonly config: {
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const jwtAuthMiddleware = new JwtAuthMiddleware({
      apiSecretKey: this.config.apiSecretKey,
    });

    router.use(
      "/shopify/billing/usage-subscription",
      json(),
      jwtAuthMiddleware.handler,
    );

    router.post(
      "/shopify/billing/usage-subscription/create",
      promisifyHandler(async (req, res) => {
        const shopId = jwtAuthMiddleware.getShopId(res);
        const { usageSubscriptionHandler } = this.buildDeps(req, res);

        const response = await usageSubscriptionHandler.create(
          CreateUsageSubscriptionRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.status(200).json(response);
      }),
    );

    router.post(
      "/shopify/billing/usage-subscription/update-capped-amount",
      promisifyHandler(async (req, res) => {
        const shopId = jwtAuthMiddleware.getShopId(res);
        const { usageSubscriptionHandler } = this.buildDeps(req, res);

        const response = await usageSubscriptionHandler.updateCappedAmount(
          UpdateUsageSubscriptionCappedAmountRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.status(200).json(response);
      }),
    );

    router.post(
      "/shopify/billing/usage-subscription/get",
      promisifyHandler(async (req, res) => {
        const shopId = jwtAuthMiddleware.getShopId(res);
        const { usageSubscriptionHandler } = this.buildDeps(req, res);

        const response = await usageSubscriptionHandler.get(
          GetUsageSubscriptionRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.status(200).json(response);
      }),
    );

    return router;
  };
}
