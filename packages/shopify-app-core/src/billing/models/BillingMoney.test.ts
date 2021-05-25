import { BillingMoney } from "./BillingMoney";

describe("BillingMoney", () => {
  it("check", () => {
    BillingMoney.check(10);
  });

  it("when less than 0 then throw", () => {
    expect(() => BillingMoney.check(0)).toThrowError();
  });
});
