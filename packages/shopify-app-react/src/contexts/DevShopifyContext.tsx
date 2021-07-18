import { ApiKey, ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";
import { Provider } from "@shopify/app-bridge-react";
import React from "react";
import { ShopifyContext } from "./ShopifyContext";
import { sign } from "jsonwebtoken";

export const DevShopifyContextProvider: React.FC<{
  shopId: ShopId;
  apiKey: ApiKey;
  apiSecretKey: ApiSecretKey;
}> = ({ children, shopId, apiKey, apiSecretKey }) => {
  const shopHost = btoa(`${shopId}/admin`);
  const token = sign(
    {
      dest: `https://${shopId}`,
    },
    apiSecretKey,
    {
      algorithm: "HS256",
    },
  );

  return (
    <Provider
      config={{
        apiKey,
        host: shopHost,
        forceRedirect: false,
      }}
    >
      <ShopifyContext.Provider
        value={{
          shopId,
          getToken: async () => token,
        }}
      >
        {children}
      </ShopifyContext.Provider>
    </Provider>
  );
};
