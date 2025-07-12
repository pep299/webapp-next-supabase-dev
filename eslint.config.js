import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import vitest from "@vitest/eslint-plugin";

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
          "./apps/*/tsconfig.json",
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
      // TypeScript-ESLint recommended rules (manually added)
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/triple-slash-reference": "error",

      // TypeScript-ESLint specific rules that Biome doesn't have (type-aware)
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unbound-method": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

      // TypeScript-ESLint specific rules that Biome doesn't have (basic)
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-dynamic-delete": "error",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/method-signature-style": ["error", "property"],
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-mixed-enums": "error",

      // Additional TypeScript-ESLint rules (type-aware)
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-redundant-type-constituents": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
      "@typescript-eslint/no-unsafe-enum-comparison": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/prefer-return-this-type": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/return-await": ["error", "always"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "error",

      // Disable rules that Biome handles
      "no-undef": "off",
      "no-unused-vars": "off",
      "prefer-const": "off",
      "no-console": "off",
      "no-array-constructor": "off",
      "no-empty-function": "off",
      // Disable TypeScript-ESLint rules that Biome now handles
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/adjacent-overload-signatures": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-function-type": "off",
      "@typescript-eslint/prefer-literal-enum-member": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-useless-constructor": "off",
    },
  },
  {
    files: ["**/__tests__/**/*.{ts,tsx,js,jsx}", "**/*.{test,spec}.{ts,tsx,js,jsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      // Disable problematic TypeScript-ESLint rules for test files
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
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
