import { ShopId } from "../../shared";
import { BillingMoney } from "../models/BillingMoney";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";

export class CreateUsageSubscriptionHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
  ) {}

  handle = async (
    shopId: ShopId,
    name: string,
    terms: string,
    cappedAmount: BillingMoney,
    returnUrl: URL,
  ): Promise<URL> => {
    return await this.appUsageSubscriptionService.create(
      shopId,
      name,
      terms,
      cappedAmount,
      returnUrl,
    );
  };
}
