import { createLazyFileRoute } from "@tanstack/react-router";
import EventsList from "../EventsList";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import IndexPage from "../IndexPage";
import { Footer } from "../Footer";

export const Route = createLazyFileRoute("/")({
  component: () => {
    return (
      <>
        <SignedOut>
          <IndexPage />
        </SignedOut>
        <SignedIn>
          <main className="mx-auto">
            <EventsList />
          </main>
          <Footer />
        </SignedIn>
      </>
    );
  },
});
