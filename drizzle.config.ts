import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables
config({ path: ".env.local" });

export default defineConfig({
  // Schema files location
  schema: "./packages/db/src/schema.ts",

  // Output directory for migrations
  out: "./packages/db/migrations",

  // Database driver
  dialect: "postgresql",

  // Database connection
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  // Verbose logging
  verbose: true,

  // Strict mode for better type safety
  strict: true,

  // Additional configuration for local development
  tablesFilter: ["!_realtime_*", "!_supabase_*"],
});
