/**
 * Jalali (Persian) calendar helpers.
 *
 * Conversion relies on the browser's built-in Persian calendar (`Intl`), so no extra dependency
 * is needed. All Gregorian ↔ Jalali conversions work on calendar dates (noon UTC), so time zones
 * and daylight saving never shift a day.
 */

export interface JalaliDate {
  year: number;
  /** 1–12 (1 = فروردین). */
  month: number;
  day: number;
}

export const JALALI_MONTH_NAMES = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

/** Saturday-first, matching the Persian week. */
export const JALALI_WEEKDAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"] as const;

/** One-letter weekday names for narrow layouts. */
export const JALALI_WEEKDAYS_SHORT = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const;

const MS_PER_DAY = 86_400_000;

const formatter = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", {
  timeZone: "UTC",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

/** Noon UTC of a Gregorian calendar day (month is 1–12). */
function utcNoon(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function fromUtcNoon(date: Date): JalaliDate {
  const parts = formatter.formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

/** Day-of-year of a Jalali date (1–366). */
function ordinal({ month, day }: JalaliDate): number {
  return (month <= 6 ? (month - 1) * 31 : 186 + (month - 7) * 30) + day;
}

/** Converts a Gregorian `Date` (its local calendar day) to a Jalali date. */
export function toJalali(date: Date): JalaliDate {
  return fromUtcNoon(utcNoon(date.getFullYear(), date.getMonth() + 1, date.getDate()));
}

/** Converts a Jalali date to a Gregorian `Date` at local midnight. */
export function jalaliToDate({ year, month, day }: JalaliDate): Date {
  // First guess: Nowruz is ~March 21; then correct by the Jalali distance until it matches.
  let guess = utcNoon(year + 621, 3, 21);
  guess = new Date(guess.getTime() + (ordinal({ year, month, day }) - 1) * MS_PER_DAY);

  for (let i = 0; i < 10; i += 1) {
    const current = fromUtcNoon(guess);
    if (current.year === year && current.month === month && current.day === day) break;
    let delta = (current.year - year) * 365 + (ordinal(current) - ordinal({ year, month, day }));
    // 366-day years can make the estimate 0 while the dates still differ: step one day.
    if (delta === 0) delta = current.year > year || (current.year === year && ordinal(current) > ordinal({ year, month, day })) ? 1 : -1;
    guess = new Date(guess.getTime() - delta * MS_PER_DAY);
  }

  return new Date(guess.getUTCFullYear(), guess.getUTCMonth(), guess.getUTCDate());
}

/** Number of days in a Jalali month (29/30 for Esfand, 31 for the first six months, else 30). */
export function jalaliMonthLength(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  const nextNowruz = jalaliToDate({ year: year + 1, month: 1, day: 1 });
  const esfandFirst = jalaliToDate({ year, month: 12, day: 1 });
  return Math.round((nextNowruz.getTime() - esfandFirst.getTime()) / MS_PER_DAY);
}

/** Weekday index with Saturday = 0 … Friday = 6. */
export function jalaliWeekdayIndex(date: Date): number {
  return (date.getDay() + 1) % 7;
}

/** Parses a Gregorian `Date` or an ISO string ("2026-11-09" or full ISO) to a local calendar day. */
export function parseCalendarDate(value: Date | string): Date {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}
