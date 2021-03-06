import { Request, Response, Router } from "express";
import {
  ApiSecretKey,
  IWebhookHandler,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import {
  CorrelationMiddleware,
  LoggerMiddleware,
  promisifyHandler,
} from "@tsukiy0/extensions-express";
import { VerifyHmacWebhookMiddleware } from "../middlewares/VerifyHmacWebhookMiddleware";

type Props = {
  webhookHandler: IWebhookHandler;
  apiSecretKey: ApiSecretKey;
};

export class WebhookRouter {
  constructor(
    private readonly getProps: (
      request: Request,
      response: Response,
    ) => Promise<Props>,
    private readonly loggerMiddleware: LoggerMiddleware,
  ) {}

  build = (): Router => {
    const router = Router();

    const verifyHmacWebhookMiddleware = new VerifyHmacWebhookMiddleware(
      this.getProps,
    );

    router.post(
      "/shopify/v1/webhook",
      verifyHmacWebhookMiddleware.handler,
      promisifyHandler(async (req, res) => {
        const logger = this.loggerMiddleware.getLogger(res);
        const { webhookHandler } = await this.getProps(req, res);
        const { shopId, topic, data } =
          verifyHmacWebhookMiddleware.getData(res);

        try {
          await webhookHandler.handle(ShopId.check(shopId), topic, data);
        } catch (e) {
          logger.error(e, "Failed to handle webhook", {
            shopId,
            topic,
            data,
          });
        } finally {
          res.status(200).end();
        }
      }),
    );

    return router;
  };
}
