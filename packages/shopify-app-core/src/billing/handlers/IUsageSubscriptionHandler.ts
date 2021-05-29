import { CreateUsageSubscriptionRequest } from "./models/CreateUsageSubscriptionRequest";
import { CreateUsageSubscriptionResponse } from "./models/CreateUsageSubscriptionResponse";
import { GetUsageSubscriptionRequest } from "./models/GetUsageSubscriptionRequest";
import { GetUsageSubscriptionResponse } from "./models/GetUsageSubscriptionResponse";
import { UpdateUsageSubscriptionCappedAmountRequest } from "./models/UpdateUsageSubscriptionCappedAmountRequest";
import { UpdateUsageSubscriptionCappedAmountResponse } from "./models/UpdateUsageSubscriptionCappedAmountResponse";

export interface IUsageSubscriptionHandler {
  create(
    request: CreateUsageSubscriptionRequest,
  ): Promise<CreateUsageSubscriptionResponse>;

  get(
    request: GetUsageSubscriptionRequest,
  ): Promise<GetUsageSubscriptionResponse>;

  updateCappedAmount(
    request: UpdateUsageSubscriptionCappedAmountRequest,
  ): Promise<UpdateUsageSubscriptionCappedAmountResponse>;
}
