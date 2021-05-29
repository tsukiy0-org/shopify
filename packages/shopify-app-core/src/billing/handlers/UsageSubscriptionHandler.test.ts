import { IAppInstallationService } from "../../auth";
import { ShopId, Url } from "../../shared";
import { AppSubscriptionId } from "../models/AppSubscriptionId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";
import {
  IAppUsageSubscriptionService,
  SubscriptionNotFoundError,
} from "../services/IAppUsageSubscriptionService";
import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { GetUsageSubscriptionRequest } from "./models/GetUsageSubscriptionRequest";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UsageSubscriptionHandler } from "./UsageSubscriptionHandler";

describe("UsageSubscriptionHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  const config = {
    name: "my app name",
    terms: "my app terms",
    test: false,
  };
  const usageSubscription: UsageSubscription = {
    shopId,
    appSubscriptionId: AppSubscriptionId.check(
      "gid://shopify/AppSubscription/123",
    ),
    balanceAmount: BillingMoney.check(0),
    cappedAmount: BillingMoney.check(200),
    test: true,
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
      const appUrl = Url.check("https://google.com");
      const authorizeUrl = Url.check("https://apple.com");
      appInstallationService.getAppUrl = jest.fn().mockResolvedValue(appUrl);
      appUsageSubscriptionService.create = jest
        .fn()
        .mockResolvedValue(authorizeUrl);
      const request: CreateUsageSubscriptionRequest = {
        shopId,
        cappedAmount: BillingMoney.check(100),
      };

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

  describe("get", () => {
    it("returns subscription", async () => {
      appUsageSubscriptionService.get = jest
        .fn()
        .mockResolvedValue(usageSubscription);
      const request: GetUsageSubscriptionRequest = {
        shopId,
      };

      const actual = await sut.get(request);

      expect(actual).toEqual({
        usageSubscription,
      });
    });

    it("when does not exist then return nothing", async () => {
      appUsageSubscriptionService.get = jest
        .fn()
        .mockRejectedValue(new SubscriptionNotFoundError());
      const request: GetUsageSubscriptionRequest = {
        shopId,
      };

      const actual = await sut.get(request);

      expect(actual).toEqual({
        usageSubscription: undefined,
      });
    });
  });

  describe("updateCappedAmount", () => {
    it("adds given amount to existing capped amount", async () => {
      const request: UpdateUsageSubscriptionCappedAmountRequest = {
        shopId,
        addAmount: BillingMoney.check(100),
      };
      const confirmationUrl = Url.check("https://confirm.com");
      appUsageSubscriptionService.get = jest
        .fn()
        .mockResolvedValue(usageSubscription);
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
