/**
 * SAMPLE FILE
 *
 * Custom hooks must start with "use".
 * Hooks contain reusable React logic.
 */

import { useAuthStore } from "@/store/auth/useAuthStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  return {
    user,
    isAuthenticated,
  };
}