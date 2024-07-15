import { QueriesActual as Queries } from "./Queries";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "./Types";

const AddTxForm = () => {
  const addTx = useMutation({
    mutationFn: Queries.createTransaction,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tx: Transaction = {
      payer: e.currentTarget.payer.value,
      expense: e.currentTarget.expense.value,
      sum: e.currentTarget.sum.value,
    };
    console.log(tx);
    addTx.mutate(tx);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="payer" />
      <input type="text" name="expense" />
      <input type="number" name="sum" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTxForm;
