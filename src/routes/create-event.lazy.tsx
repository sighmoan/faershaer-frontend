import { createLazyFileRoute } from "@tanstack/react-router";
import AddEvent from "../AddEvent";

export const Route = createLazyFileRoute("/create-event")({
  component: () => (
    <main className="mx-auto max-w-xl">
      <AddEvent />
    </main>
  ),
});
