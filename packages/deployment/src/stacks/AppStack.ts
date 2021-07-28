import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "../constructs/Api";

export class AppStack extends Stack {
  public constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const api = new Api(this, "Api");

    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
