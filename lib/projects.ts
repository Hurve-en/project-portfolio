import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export type Project = {
  slug: string;
  title: string;
  year: number;
  summary: string;
  imageUrl: string | null;
};
export type Stats = { total: number; newest: number; oldest: number };

const columns = {
  slug: projects.slug,
  title: projects.title,
  year: projects.year,
  summary: projects.summary,
  imageUrl: projects.imageUrl,
};

export async function readProjects(): Promise<Project[]> {
  return db.select(columns).from(projects).orderBy(desc(projects.createdAt));
}

export async function readProject(slug: string): Promise<Project | null> {
  const [row] = await db
    .select(columns)
    .from(projects)
    .where(eq(projects.slug, slug));
  return row ?? null;
}

export async function readStats(): Promise<Stats> {
  const years = (await db.select({ year: projects.year }).from(projects)).map(
    (p) => p.year,
  );
  return {
    total: years.length,
    newest: years.length ? Math.max(...years) : 0,
    oldest: years.length ? Math.min(...years) : 0,
  };
}
