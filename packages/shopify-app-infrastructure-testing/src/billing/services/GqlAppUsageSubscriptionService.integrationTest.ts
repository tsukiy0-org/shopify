import {
  AccessToken,
  BillingMoney,
  IAppUsageSubscriptionService,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { GqlAppUsageSubscriptionService } from "@tsukiy0/shopify-app-infrastructure";
import { ShopifyGraphQlClientSetup } from "../../testing/ShopifyGraphQlClientSetup";

describe("GqlAppUsageSubscriptionService", () => {
  const shopId = ShopId.check(process.env.SHOP_ID_1);
  let sut: IAppUsageSubscriptionService;

  beforeEach(() => {
    const token = AccessToken.check(process.env.SHOP_TOKEN_1);
    const client = ShopifyGraphQlClientSetup.setup({
      token,
    });
    sut = new GqlAppUsageSubscriptionService(client);
  });

  describe("create", () => {
    it("creates", async () => {
      const actual = await sut.create(
        shopId,
        "order verify",
        "terms",
        BillingMoney.check(120),
        "https://google.com",
        true,
      );

      expect(actual).toContain("confirm_recurring_application_charge");
    });
  });

  describe("get", () => {
    it("gets", async () => {
      const actual = await sut.get(shopId);

      expect(actual.shopId).toEqual(shopId);
      expect(actual.cappedAmount).toBeGreaterThan(0);
      expect(actual.balanceAmount).toBeLessThan(actual.cappedAmount);
      expect(actual.test).toBeTruthy();
    });
  });

  describe("createUsageCharge", () => {
    it("does it", async () => {
      const chargeAmount = 0.01;
      const original = await sut.get(shopId);

      const actualChargeId = await sut.createCharge(
        shopId,
        BillingMoney.check(chargeAmount),
        "test",
      );
      const actual = await sut.get(shopId);

      expect(actualChargeId).toBeDefined();
      expect(actual.balanceAmount - original.balanceAmount).toBeCloseTo(
        chargeAmount,
      );
    });
  });

  describe("updateCappedAmount", () => {
    it("does it", async () => {
      const amount = 1;
      const original = await sut.get(shopId);

      const actual = await sut.updateCappedAmount(
        shopId,
        BillingMoney.check(original.cappedAmount + amount),
      );

      expect(actual).toContain("confirm_update_capped_amount");
    });
  });
});
