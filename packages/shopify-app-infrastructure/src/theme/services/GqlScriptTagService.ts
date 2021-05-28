import {
  MutationScriptTagCreateArgs,
  ScriptTagCreatePayload,
  ScriptTagDisplayScope,
} from "@tsukiy0/shopify-admin-graphql-types";
import { gql } from "graphql-request";
import {
  IScriptTagService,
  ScriptTagId,
  ShopId,
  Url,
} from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient, ShopifyUserError } from "../../shared";

export class GqlScriptTagService implements IScriptTagService {
  constructor(private readonly client: ShopifyGraphQlClient) {}

  create = async (
    shopId: ShopId,
    url: Url,
    scope: ScriptTagDisplayScope,
  ): Promise<ScriptTagId> => {
    const result = await this.client.request<
      {
        scriptTagCreate: ScriptTagCreatePayload;
      },
      MutationScriptTagCreateArgs
    >(
      shopId,
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
          src: url,
          displayScope: scope,
        },
      },
    );

    if (result.scriptTagCreate.userErrors.length > 0) {
      throw new ShopifyUserError(result.scriptTagCreate.userErrors);
    }

    return ScriptTagId.check(result.scriptTagCreate.scriptTag!.id);
  };
}
