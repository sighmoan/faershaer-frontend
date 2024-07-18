export type Event = {
  id?: string;
  label: string;
};

export type Transaction = {
  txId?: string;
  payer?: string;
  payerId?: string;
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
  creditor: string;
  amount: number;
};
