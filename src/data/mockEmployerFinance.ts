import type { MockBankAccount, MockBankCard, WalletTransaction } from "@/types/Employer/finance";

// Historic demo ledger; release consumes escrow, not available wallet again.
const rows: Array<Omit<WalletTransaction, "balanceAfter"> & { delta: number }> = [
  { id: "84172900", kind: "top-up", amount: 14060000, delta: 14060000, description: "شارژ کیف پول", reference: "کارت ملی · ۴۰۳۷", createdAt: "2026-10-15T09:00:00Z" },
  { id: "84172901", kind: "escrow", amount: -8100000, delta: -8100000, description: "امانت همکاری‌های تکمیل‌شده", createdAt: "2026-10-16T09:00:00Z" },
  { id: "84172902", kind: "release", amount: -8100000, delta: 0, description: "آزادسازی به کارجو · همکاری‌های تکمیل‌شده", note: "از مبلغ در امانت پرداخت شده است.", createdAt: "2026-10-18T09:00:00Z" },
  { id: "84172903", kind: "escrow", amount: -960000, delta: -960000, description: "امانت · لوگوی کافه", createdAt: "2026-10-19T09:00:00Z" },
  { id: "84172904", kind: "refund", amount: 960000, delta: 960000, description: "عودت · لوگوی کافه", reference: "تصمیم ادمین", createdAt: "2026-10-20T09:00:00Z" },
  { id: "84172905", kind: "escrow", amount: -2400000, delta: -2400000, description: "امانت · سارا محمدی", reference: "طراحی پست‌های پاییز", createdAt: "2026-10-25T09:00:00Z", status: "pending" },
  { id: "84172906", kind: "escrow", amount: -700000, delta: -700000, description: "امانت · تدوین ویدیو", createdAt: "2026-10-26T09:00:00Z", status: "pending" },
  { id: "84172907", kind: "publication", amount: -50000, delta: -50000, description: "انتشار آگهی «طراحی پست‌های پاییز»", adId: "1", createdAt: "2026-10-28T09:00:00Z" },
  { id: "84172908", kind: "withdrawal", amount: -2780000, delta: -2780000, description: "برداشت به حساب بانکی", reference: "شبا · ۴۵۲۱", createdAt: "2026-10-30T09:00:00Z" },
];
let balance = 0;
export const mockWalletTransactions: WalletTransaction[] = rows.map(({delta, ...row}) => ({...row, balanceAfter: balance += delta})).reverse();
export const mockWalletBalance = balance;
export const mockBankCards: MockBankCard[] = [
  { id: "card-1", bank: "بانک ملی", last4: "4037", holder: "استودیو سپیدار", isDefault: true },
  { id: "card-2", bank: "بانک ملت", last4: "6104", holder: "استودیو سپیدار", isDefault: false },
];
export const mockBankAccounts: MockBankAccount[] = [
  { id: "account-1", label: "شبا IR06 ···· ۴۵۲۱", last4: "4521" },
  { id: "account-2", label: "شبا IR44 ···· ۱۲۰۸", last4: "1208" },
];
