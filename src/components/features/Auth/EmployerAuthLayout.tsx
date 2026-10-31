import { type ReactNode } from "react";
import { AuthHeader } from "./EmployerAuthHeader";
import { AuthTabs } from "./EmployerAuthTabs";
import { AuthImagePanel } from "./EmployerAuthImagePanel";

interface AuthLayoutProps {
  children: ReactNode;
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
  userType: "jobseeker" | "employer";
}

export function AuthLayout({ children, activeTab, onTabChange, userType }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      
      <div className="flex flex-col lg:flex-row-reverse flex-1 w-full relative">
        
        {/* ستون فرم (در موبایل میاد پایین) */}
        <div className="w-full lg:w-[59.375%] flex flex-col bg-white z-10 order-last lg:order-none">
          
          {/* هدر دسکتاپ: توی ستون فرم */}
          <div className="hidden lg:block px-0 pt-4 pb-2">
            <AuthHeader onLoginClick={() => onTabChange("login")} />
          </div>

          {/* بقیه‌ی فرم با پدینگ */}
          <div className="px-8 lg:px-17 pt-2 pb-4 flex flex-col flex-1">
            <div className="mt-2">
              <AuthTabs activeTab={activeTab} onTabChange={onTabChange} />
            </div>
            
            <div className="flex-1 mt-[-20px] pb-5">
              {children}
            </div>
          </div>

        </div>

        {/* ستون عکس و هدر موبایل */}
        <div className="w-full lg:w-[40.625%] relative flex flex-col order-first lg:order-none">
          
          {/* هدر موبایل: فضای سفید بالای عکس */}
          <div className="block lg:hidden w-full px-0 pt-4 pb-2 bg-white z-10 relative">
            <AuthHeader onLoginClick={() => onTabChange("login")} />
          </div>

          {/* عکس */}
          <div className="w-full h-45 lg:h-auto lg:flex-1 relative overflow-hidden">
            <AuthImagePanel userType={userType} />
          </div>

        </div>

      </div>

      {/* فوتر */}
      <footer className="w-full bg-action-primary text-white py-3 px-8 flex justify-between items-center text-caption z-20 relative">
        <span>زدلنسر؛ شروع راه تو</span>
        <span><a href="#" className="text-white hover:underline mr-1">نیاز به راهنمایی داری؟ </a></span>
      </footer>
    </div>
  );
}