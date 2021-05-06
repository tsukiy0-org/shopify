import { Number, Static } from "runtypes";

export const BillingMoney = Number.withBrand("BillingMoney");

export type BillingMoney = Static<typeof BillingMoney>;
