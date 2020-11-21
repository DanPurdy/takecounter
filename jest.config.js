/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "!**/ts/index.ts", "!**/typings/*"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "babel",
  preset: 'ts-jest',
};
