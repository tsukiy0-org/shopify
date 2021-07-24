# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0-alpha.34](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.33...v0.1.0-alpha.34) (2021-07-24)


### Features

* add versioning to webhook and usage subscription apis ([2257b24](https://github.com/tsukiy0-org/shopify/commit/2257b249d9e40cf3f0cf6e76acdb6b19622cb7a4))





# [0.1.0-alpha.33](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.32...v0.1.0-alpha.33) (2021-07-21)


### Features

* add 2021-07 graphql types ([0f2c180](https://github.com/tsukiy0-org/shopify/commit/0f2c180f4e9f3f23b3614051c7a331a965f79f9b))
* bump API_VERSION to 2021-07 ([b7dd3b5](https://github.com/tsukiy0-org/shopify/commit/b7dd3b5798bdce76c44ee54b79328d243b004867))
* update AuthRouter to follow getProps pattern to get from res ([cb7d22d](https://github.com/tsukiy0-org/shopify/commit/cb7d22d952cdf643580582805890ac63a91952d1))
* update JwtAuthMiddleware to use getProps ([251e463](https://github.com/tsukiy0-org/shopify/commit/251e463dbfd5d9e44048211630f6e0d46c806891))
* update UsageSubscriptionRouter to use getProps ([8e702f3](https://github.com/tsukiy0-org/shopify/commit/8e702f3eebc3c37ceb32cf72ae2be79fbd47fcb2))
* update WebhookRouter to use getRouter ([2de953b](https://github.com/tsukiy0-org/shopify/commit/2de953b6468dcfd860c4907b712d281e8f352fab))





# [0.1.0-alpha.32](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.31...v0.1.0-alpha.32) (2021-07-20)


### Bug Fixes

* JwtAuthMiddleware not calling next ([6352ae4](https://github.com/tsukiy0-org/shopify/commit/6352ae4ce682d89249451df25802869882ba1c81))


### Features

* bump @tsukiy0/extensions ([e00f986](https://github.com/tsukiy0-org/shopify/commit/e00f98680ba11f2dd439a08d2ea3ae0c029d2ce3))





# [0.1.0-alpha.31](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.30...v0.1.0-alpha.31) (2021-07-18)


### Bug Fixes

* do not make nextjs specific by checking NODE_ENV ([1bec172](https://github.com/tsukiy0-org/shopify/commit/1bec1727a59a7223c2d2f416a8214a167837a5d7))


### Features

* generate token same as AuthHelper ([a0dc564](https://github.com/tsukiy0-org/shopify/commit/a0dc5649b3cd8851a576acbb679119b72fbc2c0c))
* inline getting query from window ([ba4962a](https://github.com/tsukiy0-org/shopify/commit/ba4962af7d37dcae33ffdf622116871bdaa85fae))
* merge v2 AuthRouter and simplify API with single props obj ([b8d6f28](https://github.com/tsukiy0-org/shopify/commit/b8d6f28af12147af523447064c5675e7fb55026b))





# [0.1.0-alpha.30](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.29...v0.1.0-alpha.30) (2021-07-17)


### Features

* add ShopifyContext ([c3bfa5a](https://github.com/tsukiy0-org/shopify/commit/c3bfa5a1548abb913c58e52e501516ad049a2b62))
* stub out shopify-app-react package ([89d89d3](https://github.com/tsukiy0-org/shopify/commit/89d89d3352bc0b6bb356b3810b82fdbb24acb1bd))





# [0.1.0-alpha.29](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.28...v0.1.0-alpha.29) (2021-07-17)


### Features

* add AuthRouterV2 ([42269f8](https://github.com/tsukiy0-org/shopify/commit/42269f899f53e53d6789ce6a73aeb8ab6cf44bd3))
* add getShopId to JwtAuthMiddleware ([ff02a4f](https://github.com/tsukiy0-org/shopify/commit/ff02a4f4b2450d0311f43b40e22c1d5ce19e984a))
* add VerifyHmacQueryMiddleware ([f0e2917](https://github.com/tsukiy0-org/shopify/commit/f0e2917fec8ebf561700f8de93f0f3e385f0303e))





# [0.1.0-alpha.28](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.27...v0.1.0-alpha.28) (2021-07-17)


### Features

* bump tsukiy0/extensions versions ([a930af6](https://github.com/tsukiy0-org/shopify/commit/a930af63ee7d953fbecaad665fb45fb70fff27f1))
* bump versions to latest ([3ebe18b](https://github.com/tsukiy0-org/shopify/commit/3ebe18bd374640dff541647a0f2011524b561e8b))





# [0.1.0-alpha.27](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.26...v0.1.0-alpha.27) (2021-07-04)


### Features

* simplify WebhookRouter to log errors ([b278639](https://github.com/tsukiy0-org/shopify/commit/b27863905ce696d66b3424633f7d604c9408846c))





# [0.1.0-alpha.26](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.25...v0.1.0-alpha.26) (2021-07-03)

**Note:** Version bump only for package root





# [0.1.0-alpha.25](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.24...v0.1.0-alpha.25) (2021-07-03)


### Features

* request error container status and body as text ([621b532](https://github.com/tsukiy0-org/shopify/commit/621b53280a30cd44ed4ea1e94013477055f9aa8b))





# [0.1.0-alpha.24](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.23...v0.1.0-alpha.24) (2021-07-02)


### Bug Fixes

* 400 and above is an http error ([3403025](https://github.com/tsukiy0-org/shopify/commit/3403025f3c4a629d0abbfab1833ccf5baa8a3523))





# [0.1.0-alpha.23](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.22...v0.1.0-alpha.23) (2021-07-01)


### Features

* build ShopifyRestClient for public and private apps ([e3da48d](https://github.com/tsukiy0-org/shopify/commit/e3da48d2d7b01cb7832f90cab16a877b0a1ddb77))





# [0.1.0-alpha.22](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.21...v0.1.0-alpha.22) (2021-07-01)

**Note:** Version bump only for package root





# [0.1.0-alpha.21](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.20...v0.1.0-alpha.21) (2021-06-26)


### Features

* allow building both public and private app graphql clients ([9828437](https://github.com/tsukiy0-org/shopify/commit/9828437655aebe6c34995b8bbed4abf152778e61))





# [0.1.0-alpha.20](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.19...v0.1.0-alpha.20) (2021-06-03)


### Bug Fixes

* end webhook request ([260000e](https://github.com/tsukiy0-org/shopify/commit/260000efed578b4f64fd0b31ec7dd8027e16bac0))





# [0.1.0-alpha.19](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.18...v0.1.0-alpha.19) (2021-05-31)


### Bug Fixes

* bad query fields ([817150d](https://github.com/tsukiy0-org/shopify/commit/817150d909226fa036563735c8558c88e78b4376))
* delete is a mutation ([87e240f](https://github.com/tsukiy0-org/shopify/commit/87e240ff84d01cb2a99bb81e58756918bde36990))
* typo in script tag delete ([86f94dd](https://github.com/tsukiy0-org/shopify/commit/86f94dd5c898082a3ae5457527065f8ffb15eb7e))
* typo in script tag query ([39f3f41](https://github.com/tsukiy0-org/shopify/commit/39f3f41ec6c4ff72e3400ce6114fcdce20606b1e))


### Features

* add AuthHelper for generate jwt for testing ([97f453f](https://github.com/tsukiy0-org/shopify/commit/97f453f71f4d324b62208ff526ceee86a759401e))
* add get and delete to ScriptTagService ([3602893](https://github.com/tsukiy0-org/shopify/commit/3602893785336fa3f7b7e5d3f4e002beef2eb5eb))
* add PageCursor ([729448c](https://github.com/tsukiy0-org/shopify/commit/729448c09bf5eb4f829dc8c474b1d00dc58e0270))
* AuthHandler create request now decides which url to redirect to ([88b5844](https://github.com/tsukiy0-org/shopify/commit/88b5844228cb0eacb1ed9ed7a0091b608075fe14))





# [0.1.0-alpha.18](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.17...v0.1.0-alpha.18) (2021-05-30)


### Features

* UsageSubscription parses json ([f596760](https://github.com/tsukiy0-org/shopify/commit/f596760a55df77abfd3fd239061c29844b99e9f0))





# [0.1.0-alpha.17](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.16...v0.1.0-alpha.17) (2021-05-29)


### Features

* update router construction ([1300098](https://github.com/tsukiy0-org/shopify/commit/1300098550229629207443d194088685c62584e5))





# [0.1.0-alpha.16](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.15...v0.1.0-alpha.16) (2021-05-29)

**Note:** Version bump only for package root





# [0.1.0-alpha.15](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.14...v0.1.0-alpha.15) (2021-05-29)


### Features

* use di for routers ([8beaf80](https://github.com/tsukiy0-org/shopify/commit/8beaf804faa1de1cc5903b16734808b09d87bdeb))





# [0.1.0-alpha.14](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.13...v0.1.0-alpha.14) (2021-05-29)


### Features

* add UrlExtensions for appendPath and appendQuery ([bcaf580](https://github.com/tsukiy0-org/shopify/commit/bcaf5805357ef1dc785934ad7afc33a7c610c9a7))





# [0.1.0-alpha.13](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.12...v0.1.0-alpha.13) (2021-05-29)


### Features

* export GetUsageSubscriptionResonse ([79a9d89](https://github.com/tsukiy0-org/shopify/commit/79a9d89e4967b48032bd7d7501fa22f6caf68a0e))





# [0.1.0-alpha.12](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.11...v0.1.0-alpha.12) (2021-05-29)


### Features

* handle when subscription not found ([762958f](https://github.com/tsukiy0-org/shopify/commit/762958fa92d4c745f2850b106c0167e6f0336abf))





# [0.1.0-alpha.11](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.10...v0.1.0-alpha.11) (2021-05-29)


### Bug Fixes

* perform auth check when fetching scopes ([8b8076c](https://github.com/tsukiy0-org/shopify/commit/8b8076cfadd567a9b40b4bc40df814611d9b8542))





# [0.1.0-alpha.10](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.9...v0.1.0-alpha.10) (2021-05-29)


### Bug Fixes

* AuthRouter parsing incrrect query param as shop ([f5d8e8d](https://github.com/tsukiy0-org/shopify/commit/f5d8e8de80edb1ef1b5a5963480843d28b477770))


### Features

* add more permissions to example app (used to tests) ([9c9afa8](https://github.com/tsukiy0-org/shopify/commit/9c9afa892b1419b54c637c33f9e7080e2228ad2f))
* add WebhookRouter ([2f918f3](https://github.com/tsukiy0-org/shopify/commit/2f918f38229df59b102decdbab7ae2fc222addc7))
* simplify AuthRouter to handle response ([3c15099](https://github.com/tsukiy0-org/shopify/commit/3c150992df1b933e39dcace3071b5f7966f904dd))





# [0.1.0-alpha.9](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.8...v0.1.0-alpha.9) (2021-05-28)


### Features

* add separate callback for complete ([dd20797](https://github.com/tsukiy0-org/shopify/commit/dd20797bef8c180666b667adeaa54329c6a817da))
* add ShopifyRestClient ([b9cc733](https://github.com/tsukiy0-org/shopify/commit/b9cc7331f7a482c94693150097349e08a482685a))
* add WebhookHandler ([728b501](https://github.com/tsukiy0-org/shopify/commit/728b5010d09ecbdc764eb7b4d3ee738fb0072aeb))
* define IScriptTagService ([85e0703](https://github.com/tsukiy0-org/shopify/commit/85e0703806fee44695039ad87fc0108022fc9885))
* define IWebhookService ([61e0f05](https://github.com/tsukiy0-org/shopify/commit/61e0f0574d92c0bcf8bdbddd7f50e2955026a7d4))
* extract infrastructure testing to own package ([441cd99](https://github.com/tsukiy0-org/shopify/commit/441cd99f623163ed2d25f87a77c852fdc5bd5f63))
* impl GqlScriptTagService ([a9b2f6e](https://github.com/tsukiy0-org/shopify/commit/a9b2f6e87b09b0098655c6202ab2c4d7d81d6705))
* impl GqlWebhookService ([b6084c0](https://github.com/tsukiy0-org/shopify/commit/b6084c01a4fff6752d7fa8c8302c23c9fe9fa694))
* remove unused Enum runtype ([33d01cb](https://github.com/tsukiy0-org/shopify/commit/33d01cbe883066d5187ad4bd5aeff807370d088a))
* replace URL with Url string type ([3b583fd](https://github.com/tsukiy0-org/shopify/commit/3b583fdc70639233ac5522006ee74ab4fa3964dc))
* use Url type to validate url string and remove branded types and ([00d63d8](https://github.com/tsukiy0-org/shopify/commit/00d63d81da769b7f81f30e365a82acdc4ca48ca6))





# [0.1.0-alpha.8](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.7...v0.1.0-alpha.8) (2021-05-27)


### Features

* export UsageSubscriptionRouter ([7730941](https://github.com/tsukiy0-org/shopify/commit/77309417c12715db5b6fa534a280c231ee0721f3))
* prefill return url with app url ([4e67077](https://github.com/tsukiy0-org/shopify/commit/4e670775eb77f644da5e25bee9a8f81449674393))
* remove create charge from handler ([85e07b6](https://github.com/tsukiy0-org/shopify/commit/85e07b67c1a27c3d83e0a7dcdaa5e287310163bc))
* return authorization urls for client to do redirect ([8969559](https://github.com/tsukiy0-org/shopify/commit/896955966c9605104af7ab018c4b75ce734afa8b))





# [0.1.0-alpha.7](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.6...v0.1.0-alpha.7) (2021-05-27)


### Bug Fixes

* only check hmac query on relevant paths ([ec7c3e4](https://github.com/tsukiy0-org/shopify/commit/ec7c3e41ae2283e5a8ac299318e4c5ac204c2247))





# [0.1.0-alpha.6](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2021-05-27)

**Note:** Version bump only for package root





# [0.1.0-alpha.5](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2021-05-27)


### Features

* hide dependencies of router ([f899390](https://github.com/tsukiy0-org/shopify/commit/f899390f44cc7c9a46923c12e402abd5d7d93cd0))





# 0.1.0-alpha.4 (2021-05-26)


### Bug Fixes

* add a scope ([e56775c](https://github.com/tsukiy0-org/shopify/commit/e56775c1372c23f6052add6de410e759505204f1))
* AuthRouter not pulling shop id from correct query param ([5eb5532](https://github.com/tsukiy0-org/shopify/commit/5eb5532dc9809edcc419677ff533d2576529bf9d))
* fetch not found in HttpOAuthService ([846e593](https://github.com/tsukiy0-org/shopify/commit/846e5939e720ba3cfbd04266e3ae2b64e2c85c4e))
* ignore .test.ts files ([8cdf34e](https://github.com/tsukiy0-org/shopify/commit/8cdf34e7a9377a9f2f6d1b87f7ad0d73c0caf97a))


### Features

* 2020-07 ARN scalar as string ([f6d2a29](https://github.com/tsukiy0-org/shopify/commit/f6d2a29eb9b8f7dd3950c5275a15f2f409f93529))
* add AppSubscriptionId ([17e1b69](https://github.com/tsukiy0-org/shopify/commit/17e1b69570731de6324d48c5cd8833eea6b99521))
* add AppUsageSubscriptionService ([b859b5d](https://github.com/tsukiy0-org/shopify/commit/b859b5d3a8b6a67208366554389863de83eadabc))
* add AuthHandler ([166054d](https://github.com/tsukiy0-org/shopify/commit/166054d89889ebe4e5736e309d32c36dacc38c62))
* add BillingAmount ([7046d5e](https://github.com/tsukiy0-org/shopify/commit/7046d5ebe4d9a8d54c9a6d0dcdba34c1cf32989c))
* add CompleteInstallRequest ([02a52c6](https://github.com/tsukiy0-org/shopify/commit/02a52c6a78c1912c1e27d325bf55c8a9b7732768))
* add empty shopify-app-express package ([f63ce16](https://github.com/tsukiy0-org/shopify/commit/f63ce168e0b5f326274e4af22a4c2ea2ccb4c32e))
* add Enum type ([4525283](https://github.com/tsukiy0-org/shopify/commit/45252837d4472b23118088e48a6d78697b8547bf))
* add handlers to managing usage subscription ([a877b89](https://github.com/tsukiy0-org/shopify/commit/a877b89ac4635adbf80d7b4d478779c49bbd90b9))
* add integration tests for GqlAppInstallationService ([bb28d2b](https://github.com/tsukiy0-org/shopify/commit/bb28d2bf121c2d1196859421aa9342fa16187bf7))
* add JwtAuthMiddlware ([5f256c1](https://github.com/tsukiy0-org/shopify/commit/5f256c1f7e9cf0ca4631a104dbd9a30a7df307b9))
* add RequestVerifier ([6789767](https://github.com/tsukiy0-org/shopify/commit/6789767171a4d94a5b4efb0e561af26113bc9344))
* add script to loop through and gen multiple versions ([0e8876a](https://github.com/tsukiy0-org/shopify/commit/0e8876a7259405b45552585ecb45c222ace3b60f))
* add shopify-app-core package ([466e4ba](https://github.com/tsukiy0-org/shopify/commit/466e4ba613d588ca531d0e0ef0f8e0063033d0cf))
* add shopify-express-example for experimenting ([8b468d7](https://github.com/tsukiy0-org/shopify/commit/8b468d76ba893f803559edbacac7716dac4d778a))
* add shopify-graphql-types package ([ae5a0c8](https://github.com/tsukiy0-org/shopify/commit/ae5a0c813d32e76d6f6ad391d6283fe1b000deb1))
* add StartInstallRequest with validation ([0128767](https://github.com/tsukiy0-org/shopify/commit/01287675f0276d8fd7510e4b059f26f5bada3230))
* add UsageSubscriptionRouter ([fb37ea6](https://github.com/tsukiy0-org/shopify/commit/fb37ea62fdbfd24b8ba0bc5c868e3c302cae0053))
* charges can be created with a description ([d1fa058](https://github.com/tsukiy0-org/shopify/commit/d1fa0583f13ce86b8f0f7195c53a9a7f8e792ae4))
* complete impl of UsageSubscriptionHandler ([6e78443](https://github.com/tsukiy0-org/shopify/commit/6e78443e71f597cd794db8db03192e81cfec7e07))
* define IAppInstallationService ([2ec8b76](https://github.com/tsukiy0-org/shopify/commit/2ec8b76d3f91780f451048c668c9c38c95909ed9))
* define IAuthTokenService ([4fd69c6](https://github.com/tsukiy0-org/shopify/commit/4fd69c6ca113401ef4bef7a3f20237f34d4fcaf1))
* define IOAuthService ([9a168ab](https://github.com/tsukiy0-org/shopify/commit/9a168abeb1d32afe1b305a686bd7e4c212921111))
* define IUsageSubscriptionHandler ([d0e281a](https://github.com/tsukiy0-org/shopify/commit/d0e281ab4137f2ff39df9e83405a6a388b86dd73))
* export all versions through index ([35e98f1](https://github.com/tsukiy0-org/shopify/commit/35e98f15369a198f51ac52230b5e709908a01e9c))
* generate 2020-10 ([07bb43d](https://github.com/tsukiy0-org/shopify/commit/07bb43d40f354e824095a975a7755091bc13eacb))
* generate 2021-01 ([2b38bc2](https://github.com/tsukiy0-org/shopify/commit/2b38bc2db7efe0c78330d9e195b4e761a207b21d))
* generate 2021-04 ([ed240ee](https://github.com/tsukiy0-org/shopify/commit/ed240ee114a74c82fd106aa8ce3e543dbce30468))
* impl AuthRouter ([0309177](https://github.com/tsukiy0-org/shopify/commit/03091778d0f14afa35aa1ce4348e46e71fa5075d))
* impl CompleteInstallHandler ([bd8df73](https://github.com/tsukiy0-org/shopify/commit/bd8df73a4142471bd017d23f1e33eed77d34057e))
* impl GqlAppInstallationService ([be7fc2b](https://github.com/tsukiy0-org/shopify/commit/be7fc2b28533a7fad0eab65a5bb3447b3231fc88))
* impl GqlAppUsageSubscriptionService ([96c1251](https://github.com/tsukiy0-org/shopify/commit/96c125195fdc2500638b40077e6e2a6ee80fdc25))
* impl HttpOAuthService ([64a832b](https://github.com/tsukiy0-org/shopify/commit/64a832b4492445208cb6afebda4ac6055b3b5e2b))
* impl StartInstallHandler ([19d51f4](https://github.com/tsukiy0-org/shopify/commit/19d51f43ff2df58ea0b2397a29ff4ffcebe812f4))
* index has only most recent api version ([ec11132](https://github.com/tsukiy0-org/shopify/commit/ec11132d9e836f2113c16118e1cad7e7f5e0eab2))
* IOAuthService explicitly requires api keys ([1fbc245](https://github.com/tsukiy0-org/shopify/commit/1fbc245514faaaf67dfb5017727ac57df76042c6))
* redirect to /success ([d398788](https://github.com/tsukiy0-org/shopify/commit/d39878838c31670b891b690daef7b1ce609de8b4))
* remove old impl of individual billing handlers ([fc389ce](https://github.com/tsukiy0-org/shopify/commit/fc389ceaa090f4044f1f73657d795d016ecff60e))
* run example with ngrok ([8b2d6ec](https://github.com/tsukiy0-org/shopify/commit/8b2d6ec3dceba88aa576bd73345c3a094d6ae23e))
* stub out shopify-app-infrastructure package ([c3a6604](https://github.com/tsukiy0-org/shopify/commit/c3a6604c64e65ed74cdaa17ab8fb66e92dda1409))
* stub out UsageSubscriptionHandler impl ([ff67898](https://github.com/tsukiy0-org/shopify/commit/ff678989cb2808e4101fd2ab7feb151572d66569))
* test can be provided at the service level ([5812ed0](https://github.com/tsukiy0-org/shopify/commit/5812ed0a1e7813daaeccc4d617f39a8fcae11eb3))
* verify auth requests ([d6cfdf7](https://github.com/tsukiy0-org/shopify/commit/d6cfdf7612623520a353d74022204c30e4607b2b))
* wire up AuthRouter to example ([3ab49cc](https://github.com/tsukiy0-org/shopify/commit/3ab49cc4ef025a576e9231a1ac719ef25ae06ee8))
