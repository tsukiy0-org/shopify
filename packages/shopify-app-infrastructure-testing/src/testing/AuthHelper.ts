import { ApiSecretKey } from "@tsukiy0/shopify-app-core";
import { ShopId } from "@tsukiy0/shopify-app-core";
import jwt from "jsonwebtoken";

export class AuthHelper {
  static generateJwt = (shopId: ShopId, apiSecretKey: ApiSecretKey): string => {
    const issuer = `https://${shopId}`;

    return jwt.sign(
      {
        dest: issuer,
      },
      apiSecretKey,
      {
        issuer,
        expiresIn: "1h",
        algorithm: "HS256",
      },
    );
  };
}
