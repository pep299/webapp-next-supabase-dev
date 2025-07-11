// Test helpers for database operations
import { beforeEach, afterEach } from "vitest";
import { db } from "./client";
import { users, posts } from "./schema";
import { devUtils, seedData } from "./utils";

// Test database setup and teardown
export function setupTestDb() {
  beforeEach(async () => {
    await devUtils.clearAllData();
  });

  afterEach(async () => {
    await devUtils.clearAllData();
  });
}

// Factory functions for test data
export const testDataFactory = {
  // Create a test user
  user: (overrides = {}) => ({
    email: "test@example.com",
    name: "Test User",
    avatarUrl: "https://example.com/avatar.jpg",
    ...overrides,
  }),

  // Create a test post
  post: (authorId: number, overrides = {}) => ({
    title: "Test Post",
    content: "This is a test post content",
    published: true,
    authorId,
    ...overrides,
  }),

  // Create multiple test users
  users: (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      avatarUrl: `https://example.com/avatar${i + 1}.jpg`,
    }));
  },

  // Create multiple test posts
  posts: (authorIds: number[], postsPerAuthor = 2) => {
    const posts = [];
    for (const authorId of authorIds) {
      for (let i = 0; i < postsPerAuthor; i++) {
        posts.push({
          title: `Post ${i + 1} by Author ${authorId}`,
          content: `Content for post ${i + 1} by author ${authorId}`,
          published: i % 2 === 0, // Alternate published status
          authorId,
        });
      }
    }
    return posts;
  },
};

// Test data creation helpers
export const createTestData = {
  // Create a single user
  async user(userData = {}) {
    const testUser = testDataFactory.user(userData);
    const [user] = await db.insert(users).values(testUser).returning();
    return user;
  },

  // Create multiple users
  async users(count: number) {
    const testUsers = testDataFactory.users(count);
    return await db.insert(users).values(testUsers).returning();
  },

  // Create a single post
  async post(authorId: number, postData = {}) {
    const testPost = testDataFactory.post(authorId, postData);
    const [post] = await db.insert(posts).values(testPost).returning();
    return post;
  },

  // Create multiple posts
  async posts(authorIds: number[], postsPerAuthor = 2) {
    const testPosts = testDataFactory.posts(authorIds, postsPerAuthor);
    return await db.insert(posts).values(testPosts).returning();
  },

  // Create complete test scenario
  async scenario() {
    const testUsers = await this.users(3);
    const userIds = testUsers.map((u) => u.id);
    const testPosts = await this.posts(userIds, 2);

    return {
      users: testUsers,
      posts: testPosts,
    };
  },
};

// Database state assertions for tests
export const expectDatabase = {
  // Check user count
  async toHaveUserCount(expected: number) {
    const stats = await devUtils.getStats();
    if (stats.users !== expected) {
      throw new Error(`Expected ${expected} users, but found ${stats.users}`);
    }
  },

  // Check post count
  async toHavePostCount(expected: number) {
    const stats = await devUtils.getStats();
    if (stats.posts !== expected) {
      throw new Error(`Expected ${expected} posts, but found ${stats.posts}`);
    }
  },

  // Check published post count
  async toHavePublishedPostCount(expected: number) {
    const stats = await devUtils.getStats();
    if (stats.publishedPosts !== expected) {
      throw new Error(
        `Expected ${expected} published posts, but found ${stats.publishedPosts}`
      );
    }
  },

  // Check if database is empty
  async toBeEmpty() {
    const stats = await devUtils.getStats();
    if (stats.users !== 0 || stats.posts !== 0) {
      throw new Error(
        `Expected empty database, but found ${stats.users} users and ${stats.posts} posts`
      );
    }
  },
};

// Mock data for consistent testing
export const mockData = {
  users: [
    {
      id: 1,
      email: "alice@example.com",
      name: "Alice Johnson",
      avatarUrl: "https://example.com/alice.jpg",
    },
    {
      id: 2,
      email: "bob@example.com",
      name: "Bob Smith",
      avatarUrl: "https://example.com/bob.jpg",
    },
    {
      id: 3,
      email: "charlie@example.com",
      name: "Charlie Brown",
      avatarUrl: null,
    },
  ],
  posts: [
    {
      id: 1,
      title: "First Post",
      content: "This is the first post content",
      published: true,
      authorId: 1,
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the second post content",
      published: false,
      authorId: 1,
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the third post content",
      published: true,
      authorId: 2,
    },
  ],
};
