import { WebhookSubscriptionTopic } from "@tsukiy0/shopify-admin-graphql-types";
import {
  AccessToken,
  IWebhookService,
  ShopId,
  Url,
} from "@tsukiy0/shopify-app-core";
import { GqlWebhookService } from "@tsukiy0/shopify-app-infrastructure";
import { ShopifyGraphQlClientSetup } from "../../testing";

// @TODO update permissions for test account
describe.skip("GqlWebhookService", () => {
  const shopId = ShopId.check(process.env.SHOP_ID_1);
  let sut: IWebhookService;

  beforeEach(() => {
    const token = AccessToken.check(process.env.SHOP_TOKEN_1);
    const client = ShopifyGraphQlClientSetup.setup({
      token,
    });
    sut = new GqlWebhookService(client);
  });

  describe("create", () => {
    it("does it", async () => {
      const actual = await sut.create(
        shopId,
        WebhookSubscriptionTopic.OrdersCreate,
        Url.check("https://google.com"),
      );

      expect(actual).toBeDefined();
    });
  });
});
