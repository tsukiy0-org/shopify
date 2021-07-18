import React, { useContext } from "react";
import { DevShopifyContextProvider } from "./DevShopifyContext";
import { ProdShopifyContextProvider } from "./ProdShopifyContext";
import { ApiKey, ApiSecretKey, ShopId } from "@tsukiy0/shopify-app-core";

type Value = {
  getToken: () => Promise<string>;
  shopId: ShopId;
};

export const ShopifyContext = React.createContext<Value>({} as any);

export const ShopifyContextProvider: React.FC<{
  apiKey: ApiKey;
  dev?: {
    apiSecretKey: ApiSecretKey;
    shopId: ShopId;
  };
}> = ({ dev, apiKey, children }) => {
  if (dev) {
    return (
      <DevShopifyContextProvider {...dev} apiKey={apiKey}>
        {children}
      </DevShopifyContextProvider>
    );
  }

  return (
    <ProdShopifyContextProvider apiKey={apiKey}>
      {children}
    </ProdShopifyContextProvider>
  );
};

export const useShopifyContext = (): Value => useContext(ShopifyContext);
