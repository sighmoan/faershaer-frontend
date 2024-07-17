import { useQuery } from "@tanstack/react-query";
import { UseFSQueries } from "./api/Queries";
import { Event } from "./Types";
import EventCard from "./EventCard";

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
      <h4 className="font-bold text-lg text-center mt-20">Your Events</h4>
      <div className="flex">
        {data?.map((event: Event) => <EventCard key={event.id} {...event} />)}
      </div>
    </>
  );
};

export default EventsList;
