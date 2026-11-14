import { useEffect } from "react";
import { createPortal } from "react-dom";
import { type ReactNode } from "react";

interface ToastProps {
  message?: string | null;
  title?: string;
  description?: string;
  icon?: ReactNode;
  onClose: () => void;
  duration?: number; 
}

export function Toast({ 
  message, 
  title, 
  description, 
  icon, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  useEffect(() => {
    if (!message && !title && !description) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, title, description, duration, onClose]);

  if (!message && !title && !description) return null;

  const displayTitle = title || message;
  const displayDescription = description;

  return createPortal(
    <div 
      className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 w-[calc(100%-2rem)] md:w-[400px] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300"
      role="alert"
      dir="rtl"
    >
      <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-error border border-status-error border-r-4 border-r-status-error text-status-error shadow-lg text-right">
        
        <div className="shrink-0 mt-0.5">
          {icon || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
        </div>

        <div className="flex flex-col gap-1 flex-1">
          {displayTitle && (
            <span className="text-label font-bold">{displayTitle}</span>
          )}
          {displayDescription && (
            <span className="text-caption font-medium">{displayDescription}</span>
          )}
        </div>

        <button 
          onClick={onClose}
          type="button"
          className="shrink-0 p-1 -m-1 text-status-error/70 hover:text-status-error hover:bg-status-error/10 rounded-md transition-colors"
          aria-label="بستن پیام"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}