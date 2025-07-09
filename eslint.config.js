import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: parser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: [
          "./tsconfig.json",
          "./packages/*/tsconfig.lint.json",
          "./apps/*/tsconfig.json"
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      // TypeScript-ESLint specific rules that Biome doesn't have
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      // Disable rules that Biome handles
      "no-undef": "off",
      "no-unused-vars": "off",
      "prefer-const": "off",
      "no-console": "off",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      ".next",
      "out",
      "build",
      "**/vitest.config.ts",
      "**/next.config.js",
      "**/tailwind.config.js",
      "**/.next/**",
    ],
  },
];
