import { IAppInstallationService } from "../../auth";
import { ShopId } from "../../shared";
import { AppSubscriptionId } from "../models/AppSubscriptionId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";
import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UsageSubscriptionHandler } from "./UsageSubscriptionHandler";

describe("UsageSubscriptionHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  const config = {
    name: "my app name",
    terms: "my app terms",
    test: false,
  };
  let appUsageSubscriptionService: IAppUsageSubscriptionService;
  let appInstallationService: IAppInstallationService;
  let sut: UsageSubscriptionHandler;

  beforeEach(() => {
    appUsageSubscriptionService = {} as IAppUsageSubscriptionService;
    appInstallationService = {} as IAppInstallationService;
    sut = new UsageSubscriptionHandler(
      appUsageSubscriptionService,
      appInstallationService,
      config,
    );
  });

  describe("create", () => {
    it("returns authorization url", async () => {
      const appUrl = new URL("https://google.com");
      const authorizeUrl = new URL("https://apple.com");
      appInstallationService.getAppUrl = jest.fn().mockResolvedValue(appUrl);
      appUsageSubscriptionService.create = jest
        .fn()
        .mockResolvedValue(authorizeUrl);
      const request = CreateUsageSubscriptionRequest.check({
        shopId,
        name: "my app name",
        cappedAmount: 100,
      });

      const actual = await sut.create(request);

      expect(actual.authorizeUrl).toEqual(authorizeUrl);
      expect(appUsageSubscriptionService.create).toHaveBeenCalledWith(
        shopId,
        config.name,
        config.terms,
        request.cappedAmount,
        appUrl,
        config.test,
      );
    });
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
          test: true,
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
