import { Person, Transaction } from "../Types";

export type QueriesSpec = {
  getTransactions: () => Promise<Transaction[]>;
  createTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPersons: () => Promise<Person[]>;
};
