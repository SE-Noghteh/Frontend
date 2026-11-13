import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  //const { isAuthenticated, user } = useAuth();
  const isAuthenticated = false; // ← برای تست حالت مهمان، فعلاً false
  const user = { fullName: "نگار محمدی", role: "jobseeker" as "jobseeker" | "employer" | "parent" };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isJobSeeker = user?.role === "jobseeker";
  const roleLabel = 
    user?.role === "jobseeker" ? "متقاضی فرصت" : 
    user?.role === "employer" ? "کارفرما" : 
    user?.role === "parent" ? "والد" : "کاربر";

  return (
    <header className="w-full bg-white border-b border-border-decorative relative">
      <div className="flex items-center justify-between px-6 lg:px-12 h-20 w-full">
        
        {/* سمت راست: لوگو و منوها (دسکتاپ) */}
        <div className="flex items-center gap-10">
          
          {/* لوگو */}
          <Link to="/" className="flex flex-col items-center gap-1">
            <img 
              src="@/../public/images/ZedlancerLogo.svg" 
              alt="زدلنسر" 
              className="h-8 w-auto object-contain" 
            />
            <span className="text-[11px] font-bold text-action-primary mt-1">فرصت تجربه، مسیر رشد</span>
          </Link>

          {/* لینک‌های اصلی: آبی کمرنگ (ocean-blue) - فقط دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-8 mt-2">
            <Link to="/" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">خانه</Link>
            <Link to="/dashboard" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">داشبورد من</Link>
            {isJobSeeker && (
              <Link to="/jobs" className="text-label font-medium text-[#457b9d] hover:text-action-primary transition-colors">فرصت‌های شغلی</Link>
            )}
          </nav>
        </div>

        {/* سمت چپ: دکمه‌ها یا پروفایل (دسکتاپ) */}
        <div className="hidden lg:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-6 py-2 rounded-lg border border-action-primary text-action-primary text-label font-bold hover:bg-surface-hover transition-colors">ورود</Link>
              <Link to="/signup" className="px-6 py-2 rounded-lg bg-action-primary text-white text-label font-bold hover:bg-action-hover transition-colors">ثبت نام</Link>
            </>
          ) : (
            <>
              <button className="relative h-[52px] w-[52px] flex items-center justify-center rounded-xl border border-border-decorative hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              <div className="relative">
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
            </>
          )}
        </div>

        {/* بخش موبایل (فقط در موبایل دیده می‌شه) */}
        <div className="flex lg:hidden items-center gap-3">
          
          {/* دکمه‌های ورود و ثبت‌نام در موبایل (فقط وقتی لاگین نیست) */}
          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 rounded-lg border border-action-primary text-action-primary text-[12px] font-bold hover:bg-surface-hover transition-colors">
                ورود
              </Link>
              <Link to="/signup" className="px-3 py-1.5 rounded-lg bg-action-primary text-white text-[12px] font-bold hover:bg-action-hover transition-colors">
                ثبت نام
              </Link>
            </div>
          )}

          {/* زنگوله در موبایل (فقط وقتی لاگین هست) */}
          {isAuthenticated && (
            <button className="relative h-10 w-10 flex items-center justify-center rounded-lg border border-border-decorative hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
          )}

          {/* آواتار در موبایل (فقط وقتی لاگین هست) */}
          {isAuthenticated && (
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-action-primary font-bold">
              {user?.fullName?.[0] || "ک"}
            </div>
          )}
          
          {/* دکمه همبرگری سرمه‌ای */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border-decorative"
          >
            <span className="w-5 h-0.5 bg-action-primary"></span>
            <span className="w-5 h-0.5 bg-action-primary"></span>
            <span className="w-5 h-0.5 bg-action-primary"></span>
          </button>
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-border-decorative shadow-lg lg:hidden z-50 flex flex-col">
          <div className="flex items-center justify-around py-4 border-b border-border-decorative">
            <Link to="/dashboard" className="flex flex-col items-center gap-1 text-text-secondary hover:text-action-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              <span className="text-[11px] font-medium">داشبورد</span>
            </Link>
            <Link to="/jobs" className="flex flex-col items-center gap-1 text-text-secondary hover:text-action-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="text-[11px] font-medium">فرصت‌ها</span>
            </Link>
            <Link to="/" className="flex flex-col items-center gap-1 text-text-secondary hover:text-action-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className="text-[11px] font-medium">خانه</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center gap-1 text-text-secondary hover:text-action-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span className="text-[11px] font-medium">پیام‌ها</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center gap-1 text-text-secondary hover:text-action-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="text-[11px] font-medium">پروفایل</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}