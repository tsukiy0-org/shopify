import { ShopId, ShopifyAppError } from "../../shared";
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
    test: boolean,
  ): Promise<URL>;

  get(shopId: ShopId): Promise<UsageSubscription>;

  createCharge(
    shopId: ShopId,
    amount: BillingMoney,
    description: string,
  ): Promise<AppUsageRecordId>;

  updateCappedAmount(shopId: ShopId, cappedAmount: BillingMoney): Promise<URL>;
}

export class SubscriptionNotFoundError extends ShopifyAppError {}
