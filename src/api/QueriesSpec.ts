import { User, Event, Person, Transaction, Reimbursement } from "../Types";

export type QueriesSpec = LimitedQueriesSpec | FullQueriesSpec;

export type LimitedQueriesSpec = {
  getEvents: () => Promise<Event[]>;
  createEvent: (e: Event) => Promise<string>;
  getUserData: () => Promise<User>;
  getEventDetailsFor: (id: string) => Promise<Event>;
};

export type FullQueriesSpec = LimitedQueriesSpec & {
  getEventSlug: () => string;
  getEventDetails: () => Promise<Event>;
  getTransactions: () => Promise<Transaction[]>;
  createTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPersons: () => Promise<Person[]>;
  createPerson: (p: Person) => Promise<void>;
  removePerson: (id: string) => Promise<void>;
  getReimbursements: () => Promise<Reimbursement[]>;
};
