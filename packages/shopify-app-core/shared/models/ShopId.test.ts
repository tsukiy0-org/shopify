import { ShopId } from "./ShopId";

describe("ShopId", () => {
  it("good", () => {
    const action = () => ShopId.check("test.myshopify.com");

    expect(action).not.toThrow();
  });

  it("bad", () => {
    const action = () => ShopId.check("gibberish");

    expect(action).toThrow();
  });
});
