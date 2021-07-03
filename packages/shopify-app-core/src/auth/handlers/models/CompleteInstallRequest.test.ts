import { CompleteInstallRequest } from "./CompleteInstallRequest";
import { ShopId } from "../../../shared";

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
