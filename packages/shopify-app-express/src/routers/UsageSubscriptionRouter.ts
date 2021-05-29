import {
  ApiSecretKey,
  CreateUsageSubscriptionRequest,
  GetUsageSubscriptionRequest,
  IUsageSubscriptionHandler,
  UpdateUsageSubscriptionCappedAmountRequest,
} from "@tsukiy0/shopify-app-core";
import { Router } from "express";
import { JwtAuthMiddleware } from "../middlewares/JwtAuthMiddleware";
import { promisifyHandler } from "./utils/promisifyHandler";

export class UsageSubscriptionRouter {
  constructor(
    private readonly usageSubscriptionHandler: IUsageSubscriptionHandler,
    private readonly config: {
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const jwtAuthMiddleware = new JwtAuthMiddleware({
      apiSecretKey: this.config.apiSecretKey,
    }).build();

    router.use("/shopify/billing/usage-subscription", jwtAuthMiddleware);

    router.post(
      "/shopify/billing/usage-subscription/create",
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const response = await this.usageSubscriptionHandler.create(
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
        const shopId = res.locals.shopId;

        const response = await this.usageSubscriptionHandler.updateCappedAmount(
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
        const shopId = res.locals.shopId;

        const response = await this.usageSubscriptionHandler.get(
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
