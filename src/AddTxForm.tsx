import { QueriesActual as Queries } from "./Queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "./Types";

const AddTxForm = () => {
  const queryClient = useQueryClient();

  const addTx = useMutation({
    mutationFn: Queries.createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["txData"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target) return;
    const tx: Transaction = {
      payer: e.currentTarget.payer.value,
      expense: e.currentTarget.expense.value,
      sum: e.currentTarget.sum.value,
    };
    const currentForm = e.currentTarget;
    addTx.mutateAsync(tx).then(() => currentForm.reset());
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
