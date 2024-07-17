import { createLazyFileRoute } from "@tanstack/react-router";
import PersonBalancesList from "../PersonBalancesList";
import AddPersonForm from "../AddPersonForm";

export const Route = createLazyFileRoute("/balances")({
  component: () => (
    <>
      <main className="mx-auto max-w-xl">
        <PersonBalancesList />
        <AddPersonForm />
      </main>
    </>
  ),
});
