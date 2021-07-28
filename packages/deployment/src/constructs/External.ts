import { ITable, Table } from "aws-cdk-lib/lib/aws-dynamodb";
import { Construct } from "constructs";

export class External extends Construct {
  public readonly table: ITable;

  public constructor(
    scope: Construct,
    id: string,
    props: {
      tableName: string;
    },
  ) {
    super(scope, id);

    const table = Table.fromTableName(this, "Table", props.tableName);

    this.table = table;
  }
}
