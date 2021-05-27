import {
  ApiSecretKey,
  CreateUsageSubscriptionRequest,
  GetUsageSubscriptionRequest,
  IAccessTokenRepository,
  UpdateUsageSubscriptionCappedAmountRequest,
  UsageSubscriptionHandler,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { Router } from "express";
import { JwtAuthMiddleware } from "../middlewares/JwtAuthMiddleware";
import { promisifyHandler } from "./utils/promisifyHandler";
import { GqlAppUsageSubscriptionService } from "@tsukiy0/shopify-app-infrastructure";

export class UsageSubscriptionRouter {
  constructor(
    private readonly accessTokenRepository: IAccessTokenRepository,
    private readonly config: {
      apiSecretKey: ApiSecretKey;
      name: string;
      terms: string;
      test: boolean;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const jwtAuthMiddleware = new JwtAuthMiddleware({
      apiSecretKey: this.config.apiSecretKey,
    }).build();

    const shopifyGraphQlClient = new ShopifyGraphQlClient(
      this.accessTokenRepository,
    );
    const appUsageSubscriptionService = new GqlAppUsageSubscriptionService(
      shopifyGraphQlClient,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const handler = new UsageSubscriptionHandler(
      appUsageSubscriptionService,
      appInstallationService,
      {
        name: this.config.name,
        terms: this.config.terms,
        test: this.config.test,
      },
    );

    router.post(
      "/shopify/billing/usage-subscription/create",
      jwtAuthMiddleware,
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const { authorizeUrl } = await handler.create(
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
      jwtAuthMiddleware,
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const { authorizeUrl } = await handler.updateCappedAmount(
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
      jwtAuthMiddleware,
      promisifyHandler(async (req, res) => {
        const shopId = res.locals.shopId;

        const response = await handler.get(
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
