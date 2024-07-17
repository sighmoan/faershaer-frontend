import { QueriesSpec } from "./QueriesSpec";
import { Event, Person, Reimbursement, Transaction } from "../Types";

const devApiDelay = import.meta.env.VITE_DEV_API_DELAY ?? 0;

const personData: Person[] = [
  { id: "1", name: "John", balance: 500.0 },
  { id: "2", name: "Alice", balance: 150.75 },
  { id: "3", name: "Bob", balance: 120.0 },
  { id: "4", name: "Sarah", balance: 275.0 },
];
let maxPersonId = 4;

const eventData: Event = {
  id: "1",
  label: "Picnic in Solna",
};

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
    debtor: "John Steinbeck",
    creditor: "Joyce Carol Oates",
    amount: 400,
  },
  {
    debtor: "Jason Mraz",
    creditor: "Bob Malecki",
    amount: 590,
  },
  {
    debtor: "Johnson",
    creditor: "Mark Watson",
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
  getEventDetails: () =>
    new Promise((resolve) => setTimeout(() => resolve(eventData), devApiDelay)),
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
      console.log("getting people, persondata being ", personData);
      setTimeout(
        () => resolve(JSON.parse(JSON.stringify(personData))),
        devApiDelay
      );
    }),
  createPerson: (p: Person) =>
    new Promise((resolve) => {
      p.id = String(++maxPersonId);
      personData.push(p);
      console.log("added ", p, " person data is now ", personData);
      setTimeout(resolve, devApiDelay);
    }),
  removePerson: (id: string) =>
    new Promise((resolve, reject) => {
      const index: number = personData.findIndex((p) => p.id == id);
      if (index >= 0) {
        personData.splice(index, 1);
        setTimeout(resolve, devApiDelay);
      }
      setTimeout(reject, devApiDelay);
    }),
  getReimbursements: () => Promise.resolve(reimbursementData),
};

export default QueriesDev;
