import { WebhookSubscriptionTopic } from "@tsukiy0/shopify-admin-graphql-types";
import { ShopId, Url } from "../../shared";

export interface IWebhookService {
  create(
    shopId: ShopId,
    topic: WebhookSubscriptionTopic,
    redirectUrl: Url,
  ): Promise<void>;
}
