import { ShopId } from "@tsukiy0/shopify-app-core";
import { CompleteInstallRequest } from "./CompleteInstallRequest";

describe("CompleteInstallRequest", () => {
  const request = CompleteInstallRequest.check({
    shopId: ShopId.check("test.myshopify.com"),
    accessCode: "accessCode",
  });

  it("when is empty accessCode then throw", () => {
    expect(() => {
      CompleteInstallRequest.check({
        ...request,
        accessCode: "",
      });
    }).toThrowError();
  });
});
