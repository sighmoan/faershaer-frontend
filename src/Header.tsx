import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Queries } from "./api/Queries";

const Header = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["eventData"],
    queryFn: () => Queries.getEventDetails("1"),
  });
  return (
    <header>
      <div className="mx-auto max-w-xl">
        <h3 className="text-slate font-black italic">FÄRSHÄR</h3>
      </div>
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
          to="/"
        >
          Transactions
        </Link>
        <Link
          role="tab"
          className="tab"
          activeProps={{ className: "tab-active" }}
          to="/balances"
        >
          Balances
        </Link>
        <Link
          role="tab"
          className="tab"
          activeProps={{ className: "tab-active" }}
          to="/reimbursements"
        >
          Reimbursements
        </Link>
      </div>
    </header>
  );
};

export default Header;
