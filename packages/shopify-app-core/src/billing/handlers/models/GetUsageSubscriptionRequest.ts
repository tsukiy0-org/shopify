import { ShopId } from "../../../shared";
import { Record, Static } from "runtypes";

export const GetUsageSubscriptionRequest = Record({
  shopId: ShopId,
});

export type GetUsageSubscriptionRequest = Static<
  typeof GetUsageSubscriptionRequest
>;
