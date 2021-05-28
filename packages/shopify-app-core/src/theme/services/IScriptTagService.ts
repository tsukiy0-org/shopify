import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";
import { ShopId, Url } from "../../shared";
import { ScriptTagId } from "../models/ScriptTagId";

export interface IScriptTagService {
  create(
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<ScriptTagId>;
}
