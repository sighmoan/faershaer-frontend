import TxRow from "./TxRow.tsx";
import { Transaction } from "./Types.ts";

const TxList = () => {
  const tx: Transaction[] = [
    { payer: "John", expense: "Wine", sum: 500.0 },
    { payer: "Alice", expense: "Cherries", sum: 150.75 },
    { payer: "Bob", expense: "Blanket", sum: 120.0 },
    { payer: "Sarah", expense: "Boat rental", sum: 200.0 },
    { payer: "Sarah", expense: "Gas", sum: 75.0 },
  ];

  return (
    <table>
      <thead>
        <th>Payer</th>
        <th>Expense</th>
        <th>Sum</th>
      </thead>
      {tx.map((t) => (
        <TxRow {...t}></TxRow>
      ))}
    </table>
  );
};

export default TxList;
