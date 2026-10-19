/**
 * SAMPLE FILE
 *
 * Zustand stores contain global client-side state.
 *
 * Naming convention:
 * useSomethingStore.ts
 */

import { create } from "zustand";
import type { User } from "@/types/User/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));