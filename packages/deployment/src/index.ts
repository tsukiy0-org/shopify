import { AppStack } from "./stacks/AppStack";
import { ExternalStack } from "./stacks/ExternalStack";
import { SystemConfiguration } from "@tsukiy0/extensions-core";
import { App } from "aws-cdk-lib";

const app = new App();

const configuration = new SystemConfiguration();
const tableName = "ShopifyTable";

new ExternalStack(app, "ShopifyExternal", {
  env: {
    account: configuration.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
  tableName,
});

new AppStack(app, "ShopifyAppUsEast1", {
  env: {
    account: configuration.get("CDK_DEFAULT_ACCOUNT"),
    region: "us-east-1",
  },
  tableName,
});
