import ReimbursementBox from "./ReimbursementBox";
import { Reimbursement } from "./Types";

const ReimbursementBoxList = () => {
  const rbs: Reimbursement[] = [
    {
      debtor: { id: "1", name: "John", balance: 300 },
      creditor: { id: "2", name: "Joyce", balance: 300 },
      amount: 400,
    },
    {
      debtor: { id: "3", name: "Alice", balance: 300 },
      creditor: { id: "4", name: "Bob", balance: 300 },
      amount: 590,
    },
    {
      debtor: { id: "5", name: "Johnson", balance: 300 },
      creditor: { id: "6", name: "Mark Watson", balance: 300 },
      amount: 2300,
    },
  ];

  return (
    <section>
      {rbs.map((rb) => (
        <ReimbursementBox
          key={String(rb.creditor.id) + ">" + String(rb.debtor.id)}
          {...rb}
        />
      ))}
    </section>
  );
};

export default ReimbursementBoxList;
