import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// NOTE: "type": "module" added to all package.json files to resolve
// "The CJS build of Vite's Node API is deprecated" warning
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        ".next/",
        "out/",
        "build/",
        "coverage/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      db: resolve(__dirname, "./packages/db/src"),
      core: resolve(__dirname, "./packages/core/src"),
      ui: resolve(__dirname, "./packages/ui/src"),
    },
  },
});
