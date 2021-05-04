import {
  AccessScope,
  IAppInstallationService,
  ShopId,
} from "@tsukiy0/shopify-app-core";

export class GqlAppInstallationService implements IAppInstallationService {
  listAccessScopes = async (shopId: ShopId): Promise<AccessScope[]> => {
    throw new Error("Method not implemented.");
  };
}
