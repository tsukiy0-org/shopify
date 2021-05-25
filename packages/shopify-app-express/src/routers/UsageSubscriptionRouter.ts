import {
  CreateUsageSubscriptionChargeRequest,
  CreateUsageSubscriptionRequest,
  GetUsageSubscriptionRequest,
  UpdateUsageSubscriptionCappedAmountRequest,
} from "@tsukiy0/shopify-app-core";
import { IUsageSubscriptionHandler } from "@tsukiy0/shopify-app-core";
import { Router } from "express";
import { JwtAuthMiddleware } from "../middlewares/JwtAuthMiddleware";
import { promisifyHandler } from "./utils/promisifyHandler";

export class UsageSubscriptionRouter {
  constructor(
    private readonly authMiddleware: JwtAuthMiddleware,
    private readonly usageSubscriptionHandler: IUsageSubscriptionHandler,
  ) {}

  build = (): Router => {
    const router = Router();

    router.use(this.authMiddleware.build());

    router.post(
      "/shopify/billing/usage-subscription/create",
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const { authorizeUrl } = await this.usageSubscriptionHandler.create(
          CreateUsageSubscriptionRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.redirect(authorizeUrl.toString());
      }),
    );

    router.post(
      "/shopify/billing/usage-subscription/update-capped-amount",
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const {
          authorizeUrl,
        } = await this.usageSubscriptionHandler.updateCappedAmount(
          UpdateUsageSubscriptionCappedAmountRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.redirect(authorizeUrl.toString());
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

    router.post(
      "/shopify/billing/usage-subscription/create-charge",
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        await this.usageSubscriptionHandler.createCharge(
          CreateUsageSubscriptionChargeRequest.check({
            ...req.body,
            shopId,
          }),
        );

        return res.status(200);
      }),
    );

    return router;
  };
}
