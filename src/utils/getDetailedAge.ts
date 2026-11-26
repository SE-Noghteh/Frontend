interface DetailedAge {
    years: number;
    months: number;
    days: number;
    totalYears: number;
  }
  
  export function getDetailedAge(year: string, month: string, day: string): DetailedAge {
    if (!year || !month || !day) return { years: 0, months: 0, days: 0, totalYears: 0 };
  
    const bYear = parseInt(year, 10);
    const bMonth = parseInt(month, 10);
    const bDay = parseInt(day, 10);
  
    const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  
    const now = new Date();
    const parts = formatter.formatToParts(now);
    const cYear = parseInt(parts.find((p) => p.type === "year")!.value, 10);
    const cMonth = parseInt(parts.find((p) => p.type === "month")!.value, 10);
    const cDay = parseInt(parts.find((p) => p.type === "day")!.value, 10);
  
    let years = cYear - bYear;
    let months = cMonth - bMonth;
    let days = cDay - bDay;
  
    if (days < 0) {
      months--;
      const daysInPrevMonth = cMonth <= 6 ? 31 : 30;
      days += daysInPrevMonth;
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return { years, months, days, totalYears: years };
  }