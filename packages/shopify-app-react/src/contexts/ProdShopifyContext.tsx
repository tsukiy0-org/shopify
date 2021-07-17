import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import React, { useEffect, useState } from "react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { ApiKey, ShopId } from "@tsukiy0/shopify-app-core";
import { ShopifyContext } from "./ShopifyContext";
import { useQuery } from "./useQuery";

const ShopifyContextInnerProvider: React.FC<{ shopId: ShopId }> = ({
  shopId,
  children,
}) => {
  const app = useAppBridge();

  const getToken = async () => {
    return await getSessionToken(app);
  };

  return (
    <ShopifyContext.Provider
      value={{
        shopId,
        getToken,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const ProdShopifyContextProvider: React.FC<{
  shopifyApiKey: ApiKey;
}> = ({ children, shopifyApiKey }) => {
  const [shopId, setShopId] = useState<ShopId>();
  const query = useQuery();

  useEffect(() => {
    setShopId(ShopId.check(query.get("shop")));
  }, []);

  if (!shopId) {
    return null;
  }

  return (
    <Provider
      config={{
        apiKey: shopifyApiKey,
        host: query.get("host")!,
        forceRedirect: true,
      }}
    >
      <ShopifyContextInnerProvider shopId={shopId}>
        {children}
      </ShopifyContextInnerProvider>
    </Provider>
  );
};
