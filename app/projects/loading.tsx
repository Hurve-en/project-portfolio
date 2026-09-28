import { RowsSkeleton, StatsSkeleton } from "./skeletons";

export default function Loading() {
  return (
    <main className="px-16 py-8">
      <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
      <div className="mt-4 h-10 w-52 animate-pulse rounded bg-neutral-200" />
      <StatsSkeleton />
      <RowsSkeleton />
    </main>
  );
}
