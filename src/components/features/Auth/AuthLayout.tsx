import { type ReactNode } from "react";
import { AuthHeader } from "./AuthHeader";
import { AuthTabs } from "./AuthTabs";
import { AuthImagePanel } from "./AuthImagePanel";

interface AuthLayoutProps {
  children: ReactNode;
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export function AuthLayout({ children, activeTab, onTabChange }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      
      <div className="flex flex-row-reverse flex-1 w-full">
        
        <div className="w-full lg:w-[59.375%] flex flex-col px-8 lg:px-24 pt-8">
          <AuthHeader />
          
          <div className="mt-6">
            <AuthTabs activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          
          <div className="flex-1 mt-4">
            {children}
          </div>
        </div>

        {/* Photo column*/}
        <div className="hidden lg:block lg:w-[40.625%] relative min-h-screen">
           <AuthImagePanel />
        </div>
      </div>

      {/* Footer*/}
      <footer className="w-full bg-action-primary text-white py-4 px-8 flex justify-between items-center text-caption z-10">
        <span>زدلنسر؛ شروع راه تو</span>
        <span><a href="#" className="text-brand-peach hover:underline mr-1">نیاز به راهنمایی داری؟ </a></span>
      </footer>
    </div>
  );
}