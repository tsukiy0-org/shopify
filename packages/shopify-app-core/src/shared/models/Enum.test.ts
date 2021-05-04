import { Enum } from "./Enum";

describe("Enum", () => {
  enum TestEnum {
    A = "A",
    B = "B",
  }

  const testEnum = Enum(TestEnum);

  it("good", () => {
    const action = () => testEnum.check(TestEnum.A);

    expect(action).not.toThrow();
  });

  it("when unknown value then throw", () => {
    const action = () => testEnum.check("C");

    expect(action).toThrow();
  });
});
