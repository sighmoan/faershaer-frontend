import { Reimbursement } from "./Types";
import { Heading } from "./components/Heading";

const ReimbursementBox = (rb: Reimbursement) => {
  return (
    <div className="card card-bordered flex flex-row my-10 max-h-34 justify-between">
      <div className="avatar aspect-square rounded basis-1/4">
        <img src="https://ca.slack-edge.com/TA01UCHBN-U068H00G83Z-a66138e76622-512" />
      </div>
      <div className="py-6 basis-2/4">
        <p className="text-center">
          {rb.debtor} should pay {rb.creditor}
        </p>
        <h4 className="italic text-center mt-4 font-black text-2xl">
          {Math.round(rb.amount)}kr.
        </h4>
      </div>
      <div className="avatar aspect-square rounded basis-1/4">
        <img src="https://ca.slack-edge.com/TA01UCHBN-U06SCMV1RUP-6c1a7224a5c7-512" />
      </div>
    </div>
  );
};

export default ReimbursementBox;
