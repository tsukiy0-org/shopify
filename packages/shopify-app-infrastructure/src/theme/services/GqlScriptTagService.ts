import {
  MutationScriptTagCreateArgs,
  MutationScriptTagDeleteArgs,
  QueryRootScriptTagsArgs,
  ScriptTagConnection,
  ScriptTagCreatePayload,
  ScriptTagDeletePayload,
  ScriptTagDisplayScope,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import {
  IScriptTagService,
  ScriptTag,
  ScriptTagNotFoundError,
  ShopId,
  Url,
} from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient, ShopifyUserError } from "../../shared";

export class GqlScriptTagService implements IScriptTagService {
  constructor(private readonly client: ShopifyGraphQlClient) {}
  create = async (scriptTag: ScriptTag): Promise<void> => {
    const result = await this.client.request<
      {
        scriptTagCreate: ScriptTagCreatePayload;
      },
      MutationScriptTagCreateArgs
    >(
      scriptTag.shopId,
      gql`
        mutation Task($input: ScriptTagInput!) {
          scriptTagCreate(input: $input) {
            scriptTag {
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
        input: {
          src: scriptTag.url,
          displayScope: scriptTag.scope,
        },
      },
    );

    if (result.scriptTagCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.scriptTagCreate.userErrors);
    }
  };

  get = async (
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<ScriptTag> => {
    const results = await this.getAll(shopId, url, scope);

    if (results.length === 0) {
      throw new ScriptTagNotFoundError();
    }

    return ScriptTag.check({
      shopId,
      url,
      scope,
    });
  };

  delete = async (
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<void> => {
    const results = await this.getAll(shopId, url, scope);

    await Promise.all(
      results.map(async (_) => {
        const result = await this.client.request<
          {
            scriptTagDelete: ScriptTagDeletePayload;
          },
          MutationScriptTagDeleteArgs
        >(
          shopId,
          gql`
            query Task($id: ID!) {
              scriptsTagDelete(id: $id) {
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          {
            id: _,
          },
        );

        if (result.scriptTagDelete.userErrors.length > 0) {
          throw new ShopifyUserError(result.scriptTagDelete.userErrors);
        }
      }),
    );
  };

  private getAll = async (
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<string[]> => {
    const result = await this.client.request<
      {
        scriptTags: ScriptTagConnection;
      },
      QueryRootScriptTagsArgs
    >(
      shopId,
      gql`
        query Task($first: Int!, $src: String!) {
          scriptsTags(first: $first, src: $src) {
            scriptTag {
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
        first: 100,
        src: url,
      },
    );

    return result.scriptTags.edges
      .filter((_) => _.node.displayScope === scope)
      .map((_) => _.node.id);
  };
}
