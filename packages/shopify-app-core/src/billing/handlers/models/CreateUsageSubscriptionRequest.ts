import { ShopId } from "../../../shared";
import { Record, Static, String } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const CreateUsageSubscriptionRequest = Record({
  shopId: ShopId,
  name: String,
  cappedAmount: BillingMoney,
}).withBrand("CreateUsageSubscriptionRequest");

export type CreateUsageSubscriptionRequest = Static<
  typeof CreateUsageSubscriptionRequest
>;
