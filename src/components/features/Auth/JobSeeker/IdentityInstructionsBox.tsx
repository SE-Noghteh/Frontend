interface IdentityInstructionsBoxProps {
  fullName: string;
  birthDate: string;
}

export function IdentityInstructionsBox({ fullName, birthDate }: IdentityInstructionsBoxProps) {
  const toPersianDigits = (str: string | number) => {
    return str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "...";
    
    const parts = dateStr.split(" ");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10).toString();
      const month = parts[1];
      const year = parseInt(parts[2], 10).toString();
      
      const formatted = `${day} ${month} ${year}`;
      return toPersianDigits(formatted);
    }
    
    return toPersianDigits(dateStr);
  };

  return (
    <div className="w-full bg-surface-info rounded-md p-4 flex items-start gap-3 border border-border-decorative text-right">
      <div className="text-action-primary mt-1 flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <line x1="8" y1="9" x2="16" y2="9"></line>
          <line x1="8" y1="13" x2="14" y2="13"></line>
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-label font-bold text-text-primary">
          این جمله را واضح و با صدای بلند بگو
        </p>
        <p className="text-label font-medium text-text-primary leading-relaxed">
          من {fullName || "..."} متولد {formatDate(birthDate)}، قوانین زدلنسر را خوانده‌ام و می‌پذیرم.
        </p>
        <p className="text-caption text-text-secondary mt-1">
          نام و تاریخ تولد خودکار از فرم‌های بالا پر می‌شود.
        </p>
      </div>
    </div>
  );
}