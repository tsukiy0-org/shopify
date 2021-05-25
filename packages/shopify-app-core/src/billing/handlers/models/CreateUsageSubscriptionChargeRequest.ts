import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const CreateUsageSubscriptionChargeRequest = Record({
  shopId: ShopId,
  amount: BillingMoney,
}).withBrand("CreateUsageSubscriptionChargeRequest");

export type CreateUsageSubscriptionChargeRequest = Static<
  typeof CreateUsageSubscriptionChargeRequest
>;
