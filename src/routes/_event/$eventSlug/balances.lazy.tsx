import { createLazyFileRoute } from "@tanstack/react-router";
import PersonBalancesList from "../../../PersonBalancesList";
import AddPersonForm from "../../../AddPersonForm";

export const Route = createLazyFileRoute("/_event/$eventSlug/balances")({
  component: () => (
    <>
      <main className="mx-auto px-40 flex">
        <PersonBalancesList />
        <AddPersonForm />
      </main>
    </>
  ),
});
