import { Request, Response } from "express";
import {
  ApiKey,
  ApiSecretKey,
  IAccessTokenRepository,
  IWebhookHandler,
  WebhookHandler,
} from "@tsukiy0/shopify-app-core";
import { AbstractServicesMiddleware } from "@tsukiy0/extensions-express";
import { SystemConfiguration, Url } from "@tsukiy0/extensions-core";
import { DynamoAccessTokenRepository } from "../services/DynamoAccessTokenRepository";

type Services = {
  shopifyApiKey: ApiKey;
  shopifyApiSecretKey: ApiSecretKey;
  accessTokenRepository: IAccessTokenRepository;
  hostUrl: Url;
  webhookHandler: IWebhookHandler;
};

export class ServicesMiddleware extends AbstractServicesMiddleware<Services> {
  buildServices = async (req: Request, res: Response): Promise<Services> => {
    const config = new SystemConfiguration();

    const shopifyApiKey = ApiKey.check(config.get("SHOPIFY_API_KEY"));
    const shopifyApiSecretKey = ApiSecretKey.check(
      config.get("SHOPIFY_API_SECRET_KEY"),
    );
    const hostUrl = Url.check(config.get("HOST_URL"));
    const accessTokenRepository = DynamoAccessTokenRepository.build(
      config.get("TABLE_NAME"),
    );
    const webhookHandler = new WebhookHandler({});

    return {
      shopifyApiKey,
      shopifyApiSecretKey,
      hostUrl,
      accessTokenRepository,
      webhookHandler,
    };
  };
}
