import {
  ApiKey,
  ApiSecretKey,
  CreateUsageSubscriptionRequest,
  GetUsageSubscriptionRequest,
  IAccessTokenRepository,
  IUsageSubscriptionHandler,
  UpdateUsageSubscriptionCappedAmountRequest,
  UsageSubscriptionHandler,
} from "@tsukiy0/shopify-app-core";
import {
  GqlAppInstallationService,
  GqlAppUsageSubscriptionService,
  ShopifyGraphQlClient,
} from "@tsukiy0/shopify-app-infrastructure";
import { json } from "body-parser";
import { Request, Response, Router } from "express";
import { JwtAuthMiddleware } from "../middlewares/JwtAuthMiddleware";
import { promisifyHandler } from "./utils/promisifyHandler";

type Props = {
  apiKey: ApiKey;
  apiSecretKey: ApiSecretKey;
  accessTokenRepository: IAccessTokenRepository;
  name: string;
  terms: string;
  test: boolean;
};

export class UsageSubscriptionRouter {
  constructor(
    private readonly getProps: (req: Request, res: Response) => Promise<Props>,
  ) {}

  build = (): Router => {
    const router = Router();

    const jwtAuthMiddleware = new JwtAuthMiddleware(this.getProps);

    router.use(
      "/shopify/billing/usage-subscription",
      json(),
      jwtAuthMiddleware.handler,
    );

    router.post(
      "/shopify/billing/usage-subscription/create",
      promisifyHandler(async (req, res) => {
        const shopId = jwtAuthMiddleware.getShopId(res);
        const props = await this.getProps(req, res);
        const { usageSubscriptionHandler } = this.buildServices(props);

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
        const props = await this.getProps(req, res);
        const { usageSubscriptionHandler } = this.buildServices(props);

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
        const props = await this.getProps(req, res);
        const { usageSubscriptionHandler } = this.buildServices(props);

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

  private buildServices = (
    props: Props,
  ): {
    usageSubscriptionHandler: IUsageSubscriptionHandler;
  } => {
    const shopifyGraphQlClient = ShopifyGraphQlClient.buildPublic(
      props.accessTokenRepository,
    );
    const appUsageSubscriptionService = new GqlAppUsageSubscriptionService(
      shopifyGraphQlClient,
    );
    const appInstallationService = new GqlAppInstallationService(
      shopifyGraphQlClient,
    );
    const usageSubscriptionHandler = new UsageSubscriptionHandler(
      appUsageSubscriptionService,
      appInstallationService,
      {
        name: props.name,
        terms: props.terms,
        test: props.test,
      },
    );

    return {
      usageSubscriptionHandler,
    };
  };
}
