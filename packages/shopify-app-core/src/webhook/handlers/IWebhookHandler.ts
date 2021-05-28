import { ShopId, ShopifyAppError } from "../../shared";

export interface IWebhookHandler {
  handle(shopId: ShopId, topic: string, data: any): Promise<void>;
}

export class NoHandlerError extends ShopifyAppError {}
