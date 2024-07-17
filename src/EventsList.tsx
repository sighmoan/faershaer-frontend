import { useQuery } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import { Event } from "./Types";
import { Link } from "@tanstack/react-router";

const EventsList = () => {
  const Queries = UseFSQueries();
  const { isPending, error, data } = useQuery({
    queryKey: ["eventsData"],
    queryFn: Queries.getEvents,
  });

  if (isPending) return "Loading . . .";
  if (error) return "Error loading events list!";

  return (
    <>
      <h1>All Events</h1>
      {data?.map((event: Event) => (
        <Link to={`event-${event.id}/transactions`}>
          <div>
            <h2>{event.label}</h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default EventsList;
