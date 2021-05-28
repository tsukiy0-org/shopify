import {
  MutationWebhookSubscriptionCreateArgs,
  WebhookSubscriptionCreatePayload,
  WebhookSubscriptionFormat,
  WebhookSubscriptionTopic,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import { IWebhookService, ShopId, Url } from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient, ShopifyUserError } from "../../shared";

export class GqlWebhookService implements IWebhookService {
  constructor(private readonly client: ShopifyGraphQlClient) {}

  create = async (
    shopId: ShopId,
    topic: WebhookSubscriptionTopic,
    redirectUrl: Url,
  ): Promise<void> => {
    const result = await this.client.request<
      {
        webhookSubscriptionCreate: WebhookSubscriptionCreatePayload;
      },
      MutationWebhookSubscriptionCreateArgs
    >(
      shopId,
      gql`
        mutation Task(
          $topic: WebhookSubscriptionTopic!
          $webhookSubscription: WebhookSubscriptionInput!
        ) {
          webhookSubscriptionCreate(
            topic: $topic
            webhookSubscription: $webhookSubscription
          ) {
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        topic,
        webhookSubscription: {
          callbackUrl: redirectUrl,
          format: WebhookSubscriptionFormat.Json,
        },
      },
    );

    if (result.webhookSubscriptionCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.webhookSubscriptionCreate.userErrors);
    }
  };
}
