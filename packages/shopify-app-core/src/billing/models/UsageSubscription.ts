import { ShopId } from "../../shared";
import { Boolean, Record, Static } from "runtypes";
import { AppSubscriptionId } from "./AppSubscriptionId";
import { BillingMoney } from "./BillingMoney";

export const UsageSubscription = Record({
  shopId: ShopId,
  appSubscriptionId: AppSubscriptionId,
  balanceAmount: BillingMoney,
  cappedAmount: BillingMoney,
  test: Boolean,
})
  .withConstraint((_) => _.cappedAmount >= _.balanceAmount)
  .withBrand("UsageSubscription");

export type UsageSubscription = Static<typeof UsageSubscription>;
