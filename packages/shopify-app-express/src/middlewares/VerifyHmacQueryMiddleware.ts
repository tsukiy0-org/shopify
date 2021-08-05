import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { Request, RequestHandler } from "express";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Response } from "express";
import { GuidExtensions } from "@tsukiy0/extensions-core";
import { promisifyHandler } from "@tsukiy0/extensions-express";

type Props = {
  apiSecretKey: ApiSecretKey;
};

export class VerifyHmacQueryMiddleware {
  private readonly key = `shopId__${GuidExtensions.generate()}`;

  constructor(
    private readonly getProps: (
      request: Request,
      response: Response,
    ) => Promise<Props>,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const { apiSecretKey } = await this.getProps(req, res);
    const requestVerifier = new RequestVerifier({ apiSecretKey });

    try {
      const query = req.query;
      requestVerifier.verifyHmacQuery(query);
      res.locals[this.key] = ShopId.check(req.query.shop);
    } catch (e) {
      res.status(401).end();
      throw e;
    }
  });

  getShopId = (res: Response): ShopId => {
    return ShopId.check(res.locals[this.key]);
  };
}
