export type WalletTransactionKind = "opening" | "top-up" | "publication" | "republication" | "withdrawal" | "escrow" | "release" | "refund";
export interface WalletTransaction {
  id: string;
  kind: WalletTransactionKind;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
  adId?: string;
  reference?: string;
  note?: string;
  status?: "completed" | "pending";
}
export interface MockBankCard {
  id: string;
  bank: string;
  last4: string;
  holder: string;
  isDefault: boolean;
}
export interface MockBankAccount {
  id: string;
  label: string;
  last4: string;
}
