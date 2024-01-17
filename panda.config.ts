import { defineConfig } from "@pandacss/dev";
import {
  globalCss,
  recipes,
  slotRecipes,
  textStyles,
  tokens,
  semanticTokens,
} from "@tailor-platform/design-systems/client";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Use React as generated JSX elements
  jsxFramework: "react",

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      recipes,
      slotRecipes,
      textStyles,
      tokens: {
        ...tokens,
      },
      semanticTokens: {
        ...semanticTokens,
      },
    },
  },

  // Global CSS
  globalCss,

  // Emit styled-system as package
  emitPackage: true,
});
