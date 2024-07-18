import ReimbursementBox from "./ReimbursementBox";
import { Reimbursement } from "./Types";
import { useQuery } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";

const ReimbursementBoxList = () => {
  const Queries = UseFSQueries();

  const { isPending, error, data } = useQuery({
    queryKey: ["reimbursementData"],
    queryFn: Queries.getReimbursements,
  });

  if (isPending) return "Loading reimbursements . . . ";
  if (error) return "Error loading reimbursements!";

  const rbs: Reimbursement[] = [];
  if (data.length > 0) rbs.push(...data);

  return (
    <section>
      {rbs.length == 0 && (
        <p className="text-center italic">
          When you have added a few people, and a couple of transactions, this
          is where you'll find out how to split it.
        </p>
      )}
      {rbs.map((rb) => (
        <ReimbursementBox
          key={String(rb.creditor) + ">" + String(rb.debtor)}
          {...rb}
        />
      ))}
    </section>
  );
};

export default ReimbursementBoxList;
