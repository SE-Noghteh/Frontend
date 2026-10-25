import { useState } from "react";
import { loginSchema } from "@/schemas/loginSchema";
import { login as loginService } from "@/services/Auth/authService";
import { useAuthStore } from "@/store/auth/useAuthStore";
import type { LoginFormValues } from "@/types/Auth/authTypes";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setLoading = useAuthStore((state) => state.setLoading);

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setGlobalError(null);
    setFieldErrors({}); 

    try {
      await loginSchema.validate(values, { abortEarly: false });
      
      const response = await loginService(values);
      setUser(response.user);
      
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          if (err.path) errors[err.path] = err.message;
        });
        setFieldErrors(errors);
      } else {
        setGlobalError(error.message || "خطایی رخ داده است.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    isAuthenticated, 
    login, 
    isLoading, 
    globalError, 
    fieldErrors 
  };
}