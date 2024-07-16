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
  balance: number;
};
