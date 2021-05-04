import { String, Static } from "runtypes";

export const AuthToken = String.withBrand("Token");

export type AuthToken = Static<typeof AuthToken>;
