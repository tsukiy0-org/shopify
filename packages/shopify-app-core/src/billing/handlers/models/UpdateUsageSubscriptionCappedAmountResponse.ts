import { Url } from "@tsukiy0/extensions-core";
import { Record, Static } from "runtypes";

export const UpdateUsageSubscriptionCappedAmountResponse = Record({
  authorizeUrl: Url,
});

export type UpdateUsageSubscriptionCappedAmountResponse = Static<
  typeof UpdateUsageSubscriptionCappedAmountResponse
>;
