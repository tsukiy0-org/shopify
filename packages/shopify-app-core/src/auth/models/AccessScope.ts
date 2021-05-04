import { String, Static } from "runtypes";

export const AccessScope = String.withBrand("AccessScope");

export type AccessScope = Static<typeof AccessScope>;
