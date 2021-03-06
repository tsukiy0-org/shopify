import {
  DefaultFunction,
  DefaultLambdaRestApi,
} from "@tsukiy0/extensions-aws-cdk";
import { Code, Runtime } from "aws-cdk-lib/lib/aws-lambda";
import { Construct } from "constructs";
import path from "path";
import { External } from "./External";

export class Api extends Construct {
  public readonly url: string;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      external: External;
      hostUrl: string;
      shopifyApiKey: string;
      shopifyApiSecretKey: string;
    },
  ) {
    super(scope, id);

    const fn = new DefaultFunction(this, "Function", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(
        path.resolve(__dirname, "../../../shopify-app-express-example/dist"),
      ),
      memorySize: 256,
      handler: "index.handler",
      environment: {
        TABLE_NAME: props.external.table.tableName,
        HOST_URL: props.hostUrl,
        SHOPIFY_API_KEY: props.shopifyApiKey,
        SHOPIFY_API_SECRET_KEY: props.shopifyApiSecretKey,
      },
    });
    props.external.table.grantReadWriteData(fn);

    const api = new DefaultLambdaRestApi(this, "Api", {
      fn,
    });

    this.url = api.url;
  }
}
