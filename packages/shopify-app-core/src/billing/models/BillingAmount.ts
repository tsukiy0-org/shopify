import { Number, Static } from "runtypes";

export const BillingAmount = Number.withBrand("BillingAmount");

export type BillingAmount = Static<typeof BillingAmount>;
