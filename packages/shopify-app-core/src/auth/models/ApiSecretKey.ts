import { String, Static } from "runtypes";

export const ApiSecretKey = String.withBrand("ApiSecretKey");

export type ApiSecretKey = Static<typeof ApiSecretKey>;
