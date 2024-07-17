import { Transaction } from "../Types";
import QueriesDev from "./DevelopmentQueries";
import { QueriesSpec } from "./QueriesSpec";
import { useParams } from "@tanstack/react-router";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const apiBase = import.meta.env.VITE_API_BASE ?? "";

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";
const REIMBURSEMENT_ENDPOINT = "/reimbursements";

const QueriesProduction = (eventSlug: string, eventId: string): QueriesSpec => {
  const baseUrl = `${apiHost}${apiBase}/events/${eventId}`;
  return {
    getEventSlugAndId: () => eventSlug + "-" + eventId,
    getEvents: () => {
      return Promise.reject();
    },
    getEventDetails: () => {
      const url = `${baseUrl}`;
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
  const eventId = eventSlug ? eventSlug.split("-")[1] : "0";
  let Queries = QueriesDev;
  if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
    Queries = QueriesProduction(eventId);
  }
  return Queries;
};
