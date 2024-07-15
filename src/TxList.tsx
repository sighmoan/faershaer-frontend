import TxRow from "./TxRow.tsx";
import { Transaction } from "./Types.ts";

const TxList = () => {
  const tx: Transaction[] = [
    { txId: "1", payer: "John", expense: "Wine", sum: 500.0 },
    { txId: "2", payer: "Alice", expense: "Cherries", sum: 150.75 },
    { txId: "3", payer: "Bob", expense: "Blanket", sum: 120.0 },
    { txId: "4", payer: "Sarah", expense: "Boat rental", sum: 200.0 },
    { txId: "5", payer: "Sarah", expense: "Gas", sum: 75.0 },
  ];

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
