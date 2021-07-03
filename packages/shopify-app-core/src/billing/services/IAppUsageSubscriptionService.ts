import { Url } from "@tsukiy0/extensions-core";
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
    returnUrl: Url,
    test: boolean,
  ): Promise<Url>;

  get(shopId: ShopId): Promise<UsageSubscription>;

  createCharge(
    shopId: ShopId,
    amount: BillingMoney,
    description: string,
  ): Promise<AppUsageRecordId>;

  updateCappedAmount(shopId: ShopId, cappedAmount: BillingMoney): Promise<Url>;
}

export class SubscriptionNotFoundError extends ShopifyAppError {}
