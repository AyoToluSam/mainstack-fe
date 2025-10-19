export type TransactionType = "deposit" | "withdrawal";

export type DepositType =
  | "coffee"
  | "digital_product"
  | "webinar"
  | "chargeback"
  | "cashback"
  | "refer_and_earn";

export type TransactionStatus = "successful" | "pending" | "failed";

export interface Transaction {
  amount: number;
  metadata?: {
    name: string;
    type: DepositType;
    email: string;
    quantity: number;
    country: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: TransactionStatus;
  type: TransactionType;
  date: string;
}
