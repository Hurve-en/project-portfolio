import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProject } from "@/lib/api";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  let project;
  try {
    project = await fetchProject(slug);
  } catch (e) {
    if (e instanceof Error && e.message === "404") notFound();
    throw e;
  }

  return (
    <main className="px-16 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />
      <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>
      <p className="mt-2 text-neutral-500">{project.year}</p>
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={960}
          height={540}
          className="mt-6 h-80 w-auto rounded border object-contain"
        />
      )}
      <p className="mt-6 text-xl">{project.summary}</p>
    </main>
  );
}
