import { useQuery } from "@tanstack/react-query";
import TxRow from "./TxRow.tsx";
import { Transaction } from "./Types.ts";
import { QueriesActual as Queries } from "./Queries.ts";

const TxList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["txData"],
    queryFn: Queries.getTransactions,
  });

  if (isPending) return "Loading . . .";
  if (error) return "Error!";

  const tx: Transaction[] = data!;

  return (
    <table>
      <thead>
        <tr>
          <th>Payer</th>
          <th>Expense</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {tx.map((t) => (
          <TxRow key={t.txId} {...t}></TxRow>
        ))}
      </tbody>
    </table>
  );
};

export default TxList;
