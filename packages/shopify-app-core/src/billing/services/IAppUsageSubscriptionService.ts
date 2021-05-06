import { ShopId } from "../../shared";
import { AppUsageRecordId } from "../models/AppUsageRecordId";
import { BillingMoney } from "../models/BillingMoney";
import { UsageSubscription } from "../models/UsageSubscription";

export interface IAppUsageSubscriptionService {
  create(
    shopId: ShopId,
    name: string,
    terms: string,
    cappedAmount: BillingMoney,
    returnUrl: URL,
  ): Promise<URL>;

  get(shopId: ShopId): Promise<UsageSubscription>;

  createCharge(shopId: ShopId, amount: BillingMoney): Promise<AppUsageRecordId>;

  updateCappedAmount(shopId: ShopId, cappedAmount: BillingMoney): Promise<URL>;
}
