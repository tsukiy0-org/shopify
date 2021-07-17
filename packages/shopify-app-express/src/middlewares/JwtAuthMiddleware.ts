import { GuidExtensions } from "@tsukiy0/extensions-core";
import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { RequestHandler } from "express";
import { RequestVerifier } from "../utils/RequestVerifier";
import { Response } from "express";

export class JwtAuthMiddleware {
  private readonly requestVerifier: RequestVerifier;
  private readonly key = `shopId__${GuidExtensions.generate()}`;

  constructor(config: { apiSecretKey: ApiSecretKey }) {
    this.requestVerifier = new RequestVerifier(config);
  }

  handler: RequestHandler = (req, res) => {
    try {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        return res.status(401);
      }

      const jwt = authHeader.replace("Bearer ", "");
      const shopId = this.requestVerifier.verifyJwt(jwt);
      res.locals[this.key] = ShopId.check(shopId);
    } catch {
      return res.status(401);
    }
  };

  getShopId = (res: Response): ShopId => {
    return ShopId.check(res.locals[this.key]);
  };
}
