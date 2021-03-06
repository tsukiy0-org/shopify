import {
  AccessToken,
  IAppInstallationService,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { GqlAppInstallationService } from "@tsukiy0/shopify-app-infrastructure";
import { ShopifyGraphQlClientSetup } from "../../testing/ShopifyGraphQlClientSetup";

describe("GqlAppInstallationService", () => {
  const shopId = ShopId.check(process.env.SHOP_ID_1);
  let sut: IAppInstallationService;

  beforeEach(() => {
    const token = AccessToken.check(process.env.SHOP_TOKEN_1);
    const client = ShopifyGraphQlClientSetup.setup({
      token,
    });
    sut = new GqlAppInstallationService(client);
  });

  describe("listAcessScopes", () => {
    it("list scopes", async () => {
      const actual = await sut.listAccessScopes(shopId);

      expect(actual).toBeDefined();
      expect(actual.length).toBeGreaterThan(0);
    });
  });

  describe("getAppUrl", () => {
    it("get app url for shop", async () => {
      const actual = await sut.getAppUrl(shopId);

      expect(actual).toBeDefined();
    });
  });
});
