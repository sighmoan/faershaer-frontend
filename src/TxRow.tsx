import { Transaction } from "./Types";

const TxRow = (t: Transaction) => {
  return (
    <tr>
      <td>{t.payer}</td>
      <td>{t.expense}</td>
      <td>{t.sum}kr</td>
    </tr>
  );
};

export default TxRow;
