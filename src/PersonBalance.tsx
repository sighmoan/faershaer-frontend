import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Person } from "./Types";
import { UseFSQueries } from "./api/Queries";
import { PlaceholderAvatar } from "./components/PlaceholderAvatar";
import { FullQueriesSpec } from "./api/QueriesSpec";

const PersonBalance = (p: Person) => {
  const Queries = UseFSQueries() as FullQueriesSpec;
  const queryClient = useQueryClient();

  const removePerson = useMutation({
    mutationFn: () => Queries.removePerson(p.id!),
    onSuccess: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "personData",
      }),
  });

  return (
    <div className="card shadow-xl card-bordered max-w-xs">
      {p.portraitUrl ? (
        <figure>
          <img src={p.portraitUrl} />
        </figure>
      ) : (
        <figure className="avatar bg-neutral placeholder">
          <p className="text-3xl text-neutral-content py-20">
            <PlaceholderAvatar personName={p.name} />
          </p>
        </figure>
      )}
      <div className="card-body">
        <h3 className="card-title">{p.name}</h3>
        {p.balance == 0 ? (
          <>
            <p>has not paid for anything yet.</p>
          </>
        ) : (
          <>
            <p>has contributed</p>
            <h4 className="italic text-center mt-10 font-black text-2xl">
              {p.balance}kr
            </h4>
          </>
        )}
        <button onClick={() => removePerson.mutate()}>
          <small>remove</small>
        </button>
      </div>
    </div>
  );
};

export default PersonBalance;
