import { Request, Response, Router } from "express";
import {
  ApiSecretKey,
  IWebhookHandler,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { promisifyHandler } from "./utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";
import { json } from "body-parser";

export class WebhookRouter {
  constructor(
    private readonly buildDeps: (
      req: Request,
      res: Response,
    ) => {
      webhookHandler: IWebhookHandler;
      onError: (
        req: Request,
        res: Response,
        shopId: ShopId,
        topic: string,
        data: any,
        error: Error,
      ) => Promise<void>;
    },
    private readonly config: {
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  build = (): Router => {
    const router = Router();

    const requestVerifier = new RequestVerifier({
      apiSecretKey: this.config.apiSecretKey,
    });

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
        const { webhookHandler, onError } = this.buildDeps(req, res);

        try {
          await webhookHandler.handle(
            ShopId.check(shopId),
            topic as string,
            data,
          );
        } catch (e) {
          await onError(req, res, shopId as ShopId, topic as string, data, e);
        } finally {
          res.status(200).end();
        }
      }),
    );

    return router;
  };
}
