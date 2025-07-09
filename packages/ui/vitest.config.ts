import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    // Note: setupFiles temporarily removed for placeholder tests
    // TODO: Re-enable when actual React component tests are added
    // setupFiles: ["../../vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
