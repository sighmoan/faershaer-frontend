import { Transaction, Person } from "./Types";

const apiHost = import.meta.env.VITE_API_HOST;
if (!apiHost) {
  throw new Error("API host may not be unset.");
}
const apiBase = import.meta.env.VITE_API_BASE ?? "";
const baseUrl = `${apiHost}${apiBase}`;

type Queries = {
  getTransactions: () => Promise<Transaction[]>;
  createTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPersons: () => Promise<Person[]>;
};

/****
 *
 * DEVELOPMENT
 *
 */

const personData: Person[] = [
  { id: "1", name: "John", balance: 500.0 },
  { id: "2", name: "Alice", balance: 150.75 },
  { id: "3", name: "Bob", balance: 120.0 },
  { id: "4", name: "Sarah", balance: 275.0 },
];

const txData: Transaction[] = [
  { txId: "1", payer: "John", expense: "Wine", sum: 500.0 },
  { txId: "2", payer: "Alice", expense: "Cherries", sum: 150.75 },
  { txId: "3", payer: "Bob", expense: "Blanket", sum: 120.0 },
  { txId: "4", payer: "Sarah", expense: "Boat rental", sum: 200.0 },
  { txId: "5", payer: "Sarah", expense: "Gas", sum: 75.0 },
];
let maxTxId = 5;

const refreshBalances = () => {
  personData.forEach((p) => {
    p.balance = txData
      .map((tx: Transaction) => (tx.payer === p.name ? tx.sum : 0))
      .reduce(
        (oldValue, currentValue) => Number(oldValue) + Number(currentValue)
      );
  });
};

const QueriesDev: Queries = {
  getTransactions: () => Promise.resolve(JSON.parse(JSON.stringify(txData))),
  createTransaction: (t: Transaction) => {
    t.txId = String(++maxTxId);
    txData.push(t);
    return Promise.resolve();
  },
  deleteTransaction: (id: string) => {
    return new Promise((resolve, reject) => {
      const index: number = txData.findIndex((t) => t.txId == id);
      if (index >= 0) {
        txData.splice(index, 1);
        resolve();
      }
      reject();
    });
  },
  getPersons: () => {
    refreshBalances();
    return Promise.resolve(JSON.parse(JSON.stringify(personData)));
  },
};

/*****
 *
 * PRODUCTION
 *
 *
 */

const TRANSACTIONS_ENDPOINT = "/transactions";
const PERSONS_ENDPOINT = "/persons";

const QueriesProduction: Queries = {
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
  getPersons: () => Promise.reject(),
};

let QueriesActual = QueriesDev;
if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
  QueriesActual = QueriesProduction;
}
export { QueriesActual };
