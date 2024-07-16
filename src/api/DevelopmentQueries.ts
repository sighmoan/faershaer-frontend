import { QueriesSpec } from "./QueriesSpec";
import { Person, Transaction } from "../Types";

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

const QueriesDev: QueriesSpec = {
  getTransactions: () => Promise.resolve(JSON.parse(JSON.stringify(txData))),
  createTransaction: (t: Transaction) => {
    t.txId = String(++maxTxId);
    if (!t.payer) {
      t.payer = personData.filter((p) => p.id == t.payerId)[0].name;
    }
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

export default QueriesDev;
