import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer dir="rtl" className="bg-blue text-white pt-5 pb-3 md:pt-6 md:pb-3 px-6 md:px-20 border-t border-blue-5 text-right">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 lg:gap-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          
          <div className="flex flex-col gap-2 lg:gap-4 order-1 lg:order-1">
            <div className="flex flex-col gap-1 items-start">
              <img 
                src="/images/ZedlancerLogo.svg" 
                alt="لوگوی زدلنسر" 
                className="h-8 lg:h-10 w-auto object-contain brightness-0 invert" 
              />
              <span className="text-caption text-ocean-6">فرصت تجربه، مسیر رشد</span>
            </div>

            <p className="text-label md:text-body text-ocean-7 leading-relaxed max-w-[95%] md:max-w-md">
              <span className="block lg:hidden">
                زدلنسر؛ بستری برای فرصت‌های کاری و کارآموزی
              </span>
              <span className="hidden lg:block">
                زدلنسر؛ بستری برای کشف فرصت‌های کاری و کارآموزی، تجربه همکاری امن و ساختن سابقه مهارتی واقعی برای جوانان.
              </span>
            </p>

            <div className="hidden lg:flex border border-ocean-4 rounded-lg p-2.5 items-center justify-start gap-3 w-full max-w-sm mt-1">
              <svg className="shrink-0 text-brand-peach" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-caption md:text-label text-white">تجربه‌ی مسئولانه، با توجه به ایمنی کاربران</span>
            </div>
          </div>


          <div className="lg:hidden w-full flex flex-col order-2 mt-0.5">
            <div className="h-px w-full bg-ocean-4/40 mb-3"></div>
            
            <h3 className="text-card-title font-bold mb-3">دسترسی‌های مهم</h3>
            
            {/* Mobile columns */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-label text-ocean-7">
              <ul className="flex flex-col gap-2 items-start">
                <li><Link to="/login" className="hover:text-white transition-colors">ورود / ثبت‌نام</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">نحوه کار با زدلنسر</Link></li>
                <li><Link to="/start-guide" className="hover:text-white transition-colors">راهنمای شروع</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">سؤال‌های پرتکرار</Link></li>
              </ul>
              <ul className="flex flex-col gap-2 items-start">
                <li><Link to="/about" className="hover:text-white transition-colors">درباره زدلنسر</Link></li>
                <li><Link to="/parent-guide" className="hover:text-white transition-colors">راهنمای والدین</Link></li>
                <li><Link to="/rules" className="hover:text-white transition-colors">قوانین و مقررات</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors">گزارش مشکل و تخلف</Link></li>
              </ul>
            </div>
            
            <div className="h-px w-full bg-ocean-4/40 mt-3"></div>
          </div>

          {/* Desktop columns */}
          {/* Second column */}
          <div className="hidden lg:flex flex-col gap-4 order-2 lg:order-2 items-center pt-2 lg:pt-0">
            <h3 className="text-card-title font-bold relative inline-block w-fit">
              شروع همکاری
              <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-brand-peach"></span>
            </h3>
            <ul className="flex flex-col gap-2 text-label text-ocean-7 items-center mt-1">
              <li><Link to="/login" className="hover:text-white transition-colors">ورود / ثبت‌نام</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">نحوه کار با زدلنسر</Link></li>
              <li><Link to="/start-guide" className="hover:text-white transition-colors">راهنمای شروع</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">سؤال‌های پرتکرار</Link></li>
            </ul>
          </div>

          {/* Third column*/}
          <div className="hidden lg:flex flex-col gap-4 order-3 lg:order-3 items-center pt-2 lg:pt-0">
            <h3 className="text-card-title font-bold relative inline-block w-fit">
              راهنما و اعتماد
              <span className="absolute -bottom-2 right-0 w-8 h-0.5 bg-brand-peach"></span>
            </h3>
            <ul className="flex flex-col gap-2 text-label text-ocean-7 items-center mt-1">
              <li><Link to="/about" className="hover:text-white transition-colors">درباره زدلنسر</Link></li>
              <li><Link to="/parent-guide" className="hover:text-white transition-colors">راهنمای والدین</Link></li>
              <li><Link to="/rules" className="hover:text-white transition-colors">قوانین و مقررات</Link></li>
              <li><Link to="/report" className="hover:text-white transition-colors">گزارش مشکل و تخلف</Link></li>
            </ul>
          </div>

        </div>

        {/* Separator line*/}
        <div className="hidden lg:flex h-px w-full bg-ocean-4/40 mt-1 lg:mt-0.1"></div>


        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-2 lg:gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-caption text-ocean-6 whitespace-nowrap">
            <span>© ۲۰۲۶ زدلنسر</span>
            <span className="hidden md:inline">•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">حریم خصوصی</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">شرایط استفاده</Link>
            <span>•</span>
            <Link to="/support" className="hover:text-white transition-colors">پشتیبانی</Link>
          </div>

          <div className="hidden lg:block text-caption tracking-[0.2em] font-medium text-ocean-6 whitespace-nowrap" dir="ltr">
            ZEDLANCER • LEARN • WORK • GROW
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;