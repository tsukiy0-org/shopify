import { String, Static } from "runtypes";

export const ApiKey = String.withBrand("ApiKey");

export type ApiKey = Static<typeof ApiKey>;
