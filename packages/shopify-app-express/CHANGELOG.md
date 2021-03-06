# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0-alpha.41](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.40...v0.1.0-alpha.41) (2021-08-06)


### Features

* bump version ([7e5b6ae](https://github.com/tsukiy0-org/shopify/commit/7e5b6aef66aa1a361b65b4cb51a071c215b53394))





# [0.1.0-alpha.40](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.39...v0.1.0-alpha.40) (2021-08-05)


### Features

* hook onto existing logger to avoid uncorrelated logs ([248d43b](https://github.com/tsukiy0-org/shopify/commit/248d43ba002a09e4c6d1c2016a91a02959143465))
* throw error to avoid continue ([ee668db](https://github.com/tsukiy0-org/shopify/commit/ee668db85ecc2632688f7d3afe9eb371dc81aefc))





# [0.1.0-alpha.39](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.38...v0.1.0-alpha.39) (2021-08-05)


### Bug Fixes

* pass hmac from header ([6ecb17e](https://github.com/tsukiy0-org/shopify/commit/6ecb17ecd4e65f5123e11c3ca2ab2ed60f9fce1d))
* stop processing when failed to verify hmac ([4cb8c8e](https://github.com/tsukiy0-org/shopify/commit/4cb8c8e4f9693a4252464c3e4fce9707fd33fa5a))


### Features

* use randomized key ([7c34caa](https://github.com/tsukiy0-org/shopify/commit/7c34caa54826ed513ff8d411877dad01c7c9c651))





# [0.1.0-alpha.38](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.37...v0.1.0-alpha.38) (2021-08-04)


### Features

* export VerifyHmacWebhookMiddleware ([7c67af2](https://github.com/tsukiy0-org/shopify/commit/7c67af211377327f4210b9d11d1fa989d7c704de))





# [0.1.0-alpha.37](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.36...v0.1.0-alpha.37) (2021-08-04)


### Bug Fixes

* give req instead of req.body ([5359fc2](https://github.com/tsukiy0-org/shopify/commit/5359fc2f896615f4176c99f2f2795c7ff8926037))





# [0.1.0-alpha.36](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.35...v0.1.0-alpha.36) (2021-08-04)


### Features

* bump extensions-js version ([4ff033d](https://github.com/tsukiy0-org/shopify/commit/4ff033df44fcc8e0d24f6dac73395a5a2188d2b2))
* test JwtAuthMiddleware ([adfb43e](https://github.com/tsukiy0-org/shopify/commit/adfb43edf90f62ee7e3be73041c5ca4aca8455d7))
* use raw-body to parse body ([5a903f6](https://github.com/tsukiy0-org/shopify/commit/5a903f60ef85bbbd03abfdbe92bd8beb2fc399f2))





# [0.1.0-alpha.35](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.34...v0.1.0-alpha.35) (2021-07-24)


### Features

* move webhook middleware right onto the endpoint ([8522d16](https://github.com/tsukiy0-org/shopify/commit/8522d1654e01dd608269d749bf78f03b0065bed4))





# [0.1.0-alpha.34](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.33...v0.1.0-alpha.34) (2021-07-24)


### Features

* add versioning to webhook and usage subscription apis ([2257b24](https://github.com/tsukiy0-org/shopify/commit/2257b249d9e40cf3f0cf6e76acdb6b19622cb7a4))





# [0.1.0-alpha.33](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.32...v0.1.0-alpha.33) (2021-07-21)


### Features

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


### Features

* merge v2 AuthRouter and simplify API with single props obj ([b8d6f28](https://github.com/tsukiy0-org/shopify/commit/b8d6f28af12147af523447064c5675e7fb55026b))





# [0.1.0-alpha.30](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.29...v0.1.0-alpha.30) (2021-07-17)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





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

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.25](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.24...v0.1.0-alpha.25) (2021-07-03)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.24](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.23...v0.1.0-alpha.24) (2021-07-02)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.23](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.22...v0.1.0-alpha.23) (2021-07-01)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.22](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.21...v0.1.0-alpha.22) (2021-07-01)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.21](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.20...v0.1.0-alpha.21) (2021-06-26)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.20](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.19...v0.1.0-alpha.20) (2021-06-03)


### Bug Fixes

* end webhook request ([260000e](https://github.com/tsukiy0-org/shopify/commit/260000efed578b4f64fd0b31ec7dd8027e16bac0))





# [0.1.0-alpha.19](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.18...v0.1.0-alpha.19) (2021-05-31)


### Features

* AuthHandler create request now decides which url to redirect to ([88b5844](https://github.com/tsukiy0-org/shopify/commit/88b5844228cb0eacb1ed9ed7a0091b608075fe14))





# [0.1.0-alpha.18](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.17...v0.1.0-alpha.18) (2021-05-30)


### Features

* UsageSubscription parses json ([f596760](https://github.com/tsukiy0-org/shopify/commit/f596760a55df77abfd3fd239061c29844b99e9f0))





# [0.1.0-alpha.17](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.16...v0.1.0-alpha.17) (2021-05-29)


### Features

* update router construction ([1300098](https://github.com/tsukiy0-org/shopify/commit/1300098550229629207443d194088685c62584e5))





# [0.1.0-alpha.16](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.15...v0.1.0-alpha.16) (2021-05-29)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.15](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.14...v0.1.0-alpha.15) (2021-05-29)


### Features

* use di for routers ([8beaf80](https://github.com/tsukiy0-org/shopify/commit/8beaf804faa1de1cc5903b16734808b09d87bdeb))





# [0.1.0-alpha.14](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.13...v0.1.0-alpha.14) (2021-05-29)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.13](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.12...v0.1.0-alpha.13) (2021-05-29)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.12](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.11...v0.1.0-alpha.12) (2021-05-29)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.11](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.10...v0.1.0-alpha.11) (2021-05-29)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.10](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.9...v0.1.0-alpha.10) (2021-05-29)


### Bug Fixes

* AuthRouter parsing incrrect query param as shop ([f5d8e8d](https://github.com/tsukiy0-org/shopify/commit/f5d8e8de80edb1ef1b5a5963480843d28b477770))


### Features

* add WebhookRouter ([2f918f3](https://github.com/tsukiy0-org/shopify/commit/2f918f38229df59b102decdbab7ae2fc222addc7))
* simplify AuthRouter to handle response ([3c15099](https://github.com/tsukiy0-org/shopify/commit/3c150992df1b933e39dcace3071b5f7966f904dd))





# [0.1.0-alpha.9](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.8...v0.1.0-alpha.9) (2021-05-28)


### Features

* add separate callback for complete ([dd20797](https://github.com/tsukiy0-org/shopify/commit/dd20797bef8c180666b667adeaa54329c6a817da))
* replace URL with Url string type ([3b583fd](https://github.com/tsukiy0-org/shopify/commit/3b583fdc70639233ac5522006ee74ab4fa3964dc))





# [0.1.0-alpha.8](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.7...v0.1.0-alpha.8) (2021-05-27)


### Features

* export UsageSubscriptionRouter ([7730941](https://github.com/tsukiy0-org/shopify/commit/77309417c12715db5b6fa534a280c231ee0721f3))
* remove create charge from handler ([85e07b6](https://github.com/tsukiy0-org/shopify/commit/85e07b67c1a27c3d83e0a7dcdaa5e287310163bc))
* return authorization urls for client to do redirect ([8969559](https://github.com/tsukiy0-org/shopify/commit/896955966c9605104af7ab018c4b75ce734afa8b))





# [0.1.0-alpha.7](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.6...v0.1.0-alpha.7) (2021-05-27)


### Bug Fixes

* only check hmac query on relevant paths ([ec7c3e4](https://github.com/tsukiy0-org/shopify/commit/ec7c3e41ae2283e5a8ac299318e4c5ac204c2247))





# [0.1.0-alpha.6](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2021-05-27)

**Note:** Version bump only for package @tsukiy0/shopify-app-express





# [0.1.0-alpha.5](https://github.com/tsukiy0-org/shopify/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2021-05-27)


### Features

* hide dependencies of router ([f899390](https://github.com/tsukiy0-org/shopify/commit/f899390f44cc7c9a46923c12e402abd5d7d93cd0))





# 0.1.0-alpha.4 (2021-05-26)


### Bug Fixes

* AuthRouter not pulling shop id from correct query param ([5eb5532](https://github.com/tsukiy0-org/shopify/commit/5eb5532dc9809edcc419677ff533d2576529bf9d))


### Features

* add CompleteInstallRequest ([02a52c6](https://github.com/tsukiy0-org/shopify/commit/02a52c6a78c1912c1e27d325bf55c8a9b7732768))
* add empty shopify-app-express package ([f63ce16](https://github.com/tsukiy0-org/shopify/commit/f63ce168e0b5f326274e4af22a4c2ea2ccb4c32e))
* add JwtAuthMiddlware ([5f256c1](https://github.com/tsukiy0-org/shopify/commit/5f256c1f7e9cf0ca4631a104dbd9a30a7df307b9))
* add RequestVerifier ([6789767](https://github.com/tsukiy0-org/shopify/commit/6789767171a4d94a5b4efb0e561af26113bc9344))
* add StartInstallRequest with validation ([0128767](https://github.com/tsukiy0-org/shopify/commit/01287675f0276d8fd7510e4b059f26f5bada3230))
* add UsageSubscriptionRouter ([fb37ea6](https://github.com/tsukiy0-org/shopify/commit/fb37ea62fdbfd24b8ba0bc5c868e3c302cae0053))
* impl AuthRouter ([0309177](https://github.com/tsukiy0-org/shopify/commit/03091778d0f14afa35aa1ce4348e46e71fa5075d))
* verify auth requests ([d6cfdf7](https://github.com/tsukiy0-org/shopify/commit/d6cfdf7612623520a353d74022204c30e4607b2b))
* wire up AuthRouter to example ([3ab49cc](https://github.com/tsukiy0-org/shopify/commit/3ab49cc4ef025a576e9231a1ac719ef25ae06ee8))





# 0.1.0-alpha.0 (2021-05-26)


### Bug Fixes

* AuthRouter not pulling shop id from correct query param ([5eb5532](https://github.com/tsukiy0-org/shopify/commit/5eb5532dc9809edcc419677ff533d2576529bf9d))


### Features

* add CompleteInstallRequest ([02a52c6](https://github.com/tsukiy0-org/shopify/commit/02a52c6a78c1912c1e27d325bf55c8a9b7732768))
* add empty shopify-app-express package ([f63ce16](https://github.com/tsukiy0-org/shopify/commit/f63ce168e0b5f326274e4af22a4c2ea2ccb4c32e))
* add JwtAuthMiddlware ([5f256c1](https://github.com/tsukiy0-org/shopify/commit/5f256c1f7e9cf0ca4631a104dbd9a30a7df307b9))
* add RequestVerifier ([6789767](https://github.com/tsukiy0-org/shopify/commit/6789767171a4d94a5b4efb0e561af26113bc9344))
* add StartInstallRequest with validation ([0128767](https://github.com/tsukiy0-org/shopify/commit/01287675f0276d8fd7510e4b059f26f5bada3230))
* add UsageSubscriptionRouter ([fb37ea6](https://github.com/tsukiy0-org/shopify/commit/fb37ea62fdbfd24b8ba0bc5c868e3c302cae0053))
* impl AuthRouter ([0309177](https://github.com/tsukiy0-org/shopify/commit/03091778d0f14afa35aa1ce4348e46e71fa5075d))
* verify auth requests ([d6cfdf7](https://github.com/tsukiy0-org/shopify/commit/d6cfdf7612623520a353d74022204c30e4607b2b))
* wire up AuthRouter to example ([3ab49cc](https://github.com/tsukiy0-org/shopify/commit/3ab49cc4ef025a576e9231a1ac719ef25ae06ee8))
