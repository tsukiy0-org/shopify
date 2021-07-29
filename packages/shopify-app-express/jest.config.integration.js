const base = require("./jest.config");

module.exports = {
  ...base,
  preset: "ts-jest",
  testMatch: ["**/*.integrationTest.ts"],
  testTimeout: 60000,
  setupFiles: ["./setupIntegrationTests.js"],
};
