import { UsageSubscription } from "../models/UsageSubscription";
import { CreateUsageSubscriptionChargeRequest } from "./models/CreateUsageSubscriptionChargeRequest";
import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { CreateUsageSubscriptionResponse } from "./models/CreateUsageSubscriptionResponse";
import { GetUsageSubscriptionRequest } from "./models/GetUsageSubscriptionRequest";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UpdateUsageSubscriptionCappedAmountResponse } from "./models/UpdateUsageSubscriptionCappedAmountResponse";

export interface IUsageSubscriptionHandler {
  create(
    request: CreateUsageSubscriptionRequest,
  ): Promise<CreateUsageSubscriptionResponse>;

  get(request: GetUsageSubscriptionRequest): Promise<UsageSubscription>;

  createCharge(request: CreateUsageSubscriptionChargeRequest): Promise<void>;

  updateCappedAmount(
    request: UpdateUsageSubscriptionCappedAmountRequest,
  ): Promise<UpdateUsageSubscriptionCappedAmountResponse>;
}
