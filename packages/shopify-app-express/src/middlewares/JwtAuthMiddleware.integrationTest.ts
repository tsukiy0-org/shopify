import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import { ShopId } from "@tsukiy0/shopify-app-core";
import { ApiSecretKey } from "@tsukiy0/shopify-app-core";
import { AuthHelper } from "@tsukiy0/shopify-app-infrastructure-testing";
import fetch from "cross-fetch";

describe("JwtAuthMiddleware", () => {
  let apiUrl: Url;
  let token: string;

  beforeEach(() => {
    const config = new SystemConfiguration();
    apiUrl = Url.check(config.get("API_URL"));
    const shopifyApiSecretKey = ApiSecretKey.check(
      config.get("SHOPIFY_API_SECRET_KEY"),
    );
    const shopId = ShopId.check(config.get("SHOP_ID_1"));
    token = AuthHelper.generateJwt(shopId, shopifyApiSecretKey);
  });

  it("when good token then 200", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/private/v1");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.status).toEqual(200);
  });

  it("when no token then 401", async () => {
    const url = UrlExtensions.appendPath(apiUrl, "/private/v1");

    const res = await fetch(url, {
      method: "GET",
    });

    expect(res.status).toEqual(401);
  });
});
