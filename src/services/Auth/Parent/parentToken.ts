const PARENT_TOKEN_KEY = "parent_access_token";
const PARENT_STATE_KEY = "parent_auth";
const LEGACY_TOKEN_KEY = "access_token";

function readFrom(storage: Storage): string | null {
  const dedicated = storage.getItem(PARENT_TOKEN_KEY)?.trim();

  if (dedicated) {
    return dedicated.replace(/^Bearer\s+/i, "");
  }

  /**
   * Migration support for the first Parent Auth version:
   * it stored the parent token under the generic `access_token` key.
   * Only use that legacy token when `parent_auth` exists in the SAME storage,
   * otherwise it may actually be a job-seeker token.
   */
  if (storage.getItem(PARENT_STATE_KEY)) {
    const legacy = storage.getItem(LEGACY_TOKEN_KEY)?.trim();

    if (legacy) {
      return legacy.replace(/^Bearer\s+/i, "");
    }
  }

  return null;
}

export function getParentAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  return (
    readFrom(window.localStorage) ??
    readFrom(window.sessionStorage)
  );
}

export const parentTokenStorageKeys = {
  token: PARENT_TOKEN_KEY,
  state: PARENT_STATE_KEY,
  legacyToken: LEGACY_TOKEN_KEY,
} as const;
