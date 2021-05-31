import { ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import jwt from "jsonwebtoken";
import { AuthHelper } from "./AuthHelper";

describe("AuthHelper", () => {
  it("", () => {
    const j = AuthHelper.generateJwt(
      ShopId.check("test.myshopify.com"),
      ApiSecretKey.check("testtest"),
    );

    const actual = jwt.decode(j) as {
      iss: string;
      dest: string;
      exp: number;
      iat: number;
    };

    expect(actual.exp - actual.iat).toEqual(3600);
    expect(actual.iss).toEqual("https://test.myshopify.com");
    expect(actual.dest).toEqual("https://test.myshopify.com");
  });
});
