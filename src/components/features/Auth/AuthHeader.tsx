export function AuthHeader() {
  return (
    <header className="flex items-center justify-between w-full h-16">
    
      <div className="flex items-center">
        <img 
          src="@/../public/images/ZedlancerLogo.svg" 
          alt="زلنسر" 
          className="h-8 w-auto object-contain" 
        />
      </div>
      
      <button type="button" className="text-label text-text-secondary hover:text-text-primary transition-colors">
        ورود
      </button>
    </header>
  );
}