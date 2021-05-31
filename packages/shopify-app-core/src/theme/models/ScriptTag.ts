import { Enum, ShopId, Url } from "../../shared";
import { Record, Static } from "runtypes";
import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";

export const ScriptTag = Record({
  shopId: ShopId,
  url: Url,
  scope: Enum(ScriptTagDisplayScope),
});

export type ScriptTag = Static<typeof ScriptTag>;
