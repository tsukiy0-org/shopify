import { ShopId } from "../../shared";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";

export class GetUsageSubscriptionHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
  ) {}

  handle = async (shopId: ShopId): Promise<UsageSubscription> => {
    return await this.appUsageSubscriptionService.get(shopId);
  };
}
