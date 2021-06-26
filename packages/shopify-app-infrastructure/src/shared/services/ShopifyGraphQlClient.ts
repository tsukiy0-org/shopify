import { ClientError } from "graphql-request";
import {
  IAccessTokenRepository,
  ShopId,
  ShopifyAppError,
  UnauthorizedError,
} from "@tsukiy0/shopify-app-core";
import { UserError } from "@tsukiy0/shopify-admin-graphql-types";
import { IGraphQlClientBuilder } from "./IGraphQlClientBuilder";
import { ShopifyPublicAppGraphQlClientBuilder } from "./ShopifyPublicAppGraphQlClientBuilder";
import { ShopifyPrivateAppGraphQlClientBuilder } from "./ShopifyPrivateAppGraphQlClientBuilder";

export class ShopifyGraphQlClient {
  constructor(private readonly clientBuilder: IGraphQlClientBuilder) {}

  static buildPublic = (
    accessTokenRepository: IAccessTokenRepository,
  ): ShopifyGraphQlClient => {
    const builder = new ShopifyPublicAppGraphQlClientBuilder(
      accessTokenRepository,
    );
    return new ShopifyGraphQlClient(builder);
  };

  static buildPrivate = (
    apiKey: string,
    password: string,
  ): ShopifyGraphQlClient => {
    const builder = new ShopifyPrivateAppGraphQlClientBuilder(apiKey, password);
    return new ShopifyGraphQlClient(builder);
  };

  request = async <T = any, V = any>(
    shopId: ShopId,
    document: string,
    variables?: V,
  ): Promise<T> => {
    const client = await this.clientBuilder.build(shopId);
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
}

export class ShopifyUserError extends ShopifyAppError {
  public readonly errors: UserError[];

  constructor(errors: UserError[]) {
    super();
    this.errors = errors;
  }
}
