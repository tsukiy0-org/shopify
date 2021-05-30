import { PageCursor, PageCursorExtensions } from "./PageCursor";

describe("PageCursor", () => {
  it("good", () => {
    const action = () =>
      PageCursorExtensions.newWithDefaulLimit("stringified_garbage");

    expect(action).not.toThrow();
  });

  [-1, 0].forEach((limit) => {
    it(`when limit is ${limit} then throw`, () => {
      const action = () =>
        PageCursor.check({
          limit,
        });

      expect(action).toThrow();
    });
  });
});
