import ReimbursementBox from "./ReimbursementBox";
import { Reimbursement } from "./Types";
import { useQuery } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import { Heading } from "./components/Heading";
import { Spinner } from "./components/Spinner";

const ReimbursementBoxList = () => {
  const Queries = UseFSQueries();

  const { isPending, error, data } = useQuery({
    queryKey: ["reimbursementData"],
    queryFn: Queries.getReimbursements,
  });

  if (isPending)
    return (
      <section className="flex justify-center content-center">
        <Spinner />;
      </section>
    );
  if (error) return "Error loading reimbursements!";

  const rbs: Reimbursement[] = [];
  if (data.length > 0) rbs.push(...data);

  return rbs.length == 0 ? (
    <section>
      <p className="text-center italic">
        When you have added a few people, and a couple of transactions, this is
        where you'll find out how to split it.
      </p>
    </section>
  ) : (
    <section>
      <Heading>Here's how to split the bill evenly:</Heading>
      {rbs.map((rb) => (
        <ReimbursementBox
          key={String(rb.creditor) + ">" + String(rb.debtor)}
          {...rb}
        />
      ))}
      <p className="text-center">
        After that's all done, everyone has paid the same!
      </p>
    </section>
  );
};

export default ReimbursementBoxList;
