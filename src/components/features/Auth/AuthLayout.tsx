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
      
      <div className="flex flex-col lg:flex-row-reverse flex-1 w-full">
        
        <div className="w-full lg:w-[59.375%] flex flex-col px-8 lg:px-24 pt-8 lg:pt-0 bg-white z-10 order-last lg:order-none">
          
          <div className="hidden lg:block pt-8">
            <AuthHeader />
          </div>

          <div className="mt-6 lg:mt-8">
            <AuthTabs activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          
          <div className="flex-1 mt-4 pb-12">
            {children}
          </div>
        </div>

        <div className="w-full lg:w-[40.625%] relative flex flex-col order-first lg:order-none">
          
          <div className="block lg:hidden w-full px-8 pt-8 pb-4 bg-white">
            <AuthHeader />
          </div>

          <div className="w-full h-48 lg:h-auto lg:flex-1 relative overflow-hidden">
            <div className="w-full h-full lg:inset-0 ">
              <AuthImagePanel userType="jobseeker" />
            </div>
          </div>
        </div>

      </div>

      {/* footer */}
      <footer className="w-full bg-action-primary text-white py-4 px-8 flex justify-between items-center text-caption z-20 relative">
        <span>زدلنسر؛ شروع راه تو</span>
        <span><a href="#" className="text-brand-peach hover:underline mr-1">نیاز به راهنمایی داری؟ </a></span>
      </footer>
    </div>
  );
}