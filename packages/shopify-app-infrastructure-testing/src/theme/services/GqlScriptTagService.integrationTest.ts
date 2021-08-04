import { Url } from "@tsukiy0/extensions-core";
import { ScriptTagDisplayScope } from "@tsukiy0/shopify-admin-graphql-types";
import {
  AccessToken,
  IScriptTagService,
  ScriptTag,
  ScriptTagNotFoundError,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { GqlScriptTagService } from "@tsukiy0/shopify-app-infrastructure";
import { ShopifyGraphQlClientSetup } from "../../testing";

describe("GqlScriptTagService", () => {
  const shopId = ShopId.check(process.env.SHOP_ID_1);
  const scriptTag: ScriptTag = {
    shopId,
    url: Url.check(
      `https://google.com/script/${Math.random() * 100000000000000000}`,
    ),
    scope: ScriptTagDisplayScope.OrderStatus,
  };
  let sut: IScriptTagService;

  beforeEach(() => {
    const token = AccessToken.check(process.env.SHOP_TOKEN_1);
    const client = ShopifyGraphQlClientSetup.setup({
      token,
    });
    sut = new GqlScriptTagService(client);
  });

  it("create and get returns created", async () => {
    await sut.create(scriptTag);
    const actual = await sut.get(
      scriptTag.shopId,
      scriptTag.url,
      scriptTag.scope,
    );

    expect(actual).toEqual(scriptTag);
  });

  it("delete and get throws not found", async () => {
    await sut.create(scriptTag);
    await sut.delete(scriptTag.shopId, scriptTag.url, scriptTag.scope);

    await expect(
      sut.get(scriptTag.shopId, scriptTag.url, scriptTag.scope),
    ).rejects.toThrowError(ScriptTagNotFoundError);
  });
});
