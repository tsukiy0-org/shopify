import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const UpdateUsageSubscriptionCappedAmountRequest = Record({
  shopId: ShopId,
  cappedAmount: BillingMoney,
}).withBrand("UpdateUsageSubscriptionCappedAmountRequest");

export type UpdateUsageSubscriptionCappedAmountRequest = Static<
  typeof UpdateUsageSubscriptionCappedAmountRequest
>;
