import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { RequestHandler } from "express";
import { promisifyHandler } from "packages/shopify-app-express/dist/routers/utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Response } from "express";
import { GuidExtensions } from "@tsukiy0/extensions-core";

export class VerifyHmacQueryMiddleware {
  private readonly requestVerifier: RequestVerifier;
  private readonly key = `shopId__${GuidExtensions.generate()}`;

  constructor(config: { apiSecretKey: ApiSecretKey }) {
    this.requestVerifier = new RequestVerifier(config);
  }

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    try {
      const query = req.query;
      this.requestVerifier.verifyHmacQuery(query);
      res.locals[this.key] = ShopId.check(req.query.shop);
    } catch {
      return res.status(400);
    }
  });

  getShopId = (res: Response): ShopId => {
    return ShopId.check(res.locals[this.key]);
  };
}
