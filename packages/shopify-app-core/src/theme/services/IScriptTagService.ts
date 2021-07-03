import { Url } from "@tsukiy0/extensions-core";
import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";
import { ShopId, ShopifyAppError } from "../../shared";
import { ScriptTag } from "../models/ScriptTag";

export interface IScriptTagService {
  create(scriptTag: ScriptTag): Promise<void>;

  get(
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<ScriptTag>;

  delete(shopId: ShopId, url: Url, scope: ScriptTagDisplayScope): Promise<void>;
}

export class ScriptTagNotFoundError extends ShopifyAppError {}
