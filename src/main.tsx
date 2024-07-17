import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { EventContext } from "./EventContext.ts";
import "./App.css";

import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <EventContext.Provider value="1">
        <RouterProvider router={router} />
      </EventContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
