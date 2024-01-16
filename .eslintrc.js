const devConfig = require("@tailor-platform/dev-config/eslint");

module.exports = {
  ...devConfig,
  ignorePatterns: [...devConfig.ignorePatterns, "*.config.js"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
