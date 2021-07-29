import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import crypto from "crypto";
import fetch from "cross-fetch";

describe("AuthRouter", () => {
  let apiUrl: Url;

  beforeEach(() => {
    const config = new SystemConfiguration();
    apiUrl = Url.check(config.get("API_URL"));
  });

  const createAuthStartUrl = () => {
    const config = new SystemConfiguration();
    const apiUrl = Url.check(config.get("API_URL"));
    const apiSecretKey = ApiSecretKey.check(
      config.get("SHOPIFY_API_SECRET_KEY"),
    );
    const shopId = ShopId.check(config.get("SHOP_ID"));
    const startUrlWithoutQuery = UrlExtensions.appendPath(
      apiUrl,
      "/shopify/v1/auth/start",
    );

    const q = new URLSearchParams();
    q.append("shop", shopId);

    const hmac = crypto
      .createHmac("SHA256", apiSecretKey)
      .update(q.toString())
      .digest("hex");

    return UrlExtensions.appendQuery(startUrlWithoutQuery, {
      shopId,
      hmac,
    });
  };

  it("", async () => {
    const url = createAuthStartUrl();
    const res = await fetch(url, {
      method: "GET",
    });

    console.log(res);
  });
});
