import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Note: setupFiles removed as this package doesn't need React setup
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
