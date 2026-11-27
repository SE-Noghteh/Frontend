import type { WalletTransactionKind } from "@/types/Employer/finance";
export const transactionLabels: Record<WalletTransactionKind, string> = { opening: "موجودی اولیه", "top-up": "شارژ", publication: "هزینه انتشار", republication: "هزینه انتشار", withdrawal: "برداشت", escrow: "امانت پروژه", release: "آزادسازی", refund: "عودت" };
export function asciiDigits(value: string) { return value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, d => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))); }
export function amountInput(value: string) { return asciiDigits(value).replace(/[٬,\s]/g, ""); }
export function isAmount(value: string) { return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0; }
export const formatAmount = (value: number) => value.toLocaleString("fa-IR");
export const formatFinanceDate = (value: string) => new Date(value).toLocaleDateString("fa-IR", {year:"numeric", month:"2-digit", day:"2-digit"});
