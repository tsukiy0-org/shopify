import { ApiSecretKey } from "@tsukiy0/shopify-app-core";
import { RequestHandler } from "express";
import { promisifyHandler } from "../routers/utils/promisifyHandler";
import { RequestVerifier } from "../utils/RequestVerifier";

export class JwtAuthMiddleware {
  private readonly requestVerifier: RequestVerifier;

  constructor(config: { apiSecretKey: ApiSecretKey }) {
    this.requestVerifier = new RequestVerifier(config);
  }

  build = (): RequestHandler => {
    return promisifyHandler(async (req, res) => {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        return res.status(401);
      }

      try {
        const jwt = authHeader.replace("Bearer ", "");
        const shopId = this.requestVerifier.verifyJwt(jwt);
        res.locals.shopId = shopId;
      } catch {
        return res.status(401);
      }
    });
  };
}
