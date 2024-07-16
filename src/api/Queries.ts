import { Transaction } from "../Types";
import QueriesDev from "./DevelopmentQueries";
import { QueriesSpec } from "./QueriesSpec";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const apiBase = import.meta.env.VITE_API_BASE ?? "";
const baseUrl = `${apiHost}${apiBase}`;

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";

const QueriesProduction: QueriesSpec = {
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
};

let Queries = QueriesDev;
if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
  Queries = QueriesProduction;
}
export { Queries };
