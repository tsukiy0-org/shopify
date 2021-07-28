import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "../constructs/Api";
import { External } from "../constructs/External";

export class AppStack extends Stack {
  public constructor(
    scope: Construct,
    id: string,
    props: StackProps & {
      tableName: string;
      hostUrl: string;
      shopifyApiKey: string;
      shopifyApiSecretKey: string;
    },
  ) {
    super(scope, id, props);

    const external = new External(this, "External", {
      tableName: props.tableName,
    });
    const api = new Api(this, "Api", {
      external,
      hostUrl: props.hostUrl,
      shopifyApiKey: props.shopifyApiKey,
      shopifyApiSecretKey: props.shopifyApiSecretKey,
    });

    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
