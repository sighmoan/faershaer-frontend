import { Person, Transaction, Reimbursement } from "../Types";

export type QueriesSpec = {
  getTransactions: () => Promise<Transaction[]>;
  createTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPersons: () => Promise<Person[]>;
  getReimbursements: () => Promise<Reimbursement[]>;
};
