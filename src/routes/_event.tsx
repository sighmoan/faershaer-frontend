import { createFileRoute } from "@tanstack/react-router";
import Header from "../Header";
import { Outlet } from "@tanstack/react-router";
import { Footer } from "../Footer";

export const Route = createFileRoute("/_event")({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
});
