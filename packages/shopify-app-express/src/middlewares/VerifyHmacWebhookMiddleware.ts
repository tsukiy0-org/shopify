import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { Request, RequestHandler } from "express";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Response } from "express";
import { promisifyHandler } from "@tsukiy0/extensions-express";
import rawBody from "raw-body";

type Props = {
  apiSecretKey: ApiSecretKey;
};

type Data = {
  shopId: ShopId;
  topic: string;
  data: unknown;
};

export class VerifyHmacWebhookMiddleware {
  // private readonly key = `data__${GuidExtensions.generate()}`;
  private readonly key = `data1`;

  constructor(
    private readonly getProps: (
      request: Request,
      response: Response,
    ) => Promise<Props>,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const { apiSecretKey } = await this.getProps(req, res);
    const requestVerifier = new RequestVerifier({ apiSecretKey });
    const body = (await rawBody(req)).toString();

    try {
      const hmac = req.header("X-Shopify-Hmac-Sha256") as string;
      requestVerifier.verifyWebhook(hmac, body);
      const data: Data = {
        shopId: ShopId.check(req.header("X-Shopify-Shop-Domain")),
        topic: req.header("X-Shopify-Topic") as string,
        data: JSON.parse(body),
      };
      res.locals[this.key] = data;
    } catch {
      return res.status(401).end();
    }
  });

  getData = (res: Response): Data => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.locals[this.key];
  };
}
