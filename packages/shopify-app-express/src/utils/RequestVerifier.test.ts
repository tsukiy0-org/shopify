import { ApiSecretKey } from "@tsukiy0/shopify-app-core";
import {
  InvalidAuthRequestError,
  InvalidWebhookRequestError,
  RequestVerifier,
} from "./RequestVerifier";

describe("RequestVerifier", () => {
  const sut = new RequestVerifier({
    apiSecretKey: ApiSecretKey.check("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"),
  });

  describe("verifyJwt", () => {
    it("when valid", () => {
      const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3RzdWtpeTAtb3JnLWRldi0xLm15c2hvcGlmeS5jb20vYWRtaW4iLCJkZXN0IjoiaHR0cHM6Ly90c3VraXkwLW9yZy1kZXYtMS5teXNob3BpZnkuY29tIiwiYXVkIjoiZWYxMGMyMzExNDAzNmU0MTc1ZjE1ODgzMGUwOGFmYmQiLCJzdWIiOiI2NjgwNzAwNTM4OSIsImV4cCI6MTkxODIyMTg0NiwibmJmIjoxNjE4MjIxODQ2LCJpYXQiOjE2MTgyMjE4NDYsImp0aSI6ImYyZGYzNTI5LWRjNGItNDZiNC04Y2MxLTQzYmMyYTE3OWM2ZiIsInNpZCI6ImFjMjc1YTkyZWJiYzJiYTY3YWIyOTg4MTEwMWZlOWIyMjkwNjEwMWU4MzEyMjk4ZTEwYjBkM2ZhODhjMzk0ZGYifQ.Ao01da0zEQ3NF0S51wrs86KA0SN2jhjtk7z7PumwKEI";

      const actual = sut.verifyJwt(jwt);

      expect(actual).toEqual("tsukiy0-org-dev-1.myshopify.com");
    });

    it("when expired then throw", () => {
      const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3RzdWtpeTAtb3JnLWRldi0xLm15c2hvcGlmeS5jb20vYWRtaW4iLCJkZXN0IjoiaHR0cHM6Ly90c3VraXkwLW9yZy1kZXYtMS5teXNob3BpZnkuY29tIiwiYXVkIjoiZWYxMGMyMzExNDAzNmU0MTc1ZjE1ODgzMGUwOGFmYmQiLCJzdWIiOiI2NjgwNzAwNTM4OSIsImV4cCI6MTYxODIyMTg0NiwibmJmIjoxNjE4MjIxODQ2LCJpYXQiOjE2MTgyMjE4NDYsImp0aSI6ImYyZGYzNTI5LWRjNGItNDZiNC04Y2MxLTQzYmMyYTE3OWM2ZiIsInNpZCI6ImFjMjc1YTkyZWJiYzJiYTY3YWIyOTg4MTEwMWZlOWIyMjkwNjEwMWU4MzEyMjk4ZTEwYjBkM2ZhODhjMzk0ZGYifQ.xWq0YMns-uHkdd1zbo3JNdSZ5UG87w7Zk9VSFdKu608";

      expect(() => sut.verifyJwt(jwt)).toThrowError();
    });
  });

  describe("verifyAuth", () => {
    const query = {
      hmac: "fd9b0fcffccd55768d79ddcb8cc4143d4ab800a4b175b1d5c68a493a450730a9",
      shop: "tsukiy0-org-dev-1.myshopify.com",
      timestamp: "1620433564",
    };

    it("when valid then return", () => {
      expect(() => sut.verifyAuth(query)).not.toThrow();
    });

    it("when unordered valid then return", () => {
      expect(() =>
        sut.verifyAuth({
          shop: "tsukiy0-org-dev-1.myshopify.com",
          hmac:
            "fd9b0fcffccd55768d79ddcb8cc4143d4ab800a4b175b1d5c68a493a450730a9",
          timestamp: "1620433564",
        }),
      ).not.toThrow();
    });

    it("when bad query then throw", () => {
      expect(() =>
        sut.verifyAuth({
          ...query,
          gibberish: "true",
        }),
      ).toThrow(InvalidAuthRequestError);
    });
  });

  describe("verifyWebhook", () => {
    it("when valid then do not throw", () => {
      const hmac = "SCn6dhB0TFm1mYsxjbbMxJRDW3tVRBH4fiMfRLomLDc=";
      const body = `{"id":3653782667469,"admin_graphql_api_id":"gid:\/\/shopify\/Order\/3653782667469","app_id":1354745,"browser_ip":null,"buyer_accepts_marketing":false,"cancel_reason":null,"cancelled_at":null,"cart_token":null,"checkout_id":null,"checkout_token":null,"closed_at":null,"confirmed":true,"contact_email":null,"created_at":"2021-04-20T19:50:21+10:00","currency":"AUD","current_subtotal_price":"70.00","current_subtotal_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"current_total_discounts":"0.00","current_total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"current_total_duties_set":null,"current_total_price":"70.00","current_total_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"current_total_tax":"0.00","current_total_tax_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"customer_locale":null,"device_id":null,"discount_codes":[],"email":"","financial_status":"paid","fulfillment_status":null,"gateway":"Cash on Delivery (COD)","landing_site":null,"landing_site_ref":null,"location_id":57305727181,"name":"#1022","note":"","note_attributes":[],"number":22,"order_number":1022,"order_status_url":"https:\/\/order-verification-by-sms.myshopify.com\/50771230925\/orders\/f6a7aaa98169328615bc9be8021f1f25\/authenticate?key=648f97d51bf9361442fdaa22fe3cb503","original_total_duties_set":null,"payment_gateway_names":["Cash on Delivery (COD)"],"phone":null,"presentment_currency":"AUD","processed_at":"2021-04-20T19:50:21+10:00","processing_method":"manual","reference":null,"referring_site":null,"source_identifier":null,"source_name":"shopify_draft_order","source_url":null,"subtotal_price":"70.00","subtotal_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"tags":"","tax_lines":[],"taxes_included":false,"test":false,"token":"f6a7aaa98169328615bc9be8021f1f25","total_discounts":"0.00","total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_line_items_price":"70.00","total_line_items_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"total_outstanding":"0.00","total_price":"70.00","total_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"total_price_usd":"54.02","total_shipping_price_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_tax":"0.00","total_tax_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_tip_received":"0.00","total_weight":0,"updated_at":"2021-04-20T19:50:22+10:00","user_id":66807005389,"discount_applications":[],"fulfillments":[],"line_items":[{"id":9609212395725,"admin_graphql_api_id":"gid:\/\/shopify\/LineItem\/9609212395725","fulfillable_quantity":1,"fulfillment_service":"manual","fulfillment_status":null,"gift_card":false,"grams":0,"name":"ADIDAS | CLASSIC BACKPACK - OS \/ black","price":"70.00","price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"product_exists":true,"product_id":6535776010445,"properties":[],"quantity":1,"requires_shipping":true,"sku":"AD-03-black-OS","taxable":true,"title":"ADIDAS | CLASSIC BACKPACK","total_discount":"0.00","total_discount_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"variant_id":39250387730637,"variant_inventory_management":"shopify","variant_title":"OS \/ black","vendor":"ADIDAS","tax_lines":[],"duties":[],"discount_allocations":[]}],"refunds":[],"shipping_lines":[]}`;

      expect(() => sut.verifyWebhook(hmac, body)).not.toThrowError();
    });

    it("when not valid then throw", () => {
      const hmac = "SCn6dhB0TFm1mYsxjbbMxJRDW3tVRBH4fiMfRLomLDc=";
      const body =
        'gibberish!{"id":3653782667469,"admin_graphql_api_id":"gid://shopify/Order/3653782667469","app_id":1354745,"browser_ip":null,"buyer_accepts_marketing":false,"cancel_reason":null,"cancelled_at":null,"cart_token":null,"checkout_id":null,"checkout_token":null,"closed_at":null,"confirmed":true,"contact_email":null,"created_at":"2021-04-20T19:50:21+10:00","currency":"AUD","current_subtotal_price":"70.00","current_subtotal_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"current_total_discounts":"0.00","current_total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"current_total_duties_set":null,"current_total_price":"70.00","current_total_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"current_total_tax":"0.00","current_total_tax_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"customer_locale":null,"device_id":null,"discount_codes":[],"email":"","financial_status":"paid","fulfillment_status":null,"gateway":"Cash on Delivery (COD)","landing_site":null,"landing_site_ref":null,"location_id":57305727181,"name":"#1022","note":"","note_attributes":[],"number":22,"order_number":1022,"order_status_url":"https://order-verification-by-sms.myshopify.com/50771230925/orders/f6a7aaa98169328615bc9be8021f1f25/authenticate?key=648f97d51bf9361442fdaa22fe3cb503","original_total_duties_set":null,"payment_gateway_names":["Cash on Delivery (COD)"],"phone":null,"presentment_currency":"AUD","processed_at":"2021-04-20T19:50:21+10:00","processing_method":"manual","reference":null,"referring_site":null,"source_identifier":null,"source_name":"shopify_draft_order","source_url":null,"subtotal_price":"70.00","subtotal_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"tags":"","tax_lines":[],"taxes_included":false,"test":false,"token":"f6a7aaa98169328615bc9be8021f1f25","total_discounts":"0.00","total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_line_items_price":"70.00","total_line_items_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"total_outstanding":"0.00","total_price":"70.00","total_price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"total_price_usd":"54.02","total_shipping_price_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_tax":"0.00","total_tax_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"total_tip_received":"0.00","total_weight":0,"updated_at":"2021-04-20T19:50:22+10:00","user_id":66807005389,"discount_applications":[],"fulfillments":[],"line_items":[{"id":9609212395725,"admin_graphql_api_id":"gid://shopify/LineItem/9609212395725","fulfillable_quantity":1,"fulfillment_service":"manual","fulfillment_status":null,"gift_card":false,"grams":0,"name":"ADIDAS | CLASSIC BACKPACK - OS / black","price":"70.00","price_set":{"shop_money":{"amount":"70.00","currency_code":"AUD"},"presentment_money":{"amount":"70.00","currency_code":"AUD"}},"product_exists":true,"product_id":6535776010445,"properties":[],"quantity":1,"requires_shipping":true,"sku":"AD-03-black-OS","taxable":true,"title":"ADIDAS | CLASSIC BACKPACK","total_discount":"0.00","total_discount_set":{"shop_money":{"amount":"0.00","currency_code":"AUD"},"presentment_money":{"amount":"0.00","currency_code":"AUD"}},"variant_id":39250387730637,"variant_inventory_management":"shopify","variant_title":"OS / black","vendor":"ADIDAS","tax_lines":[],"duties":[],"discount_allocations":[]}],"refunds":[],"shipping_lines":[]}';

      expect(() => sut.verifyWebhook(hmac, body)).toThrowError(
        InvalidWebhookRequestError,
      );
    });
  });
});
