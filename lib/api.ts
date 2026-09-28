import "server-only";
import {
  readProject,
  readProjects,
  readStats,
  type Project,
  type Stats,
} from "@/lib/projects";

export const fetchProjects = (): Promise<Project[]> => readProjects();

export async function fetchProject(slug: string): Promise<Project> {
  const project = await readProject(slug);
  if (!project) throw new Error("404");
  return project;
}

export const fetchStats = (): Promise<Stats> => readStats();
