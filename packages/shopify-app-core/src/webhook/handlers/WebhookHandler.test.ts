import { ShopId } from "../../shared";
import { NoHandlerError } from "./IWebhookHandler";
import { WebhookHandler } from "./WebhookHandler";

describe("WebhookHandler", () => {
  const shopId = ShopId.check("test.myshopify.com");
  const topic = "orders/create";
  const data = {
    hi: "bye",
  };

  describe("handle", () => {
    it("when no handler then call onError", async () => {
      const sut = new WebhookHandler({});

      await expect(sut.handle(shopId, topic, data)).rejects.toThrowError(
        NoHandlerError,
      );
    });

    it("handle with matching handler", async () => {
      const handler = jest.fn();
      const sut = new WebhookHandler({
        [topic]: handler,
      });

      await sut.handle(shopId, topic, data);

      expect(handler).toHaveBeenCalledWith(shopId, data);
    });
  });
});
