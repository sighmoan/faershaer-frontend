export type Event = {
  id?: string;
  label: string;
};

export type Transaction = {
  txId?: string;
  payer?: string;
  payerId?: string;
  portraitUrl?: string;
  expense: string;
  sum: number;
};

export type Person = {
  id?: string;
  name: string;
  portraitUrl?: string;
  balance: number;
};

export type Reimbursement = {
  debtor: string;
  debtorPortraitUrl?: string;
  creditor: string;
  creditorPortraitUrl?: string;
  amount: number;
};

export type User = {
  id?: string;
  name: string;
  portraitUrl: string;
};
