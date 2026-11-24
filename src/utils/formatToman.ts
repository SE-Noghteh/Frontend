import { toPersianDigits } from "./toPersianDigits";

/** 2400000 -> "۲٬۴۰۰٬۰۰۰ تومان" */
export function formatToman(amount: number): string {
  return `${toPersianDigits(amount.toLocaleString("en-US").replace(/,/g, "٬"))} تومان`;
}

/** "1405/08/15" -> "۱۴۰۵/۰۸/۱۵" */
export function formatJalaliDate(value: string): string {
  return toPersianDigits(value);
}
