import { ShopId } from "../../../shared";
import { Record, Static, String } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const CreateUsageSubscriptionChargeRequest = Record({
  shopId: ShopId,
  amount: BillingMoney,
  description: String,
}).withBrand("CreateUsageSubscriptionChargeRequest");

export type CreateUsageSubscriptionChargeRequest = Static<
  typeof CreateUsageSubscriptionChargeRequest
>;
