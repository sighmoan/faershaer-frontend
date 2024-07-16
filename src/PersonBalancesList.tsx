import { useQuery } from "@tanstack/react-query";
import { QueriesActual as Queries } from "./Queries";
import PersonBalance from "./PersonBalance";
import { Person } from "./Types";

const PersonBalancesList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["txData", "personData"],
    queryFn: Queries.getPersons,
  });

  if (isPending) return "Loading . . .";
  if (error) return "Error!";

  const persons: Person[] = data;

  return (
    <section className="flex gap-3 place-content-center">
      {persons.map((p) => (
        <PersonBalance key={p.id} {...p} />
      ))}
    </section>
  );
};

export default PersonBalancesList;
