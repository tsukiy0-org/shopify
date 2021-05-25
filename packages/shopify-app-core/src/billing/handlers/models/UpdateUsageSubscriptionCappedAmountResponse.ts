import { InstanceOf, Record, Static } from "runtypes";

export const UpdateUsageSubscriptionCappedAmountResponse = Record({
  authorizeUrl: InstanceOf(URL),
}).withBrand("UpdateUsageSubscriptionCappedAmountResponse");

export type UpdateUsageSubscriptionCappedAmountResponse = Static<
  typeof UpdateUsageSubscriptionCappedAmountResponse
>;
