import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { UseFSQueries } from "./api/Queries";

const Header = () => {
  const Queries = UseFSQueries();
  const { isPending, error, data } = useQuery({
    queryKey: ["eventData"],
    queryFn: Queries.getEventDetails,
  });
  return (
    <header>
      <div className="bg-primary hero min-h-60">
        <h1 className="text-white text-4xl">
          {isPending ? "Loading . . ." : data!.label}
        </h1>
      </div>
      <div className="mx-auto max-w-xl tabs tabs-bordered mb-10">
        <Link
          role="tab"
          className="tab"
          activeProps={{ className: "tab-active" }}
          to="/$eventSlug/transactions"
          params={{ eventSlug: Queries.getEventSlug() }}
        >
          Transactions
        </Link>
        <Link
          role="tab"
          className="tab"
          activeProps={{ className: "tab-active" }}
          to="/$eventSlug/balances"
          params={{ eventSlug: Queries.getEventSlug() }}
        >
          Balances
        </Link>
        <Link
          role="tab"
          className="tab"
          activeProps={{ className: "tab-active" }}
          to="/$eventSlug/reimbursements"
          params={{ eventSlug: Queries.getEventSlug() }}
        >
          Reimbursements
        </Link>
      </div>
    </header>
  );
};

export default Header;
