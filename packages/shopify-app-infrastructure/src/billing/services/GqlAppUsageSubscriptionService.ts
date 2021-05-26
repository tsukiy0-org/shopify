import {
  AppSubscription,
  AppSubscriptionCreatePayload,
  AppSubscriptionLineItemUpdatePayload,
  AppUsagePricingInput,
  AppUsageRecordCreatePayload,
  CurrencyCode,
  MutationAppSubscriptionCreateArgs,
  MutationAppSubscriptionLineItemUpdateArgs,
  MutationAppUsageRecordCreateArgs,
  AppInstallation,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import {
  ShopId,
  BillingMoney,
  IAppUsageSubscriptionService,
  UsageSubscription,
  AppUsageRecordId,
  SubscriptionNotFoundError,
  ShopifyAppError,
} from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient, ShopifyUserError } from "../../shared";

export class GqlAppUsageSubscriptionService
  implements IAppUsageSubscriptionService {
  constructor(private readonly client: ShopifyGraphQlClient) {}

  create = async (
    shopId: ShopId,
    name: string,
    terms: string,
    cappedAmount: BillingMoney,
    returnUrl: URL,
    test: boolean,
  ): Promise<URL> => {
    const result = await this.client.request<
      {
        appSubscriptionCreate: AppSubscriptionCreatePayload;
      },
      {
        name: MutationAppSubscriptionCreateArgs["name"];
        terms: AppUsagePricingInput["terms"];
        test: MutationAppSubscriptionCreateArgs["test"];
        cappedAmount: AppUsagePricingInput["cappedAmount"];
        returnUrl: MutationAppSubscriptionCreateArgs["returnUrl"];
      }
    >(
      shopId,
      gql`
        mutation Task(
          $name: String!
          $test: Boolean!
          $cappedAmount: MoneyInput!
          $terms: String!
          $returnUrl: URL!
        ) {
          appSubscriptionCreate(
            name: $name
            lineItems: [
              {
                plan: {
                  appUsagePricingDetails: {
                    cappedAmount: $cappedAmount
                    terms: $terms
                  }
                }
              }
            ]
            test: $test
            returnUrl: $returnUrl
          ) {
            appSubscription {
              id
            }
            confirmationUrl
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        name,
        terms,
        test,
        cappedAmount: {
          amount: cappedAmount.toString(),
          currencyCode: CurrencyCode.Usd,
        },
        returnUrl: returnUrl.toString(),
      },
    );

    if (result.appSubscriptionCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.appSubscriptionCreate.userErrors);
    }

    return new URL(result.appSubscriptionCreate.confirmationUrl!);
  };

  get = async (shopId: ShopId): Promise<UsageSubscription> => {
    const appSubscription = await this.getAppSubscription(shopId);

    const pricingDetails = appSubscription.lineItems[0].plan.pricingDetails;

    if (pricingDetails.__typename !== "AppUsagePricing") {
      throw new UsagePricingNotFoundError();
    }

    return UsageSubscription.check({
      shopId,
      appSubscriptionId: appSubscription.id,
      balanceAmount: Number(pricingDetails.balanceUsed.amount),
      cappedAmount: Number(pricingDetails.cappedAmount.amount),
      test: appSubscription.test,
    });
  };

  createCharge = async (
    shopId: ShopId,
    amount: BillingMoney,
    description: string,
  ): Promise<AppUsageRecordId> => {
    const appSubscription = await this.getAppSubscription(shopId);
    const subscriptionLineItemId = appSubscription.lineItems[0].id;

    const result = await this.client.request<
      {
        appUsageRecordCreate: AppUsageRecordCreatePayload;
      },
      MutationAppUsageRecordCreateArgs
    >(
      shopId,
      gql`
        mutation Task(
          $subscriptionLineItemId: ID!
          $price: MoneyInput!
          $description: String!
        ) {
          appUsageRecordCreate(
            subscriptionLineItemId: $subscriptionLineItemId
            price: $price
            description: $description
          ) {
            appUsageRecord {
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      {
        subscriptionLineItemId,
        price: {
          amount: amount.toString(),
          currencyCode: CurrencyCode.Usd,
        },
        description,
      },
    );

    if (result.appUsageRecordCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.appUsageRecordCreate.userErrors);
    }

    return AppUsageRecordId.check(
      result.appUsageRecordCreate.appUsageRecord!.id,
    );
  };

  updateCappedAmount = async (
    shopId: ShopId,
    cappedAmount: BillingMoney,
  ): Promise<URL> => {
    const appSubscription = await this.getAppSubscription(shopId);
    const subscriptionLineItemId = appSubscription.lineItems[0].id;

    const result = await this.client.request<
      {
        appSubscriptionLineItemUpdate: AppSubscriptionLineItemUpdatePayload;
      },
      MutationAppSubscriptionLineItemUpdateArgs
    >(
      shopId,
      gql`
        mutation Task($id: ID!, $cappedAmount: MoneyInput!) {
          appSubscriptionLineItemUpdate(id: $id, cappedAmount: $cappedAmount) {
            userErrors {
              field
              message
            }
            confirmationUrl
            appSubscription {
              id
            }
          }
        }
      `,
      {
        id: subscriptionLineItemId,
        cappedAmount: {
          amount: cappedAmount.toString(),
          currencyCode: CurrencyCode.Usd,
        },
      },
    );

    if (result.appSubscriptionLineItemUpdate.userErrors.length > 0) {
      throw new ShopifyUserError(
        result.appSubscriptionLineItemUpdate.userErrors,
      );
    }

    return new URL(result.appSubscriptionLineItemUpdate.confirmationUrl!);
  };

  private getAppSubscription = async (
    shopId: ShopId,
  ): Promise<AppSubscription> => {
    const result = await this.client.request<{
      currentAppInstallation: AppInstallation;
    }>(
      shopId,
      gql`
        query Task {
          currentAppInstallation {
            id
            activeSubscriptions {
              id
              status
              test
              lineItems {
                id
                plan {
                  pricingDetails {
                    __typename
                    ... on AppUsagePricing {
                      cappedAmount {
                        amount
                        currencyCode
                      }
                      balanceUsed {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    );

    if (!result.currentAppInstallation.activeSubscriptions[0]) {
      throw new SubscriptionNotFoundError();
    }

    return result.currentAppInstallation.activeSubscriptions[0];
  };
}

class UsagePricingNotFoundError extends ShopifyAppError {}
