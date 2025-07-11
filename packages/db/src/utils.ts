// Database utility functions for development and testing
import { eq } from "drizzle-orm";
import { db } from "./client";
import { users, posts, type NewUser, type NewPost } from "./schema";

// User utilities
export const userUtils = {
  // Create a new user
  async create(userData: NewUser) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  },

  // Get user by ID
  async getById(id: number) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user;
  },

  // Get user by email
  async getByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  },

  // Get all users
  async getAll() {
    return await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  },

  // Update user
  async update(id: number, userData: Partial<NewUser>) {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  },

  // Delete user
  async delete(id: number) {
    await db.delete(users).where(eq(users.id, id));
  },
};

// Post utilities
export const postUtils = {
  // Create a new post
  async create(postData: NewPost) {
    const [post] = await db.insert(posts).values(postData).returning();
    return post;
  },

  // Get post by ID with author
  async getById(id: number) {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        author: true,
      },
    });
    return post;
  },

  // Get all posts with authors
  async getAll() {
    return await db.query.posts.findMany({
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  },

  // Get published posts only
  async getPublished() {
    return await db.query.posts.findMany({
      where: eq(posts.published, true),
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  },

  // Get posts by author
  async getByAuthor(authorId: number) {
    return await db.query.posts.findMany({
      where: eq(posts.authorId, authorId),
      with: {
        author: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  },

  // Update post
  async update(id: number, postData: Partial<NewPost>) {
    const [post] = await db
      .update(posts)
      .set({ ...postData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post;
  },

  // Delete post
  async delete(id: number) {
    await db.delete(posts).where(eq(posts.id, id));
  },

  // Toggle published status
  async togglePublished(id: number) {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
    if (!post) return null;

    const [updatedPost] = await db
      .update(posts)
      .set({ published: !post.published, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  },
};

// Seed data for development
export const seedData = {
  // Create sample users
  async createSampleUsers() {
    const sampleUsers = [
      {
        email: "john@example.com",
        name: "John Doe",
        avatarUrl: "https://via.placeholder.com/150",
      },
      {
        email: "jane@example.com",
        name: "Jane Smith",
        avatarUrl: "https://via.placeholder.com/150",
      },
      {
        email: "bob@example.com",
        name: "Bob Johnson",
      },
    ];

    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = await userUtils.create(userData);
      createdUsers.push(user);
    }

    return createdUsers;
  },

  // Create sample posts
  async createSamplePosts(authorIds: number[]) {
    const samplePosts = [
      {
        title: "Getting Started with Next.js",
        content: "Next.js is a powerful React framework...",
        published: true,
        authorId: authorIds[0],
      },
      {
        title: "Understanding Drizzle ORM",
        content: "Drizzle ORM provides type-safe database queries...",
        published: true,
        authorId: authorIds[1],
      },
      {
        title: "Draft: Future of Web Development",
        content: "This is a draft post about the future...",
        published: false,
        authorId: authorIds[0],
      },
      {
        title: "Building with Supabase",
        content: "Supabase makes backend development easier...",
        published: true,
        authorId: authorIds[2],
      },
    ];

    const createdPosts = [];
    for (const postData of samplePosts) {
      const post = await postUtils.create(postData);
      createdPosts.push(post);
    }

    return createdPosts;
  },

  // Full seed operation
  async seedDatabase() {
    console.log("🌱 Seeding database with sample data...");

    try {
      // Create sample users
      const users = await this.createSampleUsers();
      console.log(`✅ Created ${users.length} sample users`);

      // Create sample posts
      const userIds = users.map((user) => user.id);
      const posts = await this.createSamplePosts(userIds);
      console.log(`✅ Created ${posts.length} sample posts`);

      console.log("🎉 Database seeding completed!");
      return { users, posts };
    } catch (error) {
      console.error("❌ Database seeding failed:", error);
      throw error;
    }
  },
};

// Development utilities
export const devUtils = {
  // Clear all data (for testing)
  async clearAllData() {
    console.log("🧹 Clearing all database data...");
    await db.delete(posts);
    await db.delete(users);
    console.log("✅ All data cleared");
  },

  // Get database statistics
  async getStats() {
    const userCount = await db.$count(users);
    const postCount = await db.$count(posts);
    const publishedCount = await db.$count(posts, eq(posts.published, true));

    return {
      users: userCount,
      posts: postCount,
      publishedPosts: publishedCount,
    };
  },
};
