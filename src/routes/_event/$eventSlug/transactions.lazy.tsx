import { createLazyFileRoute } from "@tanstack/react-router";
import TxList from "../../../TxList";
import AddTxForm from "../../../AddTxForm";

export const Route = createLazyFileRoute("/_event/$eventSlug/transactions")({
  component: () => (
    <>
      <main className="mx-auto max-w-xl">
        <TxList></TxList>
        <AddTxForm />
      </main>
    </>
  ),
});
