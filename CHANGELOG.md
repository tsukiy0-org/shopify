# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
