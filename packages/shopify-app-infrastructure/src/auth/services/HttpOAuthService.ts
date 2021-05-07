import {
  AccessScope,
  AccessToken,
  IOAuthService,
  ShopId,
  ApiKey,
  ApiSecretKey,
  ShopifyAppError,
} from "@tsukiy0/shopify-app-core";
import fetch from "cross-fetch";

export class HttpOAuthService implements IOAuthService {
  buildAuthorizeUrl = (
    shopId: ShopId,
    scopes: AccessScope[],
    redirectUrl: URL,
    apiKey: ApiKey,
  ): URL => {
    const url = new URL(`https://${shopId}/admin/oauth/authorize`);
    url.searchParams.append("client_id", apiKey);
    url.searchParams.append("scope", scopes.sort().join(","));
    url.searchParams.append("redirect_uri", redirectUrl.toString());
    return url;
  };

  getAccessToken = async (
    shopId: ShopId,
    code: string,
    apiKey: ApiKey,
    apiSecretKey: ApiSecretKey,
  ): Promise<AccessToken> => {
    const res = await fetch(`https://${shopId}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecretKey,
        code: code,
      }),
    });

    if (res.status !== 200) {
      throw new GetTokenRequestError();
    }

    const body: {
      access_token?: string;
    } = await res.json();

    return AccessToken.check(body.access_token);
  };
}

export class GetTokenRequestError extends ShopifyAppError {}
