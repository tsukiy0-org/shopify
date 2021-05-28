import { Record, Static } from "runtypes";
import { Url } from "../../../shared";

export const CreateUsageSubscriptionResponse = Record({
  authorizeUrl: Url,
});

export type CreateUsageSubscriptionResponse = Static<
  typeof CreateUsageSubscriptionResponse
>;
