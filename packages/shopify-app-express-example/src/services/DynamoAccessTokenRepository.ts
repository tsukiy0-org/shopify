import { DynamoDB } from "aws-sdk";
import {
  AccessToken,
  AccessTokenNotFoundError,
  IAccessTokenRepository,
  ShopId,
} from "@tsukiy0/shopify-app-core";

export class DynamoAccessTokenRepository implements IAccessTokenRepository {
  constructor(
    private readonly client: DynamoDB.DocumentClient,
    private readonly tableName: string,
  ) {}

  static build = (tableName: string): DynamoAccessTokenRepository => {
    return new DynamoAccessTokenRepository(
      new DynamoDB.DocumentClient(),
      tableName,
    );
  };

  put = async (shopId: ShopId, token: AccessToken): Promise<void> => {
    await this.client
      .put({
        TableName: this.tableName,
        Item: {
          PK: shopId,
          SK: "TOKEN",
          CONTENT: token,
          VERSION: 1,
        },
      })
      .promise();
  };

  get = async (shopId: ShopId): Promise<AccessToken> => {
    const res = await this.client
      .get({
        TableName: this.tableName,
        Key: {
          PK: shopId,
          SK: "TOKEN",
        },
      })
      .promise();

    if (!res.Item?.CONTENT) {
      throw new AccessTokenNotFoundError();
    }

    return AccessToken.check(res.Item.CONTENT);
  };
}
