import { GuidExtensions } from "@tsukiy0/extensions-core";
import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { RequestHandler } from "express";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Request, Response } from "express";
import { promisifyHandler } from "@tsukiy0/extensions-express";

type Props = {
  apiSecretKey: ApiSecretKey;
};

export class JwtAuthMiddleware {
  private readonly key = `shopId__${GuidExtensions.generate()}`;

  constructor(
    private readonly getProps: (
      request: Request,
      response: Response,
    ) => Promise<Props>,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    try {
      const { apiSecretKey } = await this.getProps(req, res);
      const requestVerifier = new RequestVerifier({ apiSecretKey });
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        return res.status(401).end();
      }

      const jwt = authHeader.replace("Bearer ", "");
      const shopId = requestVerifier.verifyJwt(jwt);
      res.locals[this.key] = ShopId.check(shopId);
    } catch {
      return res.status(401).end();
    }
  });

  getShopId = (res: Response): ShopId => {
    return ShopId.check(res.locals[this.key]);
  };
}
