
interface PasswordCriteriaProps {
    password: string;
    isTouched?: boolean; 
  }
  
  export function PasswordCriteria({ password, isTouched = false }: PasswordCriteriaProps) {
    const criteria = [
      { label: "حداقل ۱۲ کاراکتر", isValid: password.length >= 12 },
      { label: "حاوی حرف کوچک و بزرگ", isValid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
      { label: "حداقل یک عدد", isValid: /[0-9]/.test(password) },
      { label: "حداقل یک علامت", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
  
    const shouldShowStatus = isTouched || password.length > 0;
  
    return (
      <div className="flex flex-col gap-1.5 mt-2 pr-2">
        {criteria.map((c, i) => {
          let statusIcon;
          let textColorClass = "text-text-secondary";
  
          if (!shouldShowStatus) {
            statusIcon = (
              <div className="w-4 h-4 rounded-full border border-text-disabled" />
            );
          } else if (c.isValid) {
            statusIcon = (
              <div className="w-4 h-4 rounded-full flex items-center justify-center border border-status-success bg-status-success text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            );
            textColorClass = "text-text-primary";
          } else {
            statusIcon = (
              <div className="w-4 h-4 rounded-full flex items-center justify-center border border-status-error bg-status-error text-white">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            );
          }
  
          return (
            <div key={i} className="flex items-center gap-2 text-caption">
              {statusIcon}
              <span className={textColorClass}>{c.label}</span>
            </div>
          );
        })}
      </div>
    );
  }