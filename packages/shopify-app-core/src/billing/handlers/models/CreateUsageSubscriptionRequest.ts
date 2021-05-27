import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const CreateUsageSubscriptionRequest = Record({
  shopId: ShopId,
  cappedAmount: BillingMoney,
}).withBrand("CreateUsageSubscriptionRequest");

export type CreateUsageSubscriptionRequest = Static<
  typeof CreateUsageSubscriptionRequest
>;
