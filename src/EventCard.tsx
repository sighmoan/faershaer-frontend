import { Link } from "@tanstack/react-router";
import { UseFSQueriesFor } from "./api/Queries";
import { useQuery } from "@tanstack/react-query";
import { Event } from "./Types";

const EventCard = (event: Event) => {
  const Queries = UseFSQueriesFor(event.id);

  console.log("rendering");

  const { isPending, error, data } = useQuery({
    queryKey: ["eventsCardData", { id: event.id }],
    queryFn: Queries.getPersons,
  });

  if (isPending) return "Loading . . .";
  if (error) return "Error!";

  return (
    <Link to={`${event.id}/transactions`}>
      <div className="card card-bordered max-w-md shadow-xl m-5">
        <figure className="bg-primary min-h-40 p-5">
          <h2 className="card-title text-white">{event.label}</h2>
        </figure>
        <div className="card-body ">
          <p>
            With{" "}
            {data.slice(0, 5).map((person, index) => {
              if (index == 4 && data.length > 4) return "and more!";
              if (index == data.length - 1) return `and ${person.name}!`;
              return `${person.name}, `;
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
