import { String, Static } from "runtypes";

export const ShopId = String.withConstraint((_) =>
  _.endsWith(".myshopify.com"),
).withBrand("ShopId");

export type ShopId = Static<typeof ShopId>;
