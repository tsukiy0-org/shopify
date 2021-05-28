import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const UpdateUsageSubscriptionCappedAmountRequest = Record({
  shopId: ShopId,
  addAmount: BillingMoney,
});

export type UpdateUsageSubscriptionCappedAmountRequest = Static<
  typeof UpdateUsageSubscriptionCappedAmountRequest
>;
