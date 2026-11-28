import { type ReactNode } from "react";

interface ErrorBoxProps {
  message?: string | null; 
  title?: string;         
  description?: string;   
  icon?: ReactNode;       
}

export function ErrorBox({ message, title, description, icon }: ErrorBoxProps) {
  if (!message && !title && !description) return null;

  const displayTitle = title || message;
  const displayDescription = description;

  return (
    <div 
      className="w-full flex items-start gap-3 p-4 rounded-lg bg-surface-error border border-status-error border-r-4 border-r-status-error text-status-error text-right transition-colors"
      role="alert"
    >
      <div className="shrink-0 mt-0.5">
        {icon || (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {displayTitle && (
          <span className="text-label font-bold">{displayTitle}</span>
        )}
        {displayDescription && (
          <span className="text-caption font-medium">{displayDescription}</span>
        )}
      </div>
    </div>
  );
}