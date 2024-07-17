import { createLazyFileRoute } from "@tanstack/react-router";
import ReimbursementBoxList from "../../../ReimbursementBoxList";

export const Route = createLazyFileRoute("/_event/$eventSlug/reimbursements")({
  component: () => (
    <main className="mx-auto max-w-xl">
      <ReimbursementBoxList />
    </main>
  ),
});
