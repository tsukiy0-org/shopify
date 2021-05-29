import { ClientError, GraphQLClient } from "graphql-request";
import {
  IAccessTokenRepository,
  ShopId,
  ShopifyAppError,
  UnauthorizedError,
} from "@tsukiy0/shopify-app-core";
import { UserError } from "@tsukiy0/shopify-admin-graphql-types";
import { API_VERSION } from "./constants";

export class ShopifyGraphQlClient {
  constructor(private readonly accessTokenRepository: IAccessTokenRepository) {}

  request = async <T = any, V = any>(
    shopId: ShopId,
    document: string,
    variables?: V,
  ): Promise<T> => {
    const client = await this.build(shopId);
    try {
      const res = await client.request(document, variables);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res;
    } catch (e) {
      if (e instanceof ClientError) {
        if (e.response.status === 401) {
          throw new UnauthorizedError();
        }
      }

      throw e;
    }
  };

  private build = async (shopId: ShopId): Promise<GraphQLClient> => {
    const token = await this.accessTokenRepository.get(shopId);
    return new GraphQLClient(
      `https://${shopId}/admin/api/${API_VERSION}/graphql.json`,
      {
        headers: {
          "X-Shopify-Access-Token": token,
        },
      },
    );
  };
}

export class ShopifyUserError extends ShopifyAppError {
  public readonly errors: UserError[];

  constructor(errors: UserError[]) {
    super();
    this.errors = errors;
  }
}
