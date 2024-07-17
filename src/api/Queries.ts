import { useContext } from "react";
import { Transaction } from "../Types";
import QueriesDev from "./DevelopmentQueries";
import { QueriesSpec } from "./QueriesSpec";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const currentEvent = "1";
const apiBase = import.meta.env.VITE_API_BASE ?? "";
const baseUrl = `${apiHost}${apiBase}/events/${currentEvent}`;

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";
const REIMBURSEMENT_ENDPOINT = "/reimbursements";

const QueriesProduction: QueriesSpec = {
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

let Queries = QueriesDev;
if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
  Queries = QueriesProduction;
}
export { Queries };
