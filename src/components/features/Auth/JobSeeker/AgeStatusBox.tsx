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

  let boxStyle = "";
  let title = "";
  let description = "";
  let icon = null;

  if (age < 15) {
    boxStyle = "bg-surface-error border-status-error text-status-error";
    title = "هنوز به سن ثبت‌نام نرسیده‌ای";
    description = "ثبت‌نام از روز تولد ۱۵ سالگی ممکن است. تاریخ تولدت را بررسی کن.";
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    );
  } else if (age > 22) {
    boxStyle = "bg-surface-error border-status-error text-status-error";
    title = "این مسیر برای ۱۵ تا ۲۲ سال است";
    description = "سن تو بیشتر از ۲۲ سال است؛ امکان ادامه ثبت‌نام وجود ندارد.";
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    );
  } else if (age >= 15 && age < 18) {
    boxStyle = "bg-surface-warning border-status-warning text-status-warning";
    title = "برای شروع کار، تأیید والد لازم است";
    description = "در گروه سنی ۱۵ تا ۱۷ سال هستی. می‌توانی ثبت‌نام را ادامه بدهی؛ ارسال درخواست کار به تکمیل اطلاعات والد و تأیید او نیاز دارد.";
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    );
  } else if (age >= 18) {
    boxStyle = "bg-surface-info border-interface-secondary text-action-primary";
    title = "اطلاعات والد برای تو اختیاری است";
    description = "می‌توانی پس از تأیید شماره، بدون افزودن والد وارد پنلت شوی.";
    icon = (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    );
  }

  return (
    <div className={`w-full p-4 rounded-md flex items-start gap-3 border-r-4 text-right mt-2 ${boxStyle}`}>
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div className="flex flex-col gap-1">
        <span className="text-label font-bold">{title}</span>
        <span className="text-caption leading-relaxed">{description}</span>
      </div>
    </div>
  );
}