// Database schema definitions using Drizzle ORM

import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    avatarUrl: varchar("avatar_url", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => ({
    // Indexes for better performance
    emailIdx: index("users_email_idx").on(users.email),
    createdAtIdx: index("users_created_at_idx").on(users.createdAt),
  })
);

// Posts table
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content"),
    published: boolean("published").default(false).notNull(),
    authorId: integer("author_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (posts) => ({
    // Indexes for better performance
    authorIdx: index("posts_author_idx").on(posts.authorId),
    publishedIdx: index("posts_published_idx").on(posts.published),
    createdAtIdx: index("posts_created_at_idx").on(posts.createdAt),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

// Type exports for use in application code
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
