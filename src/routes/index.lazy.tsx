import { createLazyFileRoute } from "@tanstack/react-router";
import EventsList from "../EventsList";

export const Route = createLazyFileRoute("/")({
  component: () => {
    return (
      <main className="mx-auto max-w-xl">
        <EventsList />
      </main>
    );
  },
});
