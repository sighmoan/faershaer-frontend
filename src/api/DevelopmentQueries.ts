import { QueriesSpec } from "./QueriesSpec";
import { Person, Reimbursement, Transaction } from "../Types";

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

const reimbursementData: Reimbursement[] = [
  {
    debtor: { id: "1", name: "John Steinbeck", balance: 300 },
    creditor: { id: "2", name: "Joyce Carol Oates", balance: 300 },
    amount: 400,
  },
  {
    debtor: { id: "3", name: "Jason Mraz", balance: 300 },
    creditor: { id: "4", name: "Bob Malecki", balance: 300 },
    amount: 590,
  },
  {
    debtor: { id: "5", name: "Johnson", balance: 300 },
    creditor: { id: "6", name: "Mark Watson", balance: 300 },
    amount: 2300,
  },
];

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
  getReimbursements: () => Promise.resolve(reimbursementData),
};

export default QueriesDev;
