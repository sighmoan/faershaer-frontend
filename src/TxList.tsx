import TxRow from "./TxRow.tsx";

const TxList = () => {
  return (
    <table>
      <thead>
        <th>Payer</th>
        <th>Expense</th>
        <th>Sum</th>
      </thead>
      <TxRow></TxRow>
      <TxRow></TxRow>
      <TxRow></TxRow>
      <TxRow></TxRow>
    </table>
  );
};

export default TxList;
