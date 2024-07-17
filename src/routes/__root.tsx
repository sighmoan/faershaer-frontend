import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LogoStrip from "../LogoStrip";

export const Route = createRootRoute({
  component: () => (
    <>
      <LogoStrip />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
