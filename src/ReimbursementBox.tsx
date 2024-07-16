import { Reimbursement } from "./Types";

const ReimbursementBox = (rb: Reimbursement) => {
  return (
    <div>
      <p>
        {rb.debtor.name} should pay {rb.creditor.name} {rb.amount}kr.
      </p>
    </div>
  );
};

export default ReimbursementBox;
