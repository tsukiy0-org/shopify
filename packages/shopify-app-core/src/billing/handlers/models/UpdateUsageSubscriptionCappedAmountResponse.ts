import { Url } from "@tsukiy0/shopify-app-core";
import { Record, Static } from "runtypes";

export const UpdateUsageSubscriptionCappedAmountResponse = Record({
  authorizeUrl: Url,
});

export type UpdateUsageSubscriptionCappedAmountResponse = Static<
  typeof UpdateUsageSubscriptionCappedAmountResponse
>;
