import { AppUsageRecordId } from "./AppUsageRecordId";

describe("AppUsageRecordId", () => {
  it("good", () => {
    const action = () =>
      AppUsageRecordId.check("gid://shopify/AppUsageRecord/123");

    expect(action).not.toThrow();
  });

  it("bad", () => {
    const action = () => AppUsageRecordId.check("gibberish");

    expect(action).toThrow();
  });
});
