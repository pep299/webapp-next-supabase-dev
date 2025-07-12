#!/usr/bin/env tsx
// Development script for database operations
import { testDatabaseConnection, testSupabaseConnection } from "../client";
import { devUtils, seedData } from "../utils";

const commands = {
  // Test database connections
  async "test-connections"() {
    console.log("🔍 Testing database connections...\n");

    const dbResult = await testDatabaseConnection();
    const supabaseResult = await testSupabaseConnection();

    console.log("\n📊 Connection Summary:");
    console.log(`Database: ${dbResult ? "✅ Connected" : "❌ Failed"}`);
    console.log(`Supabase: ${supabaseResult ? "✅ Connected" : "❌ Failed"}`);

    if (dbResult && supabaseResult) {
      console.log("\n🎉 All connections successful!");
      return 0;
    }
    console.log(
      "\n❌ Some connections failed. Please check your configuration."
    );
    return 1;
  },

  // Show database statistics
  async stats() {
    console.log("📊 Database Statistics:\n");

    try {
      const stats = await devUtils.getStats();
      console.log(`👥 Users: ${stats.users}`);
      console.log(`📝 Posts: ${stats.posts}`);
      console.log(`📰 Published Posts: ${stats.publishedPosts}`);
      console.log(`📄 Draft Posts: ${stats.posts - stats.publishedPosts}`);

      if (stats.users === 0 && stats.posts === 0) {
        console.log(
          "\n💡 Database is empty. Run 'pnpm db:seed' to add sample data."
        );
      }

      return 0;
    } catch (error) {
      console.error("❌ Failed to get database statistics:", error);
      return 1;
    }
  },

  // Seed database with sample data
  async seed() {
    console.log("🌱 Seeding database with sample data...\n");

    try {
      await seedData.seedDatabase();
      console.log("\n📊 New database statistics:");
      const stats = await devUtils.getStats();
      console.log(`👥 Users: ${stats.users}`);
      console.log(`📝 Posts: ${stats.posts}`);
      console.log(`📰 Published Posts: ${stats.publishedPosts}`);
      return 0;
    } catch (error) {
      console.error("❌ Failed to seed database:", error);
      return 1;
    }
  },

  // Clear all data
  async clear() {
    console.log("🧹 Clearing all database data...\n");

    try {
      await devUtils.clearAllData();
      console.log("✅ All data cleared successfully!");
      return 0;
    } catch (error) {
      console.error("❌ Failed to clear database:", error);
      return 1;
    }
  },

  // Reset database (clear + seed)
  async reset() {
    console.log("🔄 Resetting database (clear + seed)...\n");

    try {
      await devUtils.clearAllData();
      console.log("✅ Database cleared");

      await seedData.seedDatabase();
      console.log("✅ Database seeded");

      console.log("\n🎉 Database reset complete!");
      return 0;
    } catch (error) {
      console.error("❌ Failed to reset database:", error);
      return 1;
    }
  },

  // Show help
  async help() {
    console.log("📚 Available database development commands:\n");
    console.log("  test-connections  - Test database and Supabase connections");
    console.log("  stats            - Show database statistics");
    console.log("  seed             - Seed database with sample data");
    console.log("  clear            - Clear all database data");
    console.log("  reset            - Clear and seed database");
    console.log("  help             - Show this help message");
    console.log("\nUsage: pnpm db:dev <command>");
    console.log("Example: pnpm db:dev test-connections");
    return 0;
  },
};

// Main execution
async function main() {
  const command = process.argv[2] as keyof typeof commands;

  if (!command || !(command in commands)) {
    console.error("❌ Invalid or missing command\n");
    await commands.help();
    process.exit(1);
  }

  try {
    const exitCode = await commands[command]();
    process.exit(exitCode);
  } catch (error) {
    console.error("💥 Unexpected error:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
