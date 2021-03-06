import { String, Static } from "runtypes";

export const AccessToken = String.withBrand("AccessToken");

export type AccessToken = Static<typeof AccessToken>;
