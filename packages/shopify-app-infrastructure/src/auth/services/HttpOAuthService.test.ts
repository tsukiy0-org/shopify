import { ShopId, ApiKey, AccessScope } from "@tsukiy0/shopify-app-core";
import { HttpOAuthService } from "./HttpOAuthService";

describe("HttpOAuthService", () => {
  describe("buildAuthorizeUrl", () => {
    let sut: HttpOAuthService;

    beforeEach(() => {
      sut = new HttpOAuthService();
    });

    it("builds url", () => {
      const shopId = ShopId.check("test.myshopify.com");
      const apiKey = ApiKey.check("apiKey");
      const requiredScopes = ["read_orders", "read_customers"].map(
        AccessScope.check,
      );
      const actual = sut.buildAuthorizeUrl(
        shopId,
        requiredScopes,
        new URL("https://google.com/auth/end"),
        apiKey,
      );

      expect(actual.toString()).toEqual(
        "https://test.myshopify.com/admin/oauth/authorize?client_id=apiKey&scope=read_customers%2Cread_orders&redirect_uri=https%3A%2F%2Fgoogle.com%2Fauth%2Fend",
      );
    });
  });
});
