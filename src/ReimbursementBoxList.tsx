import ReimbursementBox from "./ReimbursementBox";
import { Reimbursement } from "./Types";
import { useQuery } from "@tanstack/react-query";
import { Queries } from "./api/Queries";

const ReimbursementBoxList = () => {
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
          key={String(rb.creditor.id) + ">" + String(rb.debtor.id)}
          {...rb}
        />
      ))}
    </section>
  );
};

export default ReimbursementBoxList;
