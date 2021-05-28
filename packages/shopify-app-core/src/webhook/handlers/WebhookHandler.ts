import { ShopId } from "../../shared";
import { IWebhookHandler, NoHandlerError } from "./IWebhookHandler";

export class WebhookHandler implements IWebhookHandler {
  constructor(
    private readonly handlers: Record<
      string,
      (shopId: ShopId, data: any) => Promise<void>
    >,
    private readonly onError: (
      error: Error,
      shopId: ShopId,
      topic: string,
      data: any,
    ) => Promise<void>,
  ) {}

  handle = async (shopId: ShopId, topic: string, data: any): Promise<void> => {
    try {
      const handler = this.handlers[topic];

      if (!handler) {
        throw new NoHandlerError();
      }

      await handler(shopId, data);
    } catch (e) {
      await this.onError(e, shopId, topic, data);
    }
  };
}
