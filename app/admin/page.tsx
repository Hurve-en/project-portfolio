import { verifyAdmin } from "@/lib/dal";
import { signOut } from "./action";
import { NewProjectForm } from "./new-project-form";

export default async function AdminPage() {
  const admin = await verifyAdmin();

  return (
    <main className="px-16 py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-4xl font-bold">New project post</h1>
        <form action={signOut}>
          <span className="mr-4 text-neutral-500">{admin.email}</span>
          <button className="underline">Sign out</button>
        </form>
      </div>
      <NewProjectForm />
    </main>
  );
}
