import { Reimbursement } from "./Types";

const ReimbursementBox = (rb: Reimbursement) => {
  return (
    <div>
      <p>
        {rb.debtor} should pay {rb.creditor} {rb.amount}kr.
      </p>
    </div>
  );
};

export default ReimbursementBox;
