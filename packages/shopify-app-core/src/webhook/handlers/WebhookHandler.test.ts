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
      const onError = jest.fn();
      const sut = new WebhookHandler({}, onError);

      await sut.handle(shopId, topic, data);

      expect(onError).toHaveBeenCalledWith(
        expect.any(NoHandlerError),
        shopId,
        topic,
        data,
      );
    });

    it("when handler throws then call onError", async () => {
      const onError = jest.fn();
      const sut = new WebhookHandler(
        {
          [topic]: async () => {
            throw new RangeError();
          },
        },
        onError,
      );

      await sut.handle(shopId, topic, data);

      expect(onError).toHaveBeenCalledWith(
        expect.any(RangeError),
        shopId,
        topic,
        data,
      );
    });

    it("handle with matching handler", async () => {
      const onError = jest.fn();
      const handler = jest.fn();
      const sut = new WebhookHandler(
        {
          [topic]: handler,
        },
        onError,
      );

      await sut.handle(shopId, topic, data);

      expect(handler).toHaveBeenCalledWith(shopId, data);
      expect(onError).not.toHaveBeenCalled();
    });
  });
});
