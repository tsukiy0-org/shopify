import { ShopId } from "@tsukiy0/shopify-app-core";
import { AccessScope } from "../../models/AccessScope";
import { StartInstallRequest } from "./StartInstallRequest";

describe("StartInstallRequst", () => {
  const request = StartInstallRequest.check({
    shopId: ShopId.check("test.myshopify.com"),
    requiredScopes: [AccessScope.check("read_order")],
    redirectUrl: new URL("https://google.com"),
  });

  it("when has no required scopes then throw", () => {
    expect(() =>
      StartInstallRequest.check({
        ...request,
        requiredScopes: [],
      }),
    ).toThrowError();
  });
});
