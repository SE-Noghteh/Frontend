interface AuthHeaderProps {
  onLoginClick: () => void;
}

export function AuthHeader({ onLoginClick }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full h-16">
      <div className="flex items-center">
        <img 
          src="@/../public/images/ZedlancerLogo.svg" 
          alt="زدلنسر" 
          className="h-8 w-auto object-contain" 
        />
      </div>
      
      <button 
        type="button"
        onClick={onLoginClick}
        className="text-label text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
      >
        ورود
      </button>
    </header>
  );
}