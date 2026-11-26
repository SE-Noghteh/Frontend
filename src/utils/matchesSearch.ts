import { normalizeDigits } from "@/utils/normalizeDigits";

/** Ignores case, spacing, half-spaces and Arabic/Persian letter and digit variants. */
function toSearchKey(value: string): string {
  return normalizeDigits(value)
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\s‌]+/g, "");
}

export function matchesSearch(text: string, query: string): boolean {
  return toSearchKey(text).includes(toSearchKey(query));
}
