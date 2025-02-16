export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {}
};
