interface AgeStatusBoxProps {
  year: string;
  month: string;
  day: string;
}

export function AgeStatusBox({ year, month, day }: AgeStatusBoxProps) {
  if (!year || !month || !day) return null;

  const calculateAge = (y: number, m: number, d: number) => {
    const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const now = new Date();
    const parts = formatter.formatToParts(now);
    const currentYear = parseInt(parts.find(p => p.type === "year")!.value, 10);
    const currentMonth = parseInt(parts.find(p => p.type === "month")!.value, 10);
    const currentDay = parseInt(parts.find(p => p.type === "day")!.value, 10);

    let age = currentYear - y;
    if (currentMonth < m || (currentMonth === m && currentDay < d)) {
      age--;
    }
    return age;
  };

  const age = calculateAge(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10));

  let errorMessage = "";
  if (age < 15) {
    errorMessage = "هنوز به سن ثبت‌نام نرسیده‌ای. ثبت‌نام از روز تولد ۱۵ سالگی ممکن است. تاریخ تولدت را بررسی کن.";
  } else if (age > 22) {
    errorMessage = "این مسیر برای ۱۵ تا ۲۲ سال است. سن تو بیشتر از ۲۲ سال است؛ امکان ادامه ثبت‌نام وجود ندارد.";
  } else {
    return null; 
  }

  return (
    <p className="text-caption text-status-error text-right mt-1 leading-relaxed">
      {errorMessage}
    </p>
  );
}