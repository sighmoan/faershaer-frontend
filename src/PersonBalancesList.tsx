import { useQuery } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import PersonBalance from "./PersonBalance";
import { Person } from "./Types";
import { Spinner } from "./components/Spinner";
import { FullQueriesSpec } from "./api/QueriesSpec";

const PersonBalancesList = () => {
  const Queries = UseFSQueries() as FullQueriesSpec;

  const { isPending, error, data } = useQuery({
    queryKey: ["personData", "txData"],
    queryFn: Queries.getPersons,
  });

  if (isPending)
    return (
      <section className="flex justify-center content-center">
        <Spinner />;
      </section>
    );
  if (error) return "Error!";

  const persons: Person[] = data;

  return (
    <section className="flex flex-wrap gap-3 place-content-center">
      {persons.length == 0 && (
        <p className="text-center italic">
          Who is going to split the bill?
          <br />
          Let's add all the people who are coming.
        </p>
      )}
      {persons.map((p) => (
        <PersonBalance key={p.id} {...p} />
      ))}
    </section>
  );
};

export default PersonBalancesList;
