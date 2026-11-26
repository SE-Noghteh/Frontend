/** Converts latin digits in a number/string to Persian digits. */
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}
