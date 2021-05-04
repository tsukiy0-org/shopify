import { String, Static } from "runtypes";

export const AccessToken = String.withBrand("Token");

export type AccessToken = Static<typeof AccessToken>;
