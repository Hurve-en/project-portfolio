import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  const { db } = await import("./index");
  const { projects } = await import("./schema");
  await db
    .insert(projects)
    .values([
      {
        slug: "veloso-tindahan",
        title: "Tindahan ni Veloso",
        year: 2026,
        summary: "Expo Project",
      },
    ])
    .onConflictDoNothing();
  console.log("Seeded projects");
  process.exit(0);
}

seed();
