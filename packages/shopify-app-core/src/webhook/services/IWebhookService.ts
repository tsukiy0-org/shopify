import { Url } from "@tsukiy0/extensions-core";
import { WebhookSubscriptionTopic } from "@tsukiy0/shopify-admin-graphql-types";
import { ShopId } from "../../shared";

export interface IWebhookService {
  create(
    shopId: ShopId,
    topic: WebhookSubscriptionTopic,
    redirectUrl: Url,
  ): Promise<void>;
}
