import { toPersianDigits } from "./toPersianDigits";

export function formatToman(amount: number): string {
  return `${toPersianDigits(
    amount.toLocaleString("en-US").replace(/,/g, "٬"),
  )} تومان`;
}

/**
 * Mock data already uses Jalali-looking strings such as 1405/08/15.
 * Backend Swagger returns Gregorian ISO dates such as 2027-01-01.
 */
export function formatJalaliDate(value: string): string {
  if (!value) return "—";

  if (/^14\d{2}\/\d{2}\/\d{2}$/.test(value)) {
    return toPersianDigits(value);
  }

  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? `${value}T00:00:00`
      : value,
  );

  if (Number.isNaN(date.getTime())) {
    return toPersianDigits(value);
  }

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
