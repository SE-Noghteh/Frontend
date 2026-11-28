// src/hooks/useAuth.ts
import { useState } from "react";
import { login as loginService } from "@/services/Auth/authService";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { LoginFormValues } from "@/types/Auth/authTypes";
import { getBackendFieldErrors } from "@/services/Auth/employerAuthService";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setGlobalError(null);

    try {
      // ولیدیشن‌های سمت کلاینت
      if (!values.mobile.trim() || !values.password?.trim()) {
        throw new Error("شماره موبایل و رمز عبور را وارد کنید");
      }

      const response = await loginService(values);
      setUser(response.user);
      
    } catch (error: any) {
      const translated = getBackendFieldErrors(error);
      setGlobalError(translated.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    isAuthenticated, 
    login, 
    isLoading, 
    globalError 
  };
}