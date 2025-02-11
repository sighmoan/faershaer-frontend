import { Transaction } from "../Types";
import QueriesDev from "./DevelopmentQueries";
import {
  FullQueriesSpec,
  LimitedQueriesSpec,
  QueriesSpec,
} from "./QueriesSpec";
import { useParams } from "@tanstack/react-router";
import { Event } from "../Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const apiBase = import.meta.env.VITE_API_BASE ?? "";

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";
const REIMBURSEMENT_ENDPOINT = "/reimbursements";

const QueriesProduction = (eventSlug: string): QueriesSpec => {
  const User = useUser();
  const baseUrl = `${apiHost}${apiBase}/events/${eventSlug}`;
  console.log("Generating queries. Is the user signed in? ", User.isSignedIn);
  const userId = User.user ? User.user.id : "";
  const defaultHeaders: Headers = new Headers();
  defaultHeaders.append("Authorization", userId);

  console.log("Hence, the auth header is ", defaultHeaders);
  return {
    createEvent: (e: Event) => {
      const url = `${apiHost}${apiBase}/events`;
      const headers = new Headers(defaultHeaders);
      const options = {
        method: "POST",
        headers: headers,
        body: e.label,
      };

      return fetch(url, options).then((response) => {
        console.log("and the response is");
        console.log(response);
        const location = response.headers.get("Location");
        if (!location)
          throw new Error("Server error: no location for event returned.");
        console.log("Location is", location);
        const eventId = location.split("/")[2];
        console.log("meaning ID is ", eventId);
        return eventId;
      });
    },
    getEventSlug: () => eventSlug,
    getEvents: () => {
      const url = `${apiHost}${apiBase}/events`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
    getEventDetails: () => {
      const url = `${baseUrl}`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
    getEventDetailsFor: (id: string) => {
      const url = `${apiHost}${apiBase}/events/${id}`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
    getTransactions: () => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}`;
      const options = { headers: defaultHeaders };

      return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          return data.map((t: Transaction & { id: string }) => {
            return { ...t, txId: t.id };
          });
        });
    },
    createTransaction: (t) => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}`;
      const headers = new Headers(defaultHeaders);
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(t),
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    deleteTransaction: (txId: string) => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}/${txId}`;
      const headers = new Headers(defaultHeaders);
      headers.append("Content-Type", "application/json");
      const options = {
        headers: headers,
        method: "DELETE",
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    getPersons: () => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
    createPerson: (p) => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}`;
      const headers = new Headers(defaultHeaders);
      headers.append("Content-Type", "application/json");
      const options = {
        method: "POST",
        headers: headers,
        body: p.name,
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    removePerson: (id: string) => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}/${id}`;
      const options = {
        headers: defaultHeaders,
        method: "DELETE",
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    getReimbursements: () => {
      const url = `${baseUrl}${REIMBURSEMENT_ENDPOINT}`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
    getUserData: () => {
      const url = `${baseUrl}/user`;
      const options = { headers: defaultHeaders };

      return fetch(url, options).then((response) => response.json());
    },
  };
};

export const UseFSQueries = (): LimitedQueriesSpec | FullQueriesSpec => {
  const { eventSlug } = useParams({ strict: false });
  const eventId = eventSlug ?? "-1";

  console.log("the event ID is ", eventId);

  let Queries: QueriesSpec = QueriesDev;
  if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
    Queries = QueriesProduction(eventId);
  }

  if (!eventId || eventId === "-1") {
    console.log(
      "No event ID available, only a subset of FS queries available."
    );
    return {
      createEvent: Queries.createEvent,
      getEvents: Queries.getEvents,
      getUserData: Queries.getUserData,
      getEventDetailsFor: Queries.getEventDetailsFor,
    };
  }

  console.log("Queries are ", Queries);
  return Queries;
};

export const UseFSQueriesFor = (eventId: string) => {
  const eventSlug = eventId;
  let Queries: QueriesSpec = QueriesDev;
  if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
    Queries = QueriesProduction(eventSlug);
  }
  return Queries;
};

export const useFSUser = () => {
  const user = useUser();

  const createUser = useMutation({
    mutationFn: () => {
      const url = `${apiHost}${apiBase}/user`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.user!.id,
          name: user.user!.firstName,
          portraitUrl: user.user!.imageUrl,
        }),
      };
      console.log(options);
      return fetch(url, options).then((response) => {
        if (response.ok) return response.json();
        throw new Error("sign up failed");
      });
    },
  });

  const userQuery = useQuery({
    queryKey: ["userData"],
    queryFn: () => {
      const url = `${apiHost}${apiBase}/user`;
      const options = { headers: { Authorization: userId } };

      console.log("fetching ", url, " with opts ", options);

      return fetch(url, options).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return createUser.mutateAsync();
      });
    },
  });

  if (!user.isLoaded) {
    console.log("user is not loaded");
    return { isPending: true };
  }
  if (user.isLoaded && !user.isSignedIn) {
    console.log("user is loaded, not signed in");
    return { isPending: false, error: null, data: undefined };
  }

  const userId = user.user.id;

  return userQuery;
};
