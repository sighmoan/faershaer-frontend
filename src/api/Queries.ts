import { Transaction } from "../Types";
import QueriesDev from "./DevelopmentQueries";
import { QueriesSpec } from "./QueriesSpec";
import { useParams } from "@tanstack/react-router";
import { Event } from "../Types";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const apiBase = import.meta.env.VITE_API_BASE ?? "";

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";
const REIMBURSEMENT_ENDPOINT = "/reimbursements";

const QueriesProduction = (eventSlug: string): QueriesSpec => {
  const baseUrl = `${apiHost}${apiBase}/events/${eventSlug}`;
  return {
    createEvent: (e: Event) => {
      const url = `${apiHost}${apiBase}/events`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: e.label,
      };

      return fetch(url, options).then((response) => {
        console.log(response);
        const location = response.headers.get("Location");
        console.log("Location is", location);
        const eventId = location.split("/")[2];
        console.log("meaning ID is ", eventId);
        return eventId;
      });
    },
    getEventSlug: () => eventSlug,
    getEvents: () => {
      const url = `${apiHost}${apiBase}/events`;
      return fetch(url).then((response) => response.json());
    },
    getEventDetails: () => {
      const url = `${baseUrl}`;
      return fetch(url).then((response) => response.json());
    },
    getEventDetailsFor: (id: string) => {
      const url = `${apiHost}${apiBase}/events/${id}`;
      return fetch(url).then((response) => response.json());
    },
    getTransactions: () => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}`;
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return data.map((t: Transaction & { id: string }) => {
            return { ...t, txId: t.id };
          });
        });
    },
    createTransaction: (t) => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(t),
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    deleteTransaction: (txId: string) => {
      const url = `${baseUrl}${TRANSACTIONS_ENDPOINT}/${txId}`;
      const options = {
        method: "DELETE",
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    getPersons: () => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}`;
      return fetch(url).then((response) => response.json());
    },
    createPerson: (p) => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: p.name,
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    removePerson: (id: string) => {
      const url = `${baseUrl}${PERSONS_ENDPOINT}/${id}`;
      const options = {
        method: "DELETE",
      };
      return fetch(url, options).then(() => Promise.resolve());
    },
    getReimbursements: () => {
      const url = `${baseUrl}${REIMBURSEMENT_ENDPOINT}`;
      return fetch(url).then((response) => response.json());
    },
  };
};

export const UseFSQueries = () => {
  const { eventSlug } = useParams({ strict: false });
  const eventId = eventSlug ?? "-1";

  console.log("the event ID is ", eventId);

  let Queries = QueriesDev;
  if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
    Queries = QueriesProduction(eventId);
  }

  if (!eventId || eventId === "-1") {
    console.log(
      "No event ID available, only a subset of FS queries available."
    );
    return { createEvent: Queries.createEvent, getEvents: Queries.getEvents };
  }

  console.log("Queries are ", Queries);
  return Queries;
};

export const UseFSQueriesFor = (eventId: string) => {
  const eventSlug = eventId;
  let Queries = QueriesDev;
  if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
    Queries = QueriesProduction(eventSlug);
  }
  return Queries;
};
