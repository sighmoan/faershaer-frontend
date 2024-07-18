import { Link } from "@tanstack/react-router";
import { UseFSQueriesFor } from "./api/Queries";
import { useQuery } from "@tanstack/react-query";
import { Event } from "./Types";
import { Spinner } from "./components/Spinner";

const EventCard = (event: Event) => {
  const Queries = UseFSQueriesFor(event.id);

  const { isPending, error, data } = useQuery({
    queryKey: ["eventsCardData", { id: event.id }],
    queryFn: Queries.getPersons,
  });

  if (isPending) return <Spinner />;
  if (error) return "Error!";

  const totalPeopleCount = data.length;

  return (
    <Link to={`${event.id}/transactions`}>
      <div className="card card-bordered max-w-md shadow-xl m-5">
        <figure className="bg-primary min-h-40 p-5">
          <h2 className="card-title text-white">{event.label}</h2>
        </figure>
        <div className="card-body ">
          <p>
            👥{" "}
            {totalPeopleCount <= 1 && (
              <span className="italic text-lightgrey">just you</span>
            )}
            {data.slice(0, 5).map((person, index) => {
              if (index == 4 && totalPeopleCount > 5)
                return `and ${totalPeopleCount - 4} others`;
              if (index == totalPeopleCount - 1) return `and ${person.name}`;
              return `${person.name}, `;
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
