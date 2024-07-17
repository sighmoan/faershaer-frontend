import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Queries } from "./api/Queries";
import { Person } from "./Types";

const AddPersonForm = () => {
  const client = useQueryClient();

  const addPerson = useMutation({
    mutationFn: Queries.createPerson,
    onSuccess: () =>
      client.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "personData",
      }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target) return;
    const pn: Person = {
      name: e.currentTarget.personName.value,
      balance: 0,
    };
    const currentForm = e.currentTarget;
    addPerson.mutateAsync(pn).then(() => currentForm.reset());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="personName" placeholder="name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPersonForm;
