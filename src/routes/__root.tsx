import { createRootRoute, Outlet } from "@tanstack/react-router";
import LogoStrip from "../LogoStrip";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <LogoStrip />
      <Outlet />
    </div>
  ),
});
