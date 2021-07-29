import {
  SystemConfiguration,
  Url,
  UrlExtensions,
} from "@tsukiy0/extensions-core";
import {
  BillingMoney,
  CreateUsageSubscriptionRequest,
  CreateUsageSubscriptionResponse,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { ApiSecretKey } from "@tsukiy0/shopify-app-core";
import { AuthHelper } from "@tsukiy0/shopify-app-infrastructure-testing";
import fetch from "cross-fetch";

describe("UsageSubscriptionRouter", () => {
  let apiUrl: Url;
  let shopId: ShopId;
  let token: string;

  beforeEach(() => {
    const config = new SystemConfiguration();
    apiUrl = Url.check(config.get("API_URL"));
    const shopifyApiSecretKey = ApiSecretKey.check(
      config.get("SHOPIFY_API_SECRET_KEY"),
    );
    shopId = ShopId.check(config.get("SHOP_ID"));
    token = AuthHelper.generateJwt(shopId, shopifyApiSecretKey);
  });

  describe("/shopify/v1/billing/usage-subscription/create", () => {
    it("creates", async () => {
      const url = UrlExtensions.appendPath(
        apiUrl,
        "/shopify/v1/billing/usage-subscription/create",
      );
      const request: CreateUsageSubscriptionRequest = {
        shopId,
        cappedAmount: BillingMoney.check(20),
      };
      const res = await fetch(url, {
        body: JSON.stringify(request),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const body = CreateUsageSubscriptionResponse.check(await res.json());

      expect(body.authorizeUrl).toContain(
        "confirm_recurring_application_charge",
      );
    });
  });
});
