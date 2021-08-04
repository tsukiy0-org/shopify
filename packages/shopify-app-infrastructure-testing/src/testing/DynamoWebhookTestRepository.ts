import { DynamoDB } from "aws-sdk";
import { ShopId } from "@tsukiy0/shopify-app-core";
import { Guid } from "@tsukiy0/extensions-core";

export class DynamoWebhookTestRepository {
  constructor(
    private readonly client: DynamoDB.DocumentClient,
    private readonly tableName: string,
  ) {}

  static build = (tableName: string): DynamoWebhookTestRepository => {
    return new DynamoWebhookTestRepository(
      new DynamoDB.DocumentClient(),
      tableName,
    );
  };

  put = async (shopId: ShopId, id: Guid): Promise<void> => {
    await this.client
      .put({
        TableName: this.tableName,
        Item: {
          PK: shopId,
          SK: `WEBHOOK_TEST##${id}`,
          VERSION: 1,
        },
      })
      .promise();
  };

  exists = async (shopId: ShopId, id: Guid): Promise<boolean> => {
    const res = await this.client
      .get({
        TableName: this.tableName,
        Key: {
          PK: shopId,
          SK: `WEBHOOK_TEST##${id}`,
        },
      })
      .promise();

    return Boolean(res.Item);
  };
}
