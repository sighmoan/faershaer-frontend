import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "./Types";
import { QueriesActual as Queries } from "./Queries";

const TxRow = (t: Transaction) => {
  const client = useQueryClient();
  const deleteTx = useMutation({
    mutationFn: () => Queries.deleteTransaction(t.txId!),
    onSettled: () => client.invalidateQueries({ queryKey: ["txData"] }),
  });
  return (
    <tr>
      <td>{t.payer}</td>
      <td>{t.expense}</td>
      <td>{t.sum}kr</td>
      <td>
        <button className="btn" onClick={() => deleteTx.mutate()}>
          X
        </button>
      </td>
    </tr>
  );
};

export default TxRow;
