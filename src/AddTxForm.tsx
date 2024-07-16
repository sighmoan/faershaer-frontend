import { QueriesActual as Queries } from "./Queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Person, Transaction } from "./Types";

const AddTxForm = () => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["personData"],
    queryFn: Queries.getPersons,
  });

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
      payerId: e.currentTarget.payerId.value,
      expense: e.currentTarget.expense.value,
      sum: e.currentTarget.sum.value,
    };
    const currentForm = e.currentTarget;
    addTx.mutateAsync(tx).then(() => currentForm.reset());
  };

  if (isPending) return "Loading persons . . .";
  if (error) return "Error loading persons!";

  return (
    <form onSubmit={handleSubmit}>
      <select name="payerId">
        <option key="blank" value="">
          -- Who paid?
        </option>
        {data!.map((p: Person) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input type="text" name="expense" />
      <input type="number" name="sum" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTxForm;
