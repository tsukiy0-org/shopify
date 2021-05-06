import { ShopId } from "../../shared";
import { AppSubscriptionId } from "../models/AppSubscriptionId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";
import { IncreaseUsageSubscriptionCappedAmountHandler } from "./IncreaseUsageSubscriptionCappedAmountHandler";

describe("IncreaseUsageSubscriptionCappedAmountHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  let appUsageSubscriptionService: IAppUsageSubscriptionService;
  let sut: IncreaseUsageSubscriptionCappedAmountHandler;

  beforeEach(() => {
    appUsageSubscriptionService = {} as IAppUsageSubscriptionService;
    sut = new IncreaseUsageSubscriptionCappedAmountHandler(
      appUsageSubscriptionService,
    );
  });

  it("adds given amount to existing capped amount", async () => {
    const amount = BillingMoney.check(100);
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

    await sut.handle(shopId, amount);

    expect(appUsageSubscriptionService.updateCappedAmount).toHaveBeenCalledWith(
      shopId,
      BillingMoney.check(300),
    );
  });
});
