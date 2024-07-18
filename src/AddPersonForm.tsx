import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import { Person } from "./Types";
import { useState } from "react";
import SubmitButton from "./components/SubmitButton";
import { Heading } from "./components/Heading";

const AddPersonForm = () => {
  const Queries = UseFSQueries();

  const client = useQueryClient();
  const [isValid, setValid] = useState(false);

  const addPerson = useMutation({
    mutationFn: Queries.createPerson,
    onSuccess: () =>
      client.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "personData",
      }),
  });

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    setValid(e.currentTarget.personName.value);
  };

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
    <>
      <Heading>Add someone who wants to contribute</Heading>
      <form
        onChange={validate}
        onSubmit={handleSubmit}
        className="form-control max-w-lg mx-auto flex-auto gap-2 my-10"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="personName"
          placeholder="name"
          className="input input-bordered"
        />
        <SubmitButton isPending={addPerson.isPending} isValid={isValid} />
      </form>
    </>
  );
};

export default AddPersonForm;
