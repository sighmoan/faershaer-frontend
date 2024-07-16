import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/reimbursements")({
  component: () => (
    <main className="mx-auto max-w-xl">
      <p>Not implemented yet.</p>
    </main>
  ),
});
