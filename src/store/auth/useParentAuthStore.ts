import { create } from "zustand";

import { parentTokenStorageKeys } from "@/services/Auth/Parent/parentToken";
import type {
  ParentAccount,
  ParentLoginResponse,
} from "@/types/Auth/parentAuth";

interface ParentAuthState {
  parent: ParentAccount | null;
  isAuthenticated: boolean;
  setSession: (
    response: ParentLoginResponse,
    rememberMe: boolean,
  ) => void;
  setParent: (parent: ParentAccount) => void;
  clearSession: () => void;
}

const PARENT_STORAGE_KEY = parentTokenStorageKeys.state;

function readStoredParent(): ParentAccount | null {
  if (typeof window === "undefined") return null;

  const raw =
    window.localStorage.getItem(PARENT_STORAGE_KEY) ??
    window.sessionStorage.getItem(PARENT_STORAGE_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      parent?: ParentAccount;
    };
    return parsed.parent ?? null;
  } catch {
    return null;
  }
}

function clearStoredSession() {
  if (typeof window === "undefined") return;

  for (const storage of [
    window.localStorage,
    window.sessionStorage,
  ]) {
    const hadParentState = Boolean(
      storage.getItem(PARENT_STORAGE_KEY),
    );

    storage.removeItem(PARENT_STORAGE_KEY);
    storage.removeItem(parentTokenStorageKeys.token);

    // Clean only the legacy parent token from the old implementation.
    // Never remove a generic job-seeker token from an unrelated storage.
    if (hadParentState) {
      storage.removeItem(parentTokenStorageKeys.legacyToken);
    }
  }
}

const initialParent = readStoredParent();

export const useParentAuthStore =
  create<ParentAuthState>((set) => ({
    parent: initialParent,
    isAuthenticated: Boolean(initialParent),

    setSession: (response, rememberMe) => {
      clearStoredSession();

      const storage = rememberMe
        ? window.localStorage
        : window.sessionStorage;

      storage.setItem(
        parentTokenStorageKeys.token,
        response.access_token,
      );

      storage.setItem(
        PARENT_STORAGE_KEY,
        JSON.stringify({
          parent: response.data,
          expiresAt: response.expires_at,
        }),
      );

      set({
        parent: response.data,
        isAuthenticated: true,
      });
    },

    setParent: (parent) => {
      const storage =
        window.localStorage.getItem(PARENT_STORAGE_KEY)
          ? window.localStorage
          : window.sessionStorage;

      storage.setItem(
        PARENT_STORAGE_KEY,
        JSON.stringify({ parent }),
      );

      set({
        parent,
        isAuthenticated: true,
      });
    },

    clearSession: () => {
      clearStoredSession();
      set({
        parent: null,
        isAuthenticated: false,
      });
    },
  }));
