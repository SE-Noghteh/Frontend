const DIRECT_TOKEN_KEYS = [
  "access_token",
  "accessToken",
  "auth_token",
  "authToken",
  "token",
] as const;

const NESTED_TOKEN_KEYS = new Set([
  "access_token",
  "accessToken",
  "auth_token",
  "authToken",
  "token",
]);

function findTokenInValue(value: unknown, depth = 0): string | null {
  if (depth > 4 || value === null || value === undefined) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    try {
      return findTokenInValue(JSON.parse(trimmed), depth + 1);
    } catch {
      return null;
    }
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const token = findTokenInValue(item, depth + 1);
      if (token) return token;
    }
    return null;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of NESTED_TOKEN_KEYS) {
      const candidate = record[key];
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim().replace(/^Bearer\s+/i, "");
      }
    }

    for (const nested of Object.values(record)) {
      const token = findTokenInValue(nested, depth + 1);
      if (token) return token;
    }
  }

  return null;
}

function findTokenInStorage(storage: Storage): string | null {
  for (const key of DIRECT_TOKEN_KEYS) {
    const value = storage.getItem(key);
    if (value?.trim()) return value.trim().replace(/^Bearer\s+/i, "");
  }

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key) continue;

    const value = storage.getItem(key);
    const token = findTokenInValue(value);
    if (token) return token;
  }

  return null;
}

/**
 * Reads the JWT created by the existing login flow without coupling the API
 * layer to a specific auth-store implementation.
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  return (
    findTokenInStorage(window.localStorage) ??
    findTokenInStorage(window.sessionStorage)
  );
}
