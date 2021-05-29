import { Router } from "express";
import {
  ApiSecretKey,
  ShopId,
  WebhookHandler,
} from "@tsukiy0/shopify-app-core";
import { promisifyHandler } from "./utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";
import { json } from "body-parser";

export class WebhookRouter {
  constructor(
    private readonly config: {
      apiSecretKey: ApiSecretKey;
      handlers: Record<string, (shopId: ShopId, data: any) => Promise<void>>;
      onError: (
        error: Error,
        shopId: ShopId,
        topic: string,
        data: any,
      ) => Promise<void>;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const requestVerifier = new RequestVerifier({
      apiSecretKey: this.config.apiSecretKey,
    });

    const handler = new WebhookHandler(this.config.handlers);

    const bodyParser = json({
      verify: (req: any, res, buf) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        req.rawBody = buf.toString("utf-8");
      },
    });

    const verifyHandler = promisifyHandler(async (req, res) => {
      requestVerifier.verifyWebhook(
        req.header("X-Shopify-Hmac-Sha256") as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (req as any).rawBody,
      );
    });

    router.use("/shopify/webhook", bodyParser, verifyHandler);

    router.post(
      "/shopify/webhook",
      promisifyHandler(async (req, res) => {
        const shopId = req.header("X-Shopify-Shop-Domain");
        const topic = req.header("X-Shopify-Topic");
        const data = req.body;

        try {
          await handler.handle(ShopId.check(shopId), topic as string, data);
        } catch (e) {
          await this.config.onError(e, shopId as ShopId, topic as string, data);
        } finally {
          res.status(200);
        }
      }),
    );

    return router;
  };
}
