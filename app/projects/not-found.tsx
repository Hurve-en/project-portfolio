import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">No such project</h1>
      <p className="mt-6 text-xl">That project was removed.</p>
      <Link href="/projects" className="mt-6 inline-block underline">
        Back to projects
      </Link>
    </main>
  );
}
