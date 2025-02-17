export default {
  preset: "ts-jest/presets/default-esm", // Use ESM with TypeScript
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  clearMocks: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".js"], // Treat JavaScript files as ESM too
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      { useESM: true }
    ]
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};
