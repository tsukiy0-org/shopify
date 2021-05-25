import { ShopId } from "../../shared";
import { AppSubscriptionId } from "../models/AppSubscriptionId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UsageSubscriptionHandler } from "./UsageSubscriptionHandler";

describe("UsageSubscriptionHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  let appUsageSubscriptionService: IAppUsageSubscriptionService;
  let sut: UsageSubscriptionHandler;

  beforeEach(() => {
    appUsageSubscriptionService = {} as IAppUsageSubscriptionService;
    sut = new UsageSubscriptionHandler(appUsageSubscriptionService);
  });

  describe("updateCappedAmount", () => {
    it("adds given amount to existing capped amount", async () => {
      const request = UpdateUsageSubscriptionCappedAmountRequest.check({
        shopId,
        addAmount: 100,
      });
      const confirmationUrl = new URL("https://confirm.com");
      appUsageSubscriptionService.get = jest.fn().mockResolvedValue(
        UsageSubscription.check({
          shopId,
          appSubscriptionId: AppSubscriptionId.check(
            "gid://shopify/AppSubscription/123",
          ),
          balanceAmount: BillingMoney.check(0),
          cappedAmount: BillingMoney.check(200),
        }),
      );
      appUsageSubscriptionService.updateCappedAmount = jest
        .fn()
        .mockResolvedValue(confirmationUrl);

      await sut.updateCappedAmount(request);

      expect(
        appUsageSubscriptionService.updateCappedAmount,
      ).toHaveBeenCalledWith(shopId, 300);
    });
  });
});
