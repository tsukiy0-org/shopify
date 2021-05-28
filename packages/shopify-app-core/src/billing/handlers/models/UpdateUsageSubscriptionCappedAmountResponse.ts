import { Record, Static } from "runtypes";
import { Url } from "../../../shared";

export const UpdateUsageSubscriptionCappedAmountResponse = Record({
  authorizeUrl: Url,
});

export type UpdateUsageSubscriptionCappedAmountResponse = Static<
  typeof UpdateUsageSubscriptionCappedAmountResponse
>;
