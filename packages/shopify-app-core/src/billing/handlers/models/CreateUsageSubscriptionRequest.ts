import { ShopId } from "../../../shared";
import { InstanceOf, Record, Static, String } from "runtypes";
import { BillingMoney } from "../../models/BillingMoney";

export const CreateUsageSubscriptionRequest = Record({
  shopId: ShopId,
  name: String,
  terms: String,
  cappedAmount: BillingMoney,
  returnUrl: InstanceOf(URL),
}).withBrand("CreateUsageSubscriptionRequest");

export type CreateUsageSubscriptionRequest = Static<
  typeof CreateUsageSubscriptionRequest
>;
