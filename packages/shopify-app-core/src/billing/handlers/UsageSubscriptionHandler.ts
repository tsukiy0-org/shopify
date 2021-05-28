import { IAppInstallationService } from "../../auth";
import { BillingMoneyExtensions } from "../extensions/BillingMoneyExtensions";
import { UsageSubscription } from "../models/UsageSubscription";
import { IAppUsageSubscriptionService } from "../services/IAppUsageSubscriptionService";
import { IUsageSubscriptionHandler } from "./IUsageSubscriptionHandler";
import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { CreateUsageSubscriptionResponse } from "./models/CreateUsageSubscriptionResponse";
import { GetUsageSubscriptionRequest } from "./models/GetUsageSubscriptionRequest";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UpdateUsageSubscriptionCappedAmountResponse } from "./models/UpdateUsageSubscriptionCappedAmountResponse";

export class UsageSubscriptionHandler implements IUsageSubscriptionHandler {
  constructor(
    private readonly appUsageSubscriptionService: IAppUsageSubscriptionService,
    private readonly appInstallationService: IAppInstallationService,
    private readonly config: {
      name: string;
      terms: string;
      test: boolean;
    },
  ) {}

  create = async (
    request: CreateUsageSubscriptionRequest,
  ): Promise<CreateUsageSubscriptionResponse> => {
    const appUrl = await this.appInstallationService.getAppUrl(request.shopId);
    const authorizeUrl = await this.appUsageSubscriptionService.create(
      request.shopId,
      this.config.name,
      this.config.terms,
      request.cappedAmount,
      appUrl,
      this.config.test,
    );

    return {
      authorizeUrl,
    };
  };

  get = async (
    request: GetUsageSubscriptionRequest,
  ): Promise<UsageSubscription> => {
    return await this.appUsageSubscriptionService.get(request.shopId);
  };

  updateCappedAmount = async (
    request: UpdateUsageSubscriptionCappedAmountRequest,
  ): Promise<UpdateUsageSubscriptionCappedAmountResponse> => {
    const sub = await this.appUsageSubscriptionService.get(request.shopId);

    const authorizeUrl = await this.appUsageSubscriptionService.updateCappedAmount(
      request.shopId,
      BillingMoneyExtensions.add(sub.cappedAmount, request.addAmount),
    );

    return {
      authorizeUrl,
    };
  };
}
