import { Record, Static } from "runtypes";
import { UsageSubscription } from "../../models/UsageSubscription";

export const GetUsageSubscriptionResponse = Record({
  usageSubscription: UsageSubscription.optional(),
});

export type GetUsageSubscriptionResponse = Static<
  typeof GetUsageSubscriptionResponse
>;
