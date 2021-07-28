import { AppStack } from "./stacks/AppStack";
import { ExternalStack } from "./stacks/ExternalStack";
import { SystemConfiguration } from "@tsukiy0/extensions-core";
import { App } from "aws-cdk-lib";

const app = new App();

const config = new SystemConfiguration();
const tableName = "ShopifyTable";
const shopifyApiKey = config.get("SHOPIFY_API_KEY");
const shopifyApiSecretKey = config.get("SHOPIFY_API_SECRET_KEY");
const hostUrl = config.get("HOST_URL");

new ExternalStack(app, "ShopifyExternal", {
  env: {
    account: config.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
  tableName,
});

new AppStack(app, "ShopifyAppUsEast1", {
  env: {
    account: config.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
  tableName,
  hostUrl,
  shopifyApiKey,
  shopifyApiSecretKey,
});
