module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: [
    "<rootDir>/**/__tests__/**/*.(ts|tsx)",
    "<rootDir>/**/*.(test|spec).(ts|tsx)",
  ],
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  collectCoverageFrom: [
    "**/*.(ts|tsx)",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],
};
