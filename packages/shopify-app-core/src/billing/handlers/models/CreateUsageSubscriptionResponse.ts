import { Url } from "@tsukiy0/shopify-app-core";
import { Record, Static } from "runtypes";

export const CreateUsageSubscriptionResponse = Record({
  authorizeUrl: Url,
});

export type CreateUsageSubscriptionResponse = Static<
  typeof CreateUsageSubscriptionResponse
>;
