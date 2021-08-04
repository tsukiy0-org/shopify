import crypto from "crypto";
import {
  ShopifyAppError,
  ApiSecretKey,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { verify } from "jsonwebtoken";

export class RequestVerifier {
  constructor(
    private readonly config: {
      apiSecretKey: ApiSecretKey;
    },
  ) {}

  verifyHmacQuery = (query: any): void => {
    const { hmac, ...rest } = query;

    const q = new URLSearchParams(rest);
    q.sort();

    const localHmac = crypto
      .createHmac("SHA256", this.config.apiSecretKey)
      .update(q.toString())
      .digest("hex");

    if (hmac !== localHmac) {
      throw new InvalidHmacQueryError();
    }
  };

  verifyWebhook = (hmac: string, body: string): void => {
    const localHmac = crypto
      .createHmac("SHA256", this.config.apiSecretKey)
      .update(body, "utf-8")
      .digest("base64");

    if (hmac !== localHmac) {
      throw new InvalidWebhookRequestError();
    }
  };

  verifyJwt = (jwt: string): ShopId => {
    const o = verify(jwt, this.config.apiSecretKey, {
      algorithms: ["HS256"],
    }) as unknown as {
      dest: string;
    };

    const dest = new URL(o.dest);

    return ShopId.check(dest.host);
  };
}

export class InvalidHmacQueryError extends ShopifyAppError {}

export class InvalidWebhookRequestError extends ShopifyAppError {}
