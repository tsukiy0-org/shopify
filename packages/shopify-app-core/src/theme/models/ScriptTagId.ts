import { String, Static } from "runtypes";

export const ScriptTagId = String.withConstraint((_) =>
  _.startsWith("gid://shopify/ScriptTag/"),
).withBrand("ScriptTagId");

export type ScriptTagId = Static<typeof ScriptTagId>;
