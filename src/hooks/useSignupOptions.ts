import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/api/axiosInstance";

export interface SignupOptions {
  provinces: string[];
  cities_by_province: Record<string, string[]>;
  genders: string[];
  interests?: string[];
}

export function useSignupOptions(accountType: "real" | "legal") {
  const [options, setOptions] = useState<SignupOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const endpoint =
      accountType === "real"
        ? "/individual-employers/signup-options"
        : "/legal-employers/signup-options";

    axiosInstance
      .get(endpoint)
      .then((res) => setOptions(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "خطا در دریافت گزینه‌ها")
      )
      .finally(() => setIsLoading(false));
  }, [accountType]);

  return { options, isLoading, error };
}