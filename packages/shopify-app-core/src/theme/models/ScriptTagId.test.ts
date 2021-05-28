import { ScriptTagId } from "./ScriptTagId";

describe("ScriptTagId", () => {
  it("good", () => {
    const action = () => ScriptTagId.check("gid://shopify/ScriptTag/123");

    expect(action).not.toThrow();
  });

  it("bad", () => {
    const action = () => ScriptTagId.check("gibberish");

    expect(action).toThrow();
  });
});
