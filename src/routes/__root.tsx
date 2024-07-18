import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LogoStrip from "../LogoStrip";
import { Footer } from "../Footer";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <LogoStrip />
      <Outlet />
      <Footer />
    </div>
  ),
});
