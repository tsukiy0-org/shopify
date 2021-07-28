import {
  DefaultFunction,
  DefaultLambdaRestApi,
} from "@tsukiy0/extensions-aws-cdk";
import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";
import path from "path";

export class Api extends Construct {
  public readonly url: string;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(
        path.resolve(__dirname, "../../../shopify-app-express-example/dist"),
      ),
      handler: "index.handler",
      environment: {},
    });

    const api = new DefaultLambdaRestApi(this, "Api", {
      fn,
    });

    this.url = api.url;
  }
}
