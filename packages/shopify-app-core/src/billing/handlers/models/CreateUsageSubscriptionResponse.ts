import { InstanceOf, Record, Static } from "runtypes";

export const CreateUsageSubscriptionResponse = Record({
  authorizeUrl: InstanceOf(URL),
}).withBrand("CreateUsageSubscriptionResponse");

export type CreateUsageSubscriptionResponse = Static<
  typeof CreateUsageSubscriptionResponse
>;
