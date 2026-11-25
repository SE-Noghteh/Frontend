interface AuthHeaderProps {
  onLoginClick: () => void;
  onTrackClick?: () => void; 
}

export function AuthHeader({ onLoginClick, onTrackClick }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full h-16" dir="rtl">
      
      <div className="flex items-center gap-6">
        <img 
          src="/images/ZedlancerLogo.svg" 
          alt="زدلنسر" 
          className="h-8 w-auto object-contain" 
        />
      </div>
    </header>
  );
}