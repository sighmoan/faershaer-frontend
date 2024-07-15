import { Transaction } from "./Types";

type Queries = {
  getTransactions: () => Promise<Transaction[]>;
};

const QueriesDev: Queries = {
  getTransactions: () => {
    const tx = [
      { txId: "1", payer: "John", expense: "Wine", sum: 500.0 },
      { txId: "2", payer: "Alice", expense: "Cherries", sum: 150.75 },
      { txId: "3", payer: "Bob", expense: "Blanket", sum: 120.0 },
      { txId: "4", payer: "Sarah", expense: "Boat rental", sum: 200.0 },
      { txId: "5", payer: "Sarah", expense: "Gas", sum: 75.0 },
    ];

    return Promise.resolve(tx);
  },
};

const QueriesProduction: Queries = {
  getTransactions: () => {
    return Promise.reject();
  },
};

let QueriesActual = QueriesDev;
if (import.meta.env.PROD) {
  QueriesActual = QueriesProduction;
}

export default QueriesActual;
