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
      navigate({ to: `/${variables}/balances` });
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
    console.log("e is ", e);
    addEvent.mutate(ev);
  };

  return (
    <>
      <Heading>Create a new event</Heading>
      <form
        onChange={validate}
        onSubmit={handleSubmit}
        className="form-control"
      >
        <label htmlFor="label">Event</label>
        <input
          type="text"
          name="label"
          className="input input-bordered mb-10"
          placeholder="What's the occasion?"
        />
        <SubmitButton isValid={isValid} isPending={addEvent.isPending} />
      </form>
    </>
  );
};

export default AddEvent;
