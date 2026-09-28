"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { verifyAdmin } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type ProjectFormState = {
  message: string;
  title: string;
  year: string;
  summary: string;
  imageUrl: string;
};

export async function createProject(
  _previousState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await verifyAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const image = formData.get("image");
  const state = { message: "", title, year, summary, imageUrl: "" };
  const parsedYear = Number(year);

  if (!title || !year || !summary) {
    return { ...state, message: "Title, year, and description are required." };
  }

  if (!Number.isInteger(parsedYear)) {
    return { ...state, message: "Year must be a whole number." };
  }

  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const slug = `${slugBase || "project"}-${Date.now().toString(36)}`;
  let imageUrl: string | null = null;

  if (image instanceof File && image.size > 0) {
    const extension = image.name.split(".").pop()?.toLowerCase() || "bin";
    const path = `${slug}.${extension}`;
    const supabase = await createClient();
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, image, { contentType: image.type, upsert: false });

    if (error) {
      return { ...state, message: error.message };
    }

    imageUrl = supabase.storage.from("project-images").getPublicUrl(path)
      .data.publicUrl;
  }

  await db.insert(projects).values({
    slug,
    title,
    year: parsedYear,
    summary,
    imageUrl,
  });

  return {
    message: "Project added.",
    title: "",
    year: "",
    summary: "",
    imageUrl: "",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
