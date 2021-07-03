import { Enum, ShopId } from "../../shared";
import { Record, Static } from "runtypes";
import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";
import { Url } from "@tsukiy0/extensions-core";

export const ScriptTag = Record({
  shopId: ShopId,
  url: Url,
  scope: Enum(ScriptTagDisplayScope),
});

export type ScriptTag = Static<typeof ScriptTag>;
