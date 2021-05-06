import { ShopId } from "../../shared";
import { BillingMoney } from "../models/BillingMoney";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";

export class CreateUsageSubscriptionChargeHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
  ) {}

  handle = async (shopId: ShopId, amount: BillingMoney): Promise<void> => {
    await this.appUsageSubscriptionService.createCharge(shopId, amount);
  };
}
