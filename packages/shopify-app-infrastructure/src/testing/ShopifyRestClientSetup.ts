import { AccessToken } from "@tsukiy0/shopify-app-core";
import { ShopifyRestClient } from "../shared";
import { TestTokenRepository } from "./TestTokenRepository";

export class ShopifyRestClientSetup {
  static setup = (config: { token: AccessToken }): ShopifyRestClient => {
    const client = new ShopifyRestClient(new TestTokenRepository(config.token));

    return client;
  };
}
