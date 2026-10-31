interface AuthHeaderProps {
  onLoginClick: () => void;
}

export function AuthHeader({ onLoginClick }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full px-6">
      <div className="flex items-center">
        <img 
          src="/images/ZedlancerLogo.svg" 
          alt="زدلنسر" 
          className="h-7 w-auto object-contain" 
        />
      </div>
      
      <button 
        type="button"
        onClick={onLoginClick}
        className="text-body font-bold text-action-primary hover:text-action-primary transition-colors cursor-pointer"
      >
        ورود
      </button>
    </header>
  );
}