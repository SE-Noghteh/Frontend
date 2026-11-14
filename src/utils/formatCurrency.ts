/**
 * SAMPLE FILE
 *
 * Generic reusable currency formatting utility.
 */

export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}