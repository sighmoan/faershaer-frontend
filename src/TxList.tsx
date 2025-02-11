import { useQuery } from "@tanstack/react-query";
import TxRow from "./TxRow.tsx";
import { Transaction } from "./Types.ts";
import { UseFSQueries } from "./api/Queries.ts";
import { Spinner } from "./components/Spinner.tsx";
import { FullQueriesSpec } from "./api/QueriesSpec.ts";

const TxList = () => {
  const Queries = UseFSQueries() as FullQueriesSpec;

  const { isPending, error, data } = useQuery({
    queryKey: ["txData"],
    queryFn: Queries.getTransactions,
  });

  if (error) return "Error!";

  const tx: Transaction[] = data!;

  return (
    <section className="flex-1">
      <table className="table text-xl">
        <thead>
          <tr>
            <th>Payer</th>
            <th>Expense</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {isPending && <Spinner />}
          {!isPending && tx.length == 0 && (
            <td colSpan={3}>
              <p className="text-center italic">
                There are no recorded transactions!
                <br />
                To start splitting expenses, add some things that people have
                paid for.
              </p>
            </td>
          )}
          {!isPending && tx.map((t) => <TxRow key={t.txId} {...t}></TxRow>)}
        </tbody>
      </table>
    </section>
  );
};

export default TxList;
