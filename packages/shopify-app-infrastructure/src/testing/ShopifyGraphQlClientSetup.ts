import { AccessToken } from "@tsukiy0/shopify-app-core";
import { ShopifyGraphQlClient } from "../shared/services/ShopifyGraphQlClient";
import { TestTokenRepository } from "./TestTokenRepository";

export class ShopifyGraphQlClientSetup {
  static setup = (config: { token: AccessToken }): ShopifyGraphQlClient => {
    const client = new ShopifyGraphQlClient(
      new TestTokenRepository(config.token),
    );

    return client;
  };
}
