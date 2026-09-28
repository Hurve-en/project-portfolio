import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };
export function ProjectList({ projects }: Props) {
  return (
    <ul className="mt-8 grid grid-cols-3 gap-6">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`} className="block">
            {p.imageUrl ? (
              <Image
                src={p.imageUrl}
                alt={p.title}
                width={400}
                height={240}
                className="h-40 w-full rounded bg-neutral-100 object-contain"
              />
            ) : (
              <div className="h-40 w-full rounded bg-neutral-100" />
            )}
            <p className="mt-2 text-xl">{p.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
