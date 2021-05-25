import { Number, Static } from "runtypes";

export const BillingMoney = Number.withConstraint((_) => _ >= 0).withBrand(
  "BillingMoney",
);

export type BillingMoney = Static<typeof BillingMoney>;
