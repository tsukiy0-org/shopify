import { BillingMoney } from "../models/BillingMoney";

export class BillingMoneyExtensions {
  static add(a: BillingMoney, b: BillingMoney): BillingMoney {
    return BillingMoney.check(a + b);
  }
}
