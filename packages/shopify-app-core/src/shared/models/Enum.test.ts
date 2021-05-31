import { Enum } from "./Enum";

describe("Enum", () => {
  enum TestEnum {
    A = "A",
    B = "B",
  }

  const testEnumValidator = Enum(TestEnum);

  it("good", () => {
    const action = () => testEnumValidator.check(TestEnum.A);

    expect(action).not.toThrow();
  });

  it("when unknown value then throw", () => {
    const action = () => testEnumValidator.check("C" as TestEnum);

    expect(action).toThrow();
  });
});
