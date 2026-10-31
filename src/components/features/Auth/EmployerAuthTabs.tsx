interface AuthTabsProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex w-full border-b border-border-decorative mb-6">
      <button
        type="button"
        onClick={() => onTabChange("login")}
        className={`flex-1 pb-3 text-label font-medium transition-colors border-b-2 ${
          activeTab === "login" 
            ? "border-blue-4 text-blue-4" 
            : "border-transparent text-text-secondary hover:text-text-primary"
        }`}
      >
        ورود
      </button>
      <button
        type="button"
        onClick={() => onTabChange("signup")}
        className={`flex-1 pb-3 text-label font-medium transition-colors border-b-2 ${
          activeTab === "signup" 
            ? "border-blue-4 text-blue-4" 
            : "border-transparent text-text-secondary hover:text-text-primary"
        }`}
      >
        ساخت حساب
      </button>
    </div>
  );
}