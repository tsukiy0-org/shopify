import React, { useContext } from "react";
import { DevShopifyContextProvider } from "./DevShopifyContext";
import { ProdShopifyContextProvider } from "./ProdShopifyContext";
import { ApiKey, ShopId } from "@tsukiy0/shopify-app-core";

type Value = {
  getToken: () => Promise<string>;
  shopId: ShopId;
};

const isDevelopment = process.env.NODE_ENV === "development";

export const ShopifyContext = React.createContext<Value>({} as any);

export const ShopifyContextProvider: React.FC<{
  getDev: () => {
    shopId: ShopId;
    token: string;
  };
  shopifyApiKey: ApiKey;
}> = ({ getDev, shopifyApiKey, children }) => {
  if (isDevelopment) {
    return (
      <DevShopifyContextProvider {...getDev()} shopifyApiKey={shopifyApiKey}>
        {children}
      </DevShopifyContextProvider>
    );
  }

  return (
    <ProdShopifyContextProvider shopifyApiKey={shopifyApiKey}>
      {children}
    </ProdShopifyContextProvider>
  );
};

export const useShopifyContext = (): Value => useContext(ShopifyContext);
