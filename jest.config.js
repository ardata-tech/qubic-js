module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/test/**/*.test.ts"], // Look for tests inside `test/`
  clearMocks: true, // Automatically clear mock calls
  coverageDirectory: "coverage", // Generate coverage reports
  collectCoverageFrom: ["src/**/*.ts"], // Include all source files in coverage
};
