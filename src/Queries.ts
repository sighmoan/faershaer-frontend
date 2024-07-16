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

const devApiDelay = import.meta.env.VITE_DEV_API_DELAY ?? 0;

const personData: Person[] = [
  { id: "1", name: "John", balance: 500.0 },
  { id: "2", name: "Alice", balance: 150.75 },
  { id: "3", name: "Bob", balance: 120.0 },
  { id: "4", name: "Sarah", balance: 275.0 },
];

const txData: Transaction[] = [
  { txId: "1", payerId: "1", payer: "John", expense: "Wine", sum: 500.0 },
  { txId: "2", payerId: "2", payer: "Alice", expense: "Cherries", sum: 150.75 },
  { txId: "3", payerId: "3", payer: "Bob", expense: "Blanket", sum: 120.0 },
  {
    txId: "4",
    payerId: "4",
    payer: "Sarah",
    expense: "Boat rental",
    sum: 200.0,
  },
  { txId: "5", payerId: "4", payer: "Sarah", expense: "Gas", sum: 75.0 },
];
let maxTxId = 5;

const refreshBalances = () => {
  personData.forEach((p) => {
    p.balance = txData
      .map((tx: Transaction) => (tx.payerId === p.id ? tx.sum : 0))
      .reduce(
        (oldValue, currentValue) => Number(oldValue) + Number(currentValue)
      );
  });
};

const QueriesDev: Queries = {
  getTransactions: () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(JSON.parse(JSON.stringify(txData))), devApiDelay)
    ),
  createTransaction: (t: Transaction) =>
    new Promise((resolve) => {
      t.txId = String(++maxTxId);
      if (!t.payer) {
        t.payer = personData.filter((p) => p.id == t.payerId)[0].name;
      }
      txData.push(t);
      setTimeout(resolve, devApiDelay);
    }),
  deleteTransaction: (id: string) => {
    return new Promise((resolve, reject) => {
      const index: number = txData.findIndex((t) => t.txId == id);
      if (index >= 0) {
        txData.splice(index, 1);
        setTimeout(resolve, devApiDelay);
      }
      setTimeout(reject, devApiDelay);
    });
  },
  getPersons: () =>
    new Promise((resolve) => {
      refreshBalances();
      setTimeout(
        () => resolve(JSON.parse(JSON.stringify(personData))),
        devApiDelay
      );
    }),
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
  getPersons: () => {
    const url = `${baseUrl}${PERSONS_ENDPOINT}`;
    return fetch(url).then((response) => response.json());
  },
};

let QueriesActual = QueriesDev;
if (import.meta.env.PROD || import.meta.env.VITE_PROD_API) {
  QueriesActual = QueriesProduction;
}
export { QueriesActual };
