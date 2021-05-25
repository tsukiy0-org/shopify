import { BillingMoneyExtensions } from "../extensions/BillingMoneyExtensions";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";
import { IUsageSubscriptionHandler } from "./IUsageSubscriptionHandler";
import { CreateUsageSubscriptionChargeRequest } from "./models/CreateUsageSubscriptionChargeRequest";
import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { CreateUsageSubscriptionResponse } from "./models/CreateUsageSubscriptionResponse";
import { GetUsageSubscriptionRequest } from "./models/GetUsageSubscriptionRequest";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UpdateUsageSubscriptionCappedAmountResponse } from "./models/UpdateUsageSubscriptionCappedAmountResponse";

export class UsageSubscriptionHandler implements IUsageSubscriptionHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
  ) {}

  create = async (
    request: CreateUsageSubscriptionRequest,
  ): Promise<CreateUsageSubscriptionResponse> => {
    const authorizeUrl = await this.appUsageSubscriptionService.create(
      request.shopId,
      request.name,
      request.terms,
      request.cappedAmount,
      request.returnUrl,
    );

    return CreateUsageSubscriptionResponse.check({
      authorizeUrl,
    });
  };

  get = async (
    request: GetUsageSubscriptionRequest,
  ): Promise<UsageSubscription> => {
    return await this.appUsageSubscriptionService.get(request.shopId);
  };

  createCharge = async (
    request: CreateUsageSubscriptionChargeRequest,
  ): Promise<void> => {
    await this.appUsageSubscriptionService.createCharge(
      request.shopId,
      request.amount,
    );
  };

  updateCappedAmount = async (
    request: UpdateUsageSubscriptionCappedAmountRequest,
  ): Promise<UpdateUsageSubscriptionCappedAmountResponse> => {
    const sub = await this.appUsageSubscriptionService.get(request.shopId);

    const authorizeUrl = await this.appUsageSubscriptionService.updateCappedAmount(
      request.shopId,
      BillingMoneyExtensions.add(sub.cappedAmount, request.addAmount),
    );

    return UpdateUsageSubscriptionCappedAmountResponse.check({
      authorizeUrl,
    });
  };
}
