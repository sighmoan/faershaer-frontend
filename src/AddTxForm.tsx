import { Queries } from "./api/Queries";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Person, Transaction } from "./Types";
import { useState } from "react";

const AddTxForm = () => {
  const [valid, setValid] = useState(false);

  const queryClient = useQueryClient();

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    const isValid =
      e.currentTarget.payerId.value &&
      e.currentTarget.expense.value &&
      e.currentTarget.sum.value > 0;
    setValid(isValid);
  };

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
    <form
      onSubmit={handleSubmit}
      onChange={validate}
      className="form-control flex-auto gap-2 my-10"
    >
      <label htmlFor="payerId">Payer</label>
      <select name="payerId" className="select select-bordered">
        <option key="blank" value="">
          Who paid for it?
        </option>
        {data!.map((p: Person) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <label htmlFor="expense">Label</label>
      <input
        type="text"
        name="expense"
        className="input input-bordered"
        placeholder="What was it?"
      />
      <label htmlFor="sum">Sum</label>
      <input
        type="number"
        name="sum"
        className="input input-bordered"
        placeholder="How much was it?"
      />
      <button
        className={`btn ${!addTx.isPending && "btn-primary"} ${!valid && "btn-disabled"}`}
        type="submit"
      >
        {addTx.isPending ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default AddTxForm;
