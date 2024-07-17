import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "./Types";
import { Queries } from "./api/Queries";

const PersonBalance = (p: Person) => {
  const queryClient = useQueryClient();

  const removePerson = useMutation({
    mutationFn: () => Queries.removePerson(p.id!),
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "personData",
      }),
  });

  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <button onClick={() => removePerson.mutate()}>x</button>
        <h3 className="card-title">{p.name}</h3>
        <h4>{p.balance}</h4>
      </div>
    </div>
  );
};

export default PersonBalance;
