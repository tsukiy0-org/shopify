import { Stack, StackProps } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  Table,
} from "aws-cdk-lib/lib/aws-dynamodb";
import { Construct } from "constructs";

export class ExternalStack extends Stack {
  public constructor(
    scope: Construct,
    id: string,
    props: StackProps & {
      tableName: string;
    },
  ) {
    super(scope, id, props);

    new Table(this, "Table", {
      tableName: props.tableName,
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
  }
}
