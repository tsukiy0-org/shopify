import { String, Static } from "runtypes";

export const AppUsageRecordId = String.withConstraint((_) =>
  _.startsWith("gid://shopify/AppUsageRecord/"),
).withBrand("AppUsageRecordId");

export type AppUsageRecordId = Static<typeof AppUsageRecordId>;
