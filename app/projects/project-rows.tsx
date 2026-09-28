import { fetchProjects } from "@/lib/api";
import { problemFor } from "@/lib/problem";
import { Problem } from "./problem";
import { ProjectSearch } from "./project_search";

export async function ProjectRows() {
  let projects;
  try {
    projects = await fetchProjects();
  } catch (e) {
    return <Problem message={problemFor(e)} />;
  }

  if (projects.length === 0) {
    return <Problem message="No projects yet. Add the first one." />;
  }
  return <ProjectSearch projects={projects} />;
}
