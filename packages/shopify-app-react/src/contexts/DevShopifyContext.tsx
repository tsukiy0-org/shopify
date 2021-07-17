import { ApiKey, ShopId } from "@tsukiy0/shopify-app-core";
import { Provider } from "@shopify/app-bridge-react";
import React from "react";
import { ShopifyContext } from "./ShopifyContext";

export const DevShopifyContextProvider: React.FC<{
  token: string;
  shopId: ShopId;
  shopifyApiKey: ApiKey;
}> = ({ children, shopId, token, shopifyApiKey }) => {
  const shopHost = btoa(`${shopId}/admin`);

  return (
    <Provider
      config={{
        apiKey: shopifyApiKey,
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
