import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  year: integer("year").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}).enableRLS();
