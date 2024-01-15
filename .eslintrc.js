const devConfig = require("@tailor-platform/dev-config/eslint");

module.exports = {
  ...devConfig,
  ignorePatterns: [
    ...devConfig.ignorePatterns,
    "tailwind.config.js",
    "next.config.js",
    "postcss.config.js",
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
