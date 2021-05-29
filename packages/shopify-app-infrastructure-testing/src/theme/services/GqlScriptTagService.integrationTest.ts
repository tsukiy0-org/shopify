import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";
import {
  AccessToken,
  IScriptTagService,
  ShopId,
  Url,
} from "@tsukiy0/shopify-app-core";
import { GqlScriptTagService } from "@tsukiy0/shopify-app-infrastructure";
import { ShopifyGraphQlClientSetup } from "../../testing";

describe("GqlScriptTagService", () => {
  const shopId = ShopId.check(process.env.SHOP_ID_1);
  let sut: IScriptTagService;

  beforeEach(() => {
    const token = AccessToken.check(process.env.SHOP_TOKEN_1);
    const client = ShopifyGraphQlClientSetup.setup({
      token,
    });
    sut = new GqlScriptTagService(client);
  });

  describe("create", () => {
    it("does it", async () => {
      const actual = await sut.create(
        shopId,
        Url.check(
          "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.cjs.min.js",
        ),
        ScriptTagDisplayScope.OrderStatus,
      );

      expect(actual).toBeDefined();
    });
  });
});
