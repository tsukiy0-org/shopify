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

  create = (
    request: CreateUsageSubscriptionRequest,
  ): Promise<CreateUsageSubscriptionResponse> => {
    throw new Error();
  };

  get = (request: GetUsageSubscriptionRequest): Promise<UsageSubscription> => {
    throw new Error();
  };

  createCharge = (
    request: CreateUsageSubscriptionChargeRequest,
  ): Promise<void> => {
    throw new Error();
  };

  updateCappedAmount = (
    request: UpdateUsageSubscriptionCappedAmountRequest,
  ): Promise<UpdateUsageSubscriptionCappedAmountResponse> => {
    throw new Error();
  };
}
