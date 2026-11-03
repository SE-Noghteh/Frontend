interface ErrorBoxProps {
    message: string | null;
  }
  
  export function ErrorBox({ message }: ErrorBoxProps) {
    if (!message) return null;
  
    return (
      <div 
        className="w-full p-3 rounded-md text-label text-right border transition-colors"
        style={{
          backgroundColor: "var(--color-surface-error)",
          borderColor: "var(--color-status-error)",
          color: "var(--color-status-error)",
        }}
        role="alert"
      >
        {message}
      </div>
    );
  }