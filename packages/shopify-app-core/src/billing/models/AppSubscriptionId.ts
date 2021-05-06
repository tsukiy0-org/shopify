import { String, Static } from "runtypes";

export const AppSubscriptionId = String.withConstraint((_) =>
  _.startsWith("gid://shopify/AppSubscription/"),
).withBrand("AppSubscriptionId");

export type AppSubscriptionId = Static<typeof AppSubscriptionId>;
