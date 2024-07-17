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

  const rbs: Reimbursement[] = data;

  return (
    <section>
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
