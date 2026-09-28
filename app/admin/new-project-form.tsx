"use client";

import { useActionState } from "react";
import { createProject } from "./action";

export function NewProjectForm() {
  const [state, action, pending] = useActionState(createProject, {
    message: "",
    title: "",
    year: "",
    summary: "",
    imageUrl: "",
  });

  return (
    <form action={action} className="mt-6 flex w-md flex-col gap-4">
      <input
        name="title"
        defaultValue={state.title}
        placeholder="Title"
        
        className="border px-4 py-2"
      />
      <input
        name="year"
        type="number"
        defaultValue={state.year}
        placeholder="Year"
        
        className="border px-4 py-2"
      />
      <textarea
        name="summary"
        defaultValue={state.summary}
        placeholder="Description"
        
        rows={3}
        className="border px-4 py-2"
      />
      <input
        name="image"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        
        className="border px-4 py-2"
      />
      {state.message && <p className="text-red-700">{state.message}</p>}
      <button
        disabled={pending}
        className="bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Posting" : "Post project"}
      </button>
    </form>
  );
}
