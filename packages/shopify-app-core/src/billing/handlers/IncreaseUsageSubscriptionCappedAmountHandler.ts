import { ShopId } from "../../shared";
import { BillingMoneyExtensions } from "../extensions/BillingMoneyExtensions";
import { BillingMoney } from "../models/BillingMoney";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";

export class IncreaseUsageSubscriptionCappedAmountHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
  ) {}

  handle = async (shopId: ShopId, amount: BillingMoney): Promise<URL> => {
    const sub = await this.appUsageSubscriptionService.get(shopId);

    return await this.appUsageSubscriptionService.updateCappedAmount(
      shopId,
      BillingMoneyExtensions.add(sub.cappedAmount, amount),
    );
  };
}
