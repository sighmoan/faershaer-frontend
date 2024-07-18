import { Event, Person, Transaction, Reimbursement } from "../Types";

export type QueriesSpec = {
  createEvent: (e: Event) => Promise<void>;
  getEventSlug: () => string;
  getEvents: () => Promise<Event[]>;
  getEventDetails: () => Promise<Event>;
  getEventDetailsFor: (id: string) => Promise<Event>;
  getTransactions: () => Promise<Transaction[]>;
  createTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPersons: () => Promise<Person[]>;
  createPerson: (p: Person) => Promise<void>;
  removePerson: (id: string) => Promise<void>;
  getReimbursements: () => Promise<Reimbursement[]>;
};
