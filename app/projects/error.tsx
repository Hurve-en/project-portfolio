"use client";

import { problemFor } from "@/lib/problem";

type Props = { error: Error; retry: () => void };

export default function Error({ error, retry }: Props) {
  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <p className="mt-6 text-xl">{problemFor(error)}</p>
      <button
        onClick={retry}
        className="mt-6 border border-neutral-900 px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}
