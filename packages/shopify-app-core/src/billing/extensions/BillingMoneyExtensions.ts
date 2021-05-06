import { BillingMoney } from "../models/BillingMoney";

export class BillingMoneyExtensions {
  static add(a: BillingMoney, b: BillingMoney): BillingMoney {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return BillingMoney.check(a + b);
  }
}
