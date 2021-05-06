import { ShopId } from "../../shared";
import { AppSubscriptionId } from "../models/AppSubscriptionId";
import { AppUsageRecordId } from "../models/AppUsageRecordId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";

export interface IAppUsageSubscriptionService {
  create(
    shopId: ShopId,
    name: string,
    terms: string,
    test: boolean,
    cappedAmount: BillingMoney,
    returnUrl: URL,
  ): Promise<{
    appSubscriptionId: AppSubscriptionId;
    confirmationUrl: URL;
  }>;

  get(shopId: ShopId): Promise<UsageSubscription>;

  createCharge(shopId: ShopId): Promise<AppUsageRecordId>;

  updateCappedAmount(shopId: ShopId, cappedAmount: BillingMoney): Promise<URL>;
}
