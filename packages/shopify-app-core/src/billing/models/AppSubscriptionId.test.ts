import { AppSubscriptionId } from "./AppSubscriptionId";

describe("AppSubscriptionId", () => {
  it("good", () => {
    const action = () =>
      AppSubscriptionId.check("gid://shopify/AppSubscription/123");

    expect(action).not.toThrow();
  });

  it("bad", () => {
    const action = () => AppSubscriptionId.check("gibberish");

    expect(action).toThrow();
  });
});
