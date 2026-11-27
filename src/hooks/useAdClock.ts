import { useEffect, useState } from "react";
import { getTodayISO } from "@/utils/dateValidation";

// Re-render open screens at a date change, including after returning to the tab.
export function useAdClock(): string {
  const [today, setToday] = useState(getTodayISO);
  useEffect(() => {
    const refresh = () => setToday(getTodayISO());
    const timer = window.setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return today;
}
