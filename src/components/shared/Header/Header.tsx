import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  //const { isAuthenticated, user } = useAuth();
  const isAuthenticated = true; // true for login
  const user = { fullName: "نگار محمدی", role: "jobseeker" as "jobseeker" | "employer" | "parent" };
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isJobSeeker = user?.role === "jobseeker";
  const roleLabel = 
    user?.role === "jobseeker" ? "متقاضی فرصت" : 
    user?.role === "employer" ? "کارفرما" : 
    user?.role === "parent" ? "والد" : "کاربر";

  return (
    <>
      <header className="w-full bg-white border-b border-border-decorative relative z-40">
        <div className="flex items-center justify-between px-6 lg:px-12 h-20 w-full">
          
          <div className="flex items-center gap-4 lg:gap-8">
            
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-50 transition-colors z-50"
            >
              <span className="w-5 h-0.5 bg-action-primary"></span>
              <span className="w-5 h-0.5 bg-action-primary"></span>
              <span className="w-5 h-0.5 bg-action-primary"></span>
            </button>

            <Link to="/" className="flex items-center z-50">
              <img 
                src="/images/ZedlancerLogo.svg" 
                alt="زدلنسر" 
                className="h-9 w-auto object-contain" 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">خانه</Link>
                  <Link to="/dashboard" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">داشبورد من</Link>
                  {isJobSeeker && (
                    <Link to="/jobs" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">فرصت‌های شغلی</Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">خانه</Link>
                  <Link to="/about" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">درباره ما</Link>
                  <Link to="/jobs" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">فرصت‌های شغلی</Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 lg:px-6 py-2 rounded-lg border border-action-primary text-action-primary text-label font-bold hover:bg-surface-hover transition-colors">ورود</Link>
                <Link to="/signup" className="px-4 lg:px-6 py-2 rounded-lg bg-action-primary text-white text-label font-bold hover:bg-action-hover transition-colors">ثبت نام</Link>
              </>
            ) : (
              <>
                <button className="relative h-10 w-10 lg:h-[52px] lg:w-[52px] flex items-center justify-center rounded-xl border border-border-decorative hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                  <span className="absolute top-2 right-2 lg:top-2.5 lg:right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="relative hidden lg:block">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 p-1.5 pl-3 rounded-xl border border-border-decorative hover:bg-gray-50 transition-colors h-[52px]">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-action-primary font-bold">{user?.fullName?.[0] || "ک"}</div>
                    <div className="flex flex-col items-start">
                      <span className="text-label font-bold text-text-primary leading-tight">{user?.fullName || "کاربر"}</span>
                      <span className="text-[11px] text-text-secondary leading-tight">{roleLabel}</span>
                    </div>
                    <svg className={`w-4 h-4 text-text-secondary transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-border-decorative rounded-xl shadow-lg py-2 z-50">
                      <Link to="/profile" className="block px-4 py-2 text-label text-text-primary hover:bg-gray-50">پروفایل من</Link>
                      <Link to="/settings" className="block px-4 py-2 text-label text-text-primary hover:bg-gray-50">تنظیمات</Link>
                      <hr className="my-1 border-border-decorative" />
                      <button className="w-full text-right px-4 py-2 text-label text-red-500 hover:bg-red-50">خروج</button>
                    </div>
                  )}
                </div>

                <div className="lg:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-action-primary font-bold">
                  {user?.fullName?.[0] || "ک"}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex" dir="rtl">
          <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-[280px] max-w-[85%] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-decorative">
              <Link to="/" className="flex items-center">
                <img src="/images/ZedlancerLogo.svg" alt="زدلنسر" className="h-7 w-auto object-contain" />
              </Link>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-text-secondary hover:text-text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="flex-1 py-4 px-3 flex flex-col gap-1">
              <SidebarItem icon={<HomeIcon />} label="خانه" active />
              <SidebarItem icon={<MegaphoneIcon />} label="آگهی‌ها" />
              <SidebarItem icon={<UsersIcon />} label="همکاری‌ها" />
              <SidebarItem icon={<MessageSquareIcon />} label="گفتگو" />
              <SidebarItem icon={<CalendarIcon />} label="تقویم" />
              <SidebarItem icon={<WalletIcon />} label="مالی" />
            </div>
            <div className="p-4 border-t border-border-decorative">
              <SidebarItem icon={<LifeBuoyIcon />} label="پشتیبانی" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${active ? 'bg-action-primary text-white' : 'text-[#315f86] hover:bg-gray-100'}`}>
      <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

const HomeIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const MegaphoneIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>;
const UsersIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const MessageSquareIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>;
const CalendarIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const WalletIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
const LifeBuoyIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;