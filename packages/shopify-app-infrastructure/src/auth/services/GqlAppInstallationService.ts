import {
  AccessScope,
  IAppInstallationService,
  ShopId,
} from "@tsukiy0/shopify-app-core";
import { gql } from "graphql-request";
import { AppInstallation } from "@tsukiy0/shopify-admin-graphql-types";
import { ShopifyGraphQlClient } from "../../shared";
import { Url } from "@tsukiy0/extensions-core";

export class GqlAppInstallationService implements IAppInstallationService {
  constructor(private readonly client: ShopifyGraphQlClient) {}

  listAccessScopes = async (shopId: ShopId): Promise<AccessScope[]> => {
    const result = await this.client.request<{
      appInstallation: AppInstallation;
    }>(
      shopId,
      gql`
        query Task {
          appInstallation {
            accessScopes {
              handle
            }
          }
        }
      `,
    );

    return result.appInstallation.accessScopes
      .map((_) => _.handle)
      .map(AccessScope.check);
  };

  getAppUrl = async (shopId: ShopId): Promise<Url> => {
    const result = await this.client.request<{
      appInstallation: AppInstallation;
    }>(
      shopId,
      gql`
        query Task {
          appInstallation {
            launchUrl
          }
        }
      `,
    );

    return Url.check(result.appInstallation.launchUrl);
  };
}
