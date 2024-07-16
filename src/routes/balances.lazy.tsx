import { createLazyFileRoute } from "@tanstack/react-router";
import PersonBalancesList from "../PersonBalancesList";

export const Route = createLazyFileRoute("/balances")({
  component: () => (
    <>
      <main>
        <PersonBalancesList />
      </main>
    </>
  ),
});
