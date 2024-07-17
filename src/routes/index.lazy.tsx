import { createLazyFileRoute } from "@tanstack/react-router";
import EventsList from "../EventsList";

export const Route = createLazyFileRoute("/")({
  component: () => {
    return <EventsList />;
  },
});
