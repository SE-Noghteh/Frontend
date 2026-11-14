/**
 * SAMPLE FILE
 *
 * Utilities should be small, reusable,
 * and preferably pure functions.
 */

export function formatDate(
  value: string | Date,
  locale = "en-US",
): string {
  const date = value instanceof Date
    ? value
    : new Date(value);

  return new Intl.DateTimeFormat(locale).format(date);
}