import { createLazyFileRoute } from "@tanstack/react-router";
import TxList from "../../../TxList";
import AddTxForm from "../../../AddTxForm";

export const Route = createLazyFileRoute("/_event/$eventSlug/transactions")({
  component: () => (
    <>
      <main className="mx-auto px-40 flex">
        <TxList></TxList>
        <AddTxForm />
      </main>
    </>
  ),
});
