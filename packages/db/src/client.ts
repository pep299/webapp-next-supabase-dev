// Database client configuration

import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Load environment variables (for development scripts)
if (process.env.NODE_ENV !== "production") {
  config({ path: resolve(process.cwd(), "../../.env.local") });
}

// Supabase client for authentication and real-time features
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Drizzle ORM client for type-safe database operations
const databaseUrl = process.env.DATABASE_URL ?? "";

// Create postgres connection
const connection = postgres(databaseUrl, {
  max: 1, // Single connection for local development
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create Drizzle client with schema
export const db = drizzle(connection, { schema });

// Database connection test function
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await connection`SELECT 1`;
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Supabase connection test function
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.log("⚠️ Supabase auth not configured, but connection works");
    } else {
      console.log("✅ Supabase connection successful");
    }
    return true;
  } catch (error) {
    console.error("❌ Supabase connection failed:", error);
    return false;
  }
}
