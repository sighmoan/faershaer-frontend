import { useState } from "react";
import SubmitButton from "./components/SubmitButton";
import { Event } from "./Types";
import { useMutation } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import { Heading } from "./components/Heading";
import { useNavigate } from "@tanstack/react-router";

const AddEvent = () => {
  const [isValid, setIsValid] = useState(false);
  const Queries = UseFSQueries();
  const navigate = useNavigate();

  const addEvent = useMutation({
    mutationFn: Queries.createEvent,
    onSuccess: (variables) => {
      console.log("variables is", variables);
      navigate({ to: "/" + variables });
    },
  });

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    setIsValid(e.currentTarget.label.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.target) return;
    const ev: Event = {
      label: e.currentTarget.label.value,
    };
    const currentForm = e.currentTarget;
    console.log("e is ", e);
    addEvent.mutate(ev);
    //addEvent.mutateAsync(ev).then(() => currentForm.reset());
  };

  return (
    <>
      <Heading>Create a new event</Heading>
      <form onChange={validate} onSubmit={handleSubmit} className="formControl">
        <input type="text" name="label" className="input input-bordered" />
        <SubmitButton isValid={isValid} isPending={addEvent.isPending} />
      </form>
    </>
  );
};

export default AddEvent;
