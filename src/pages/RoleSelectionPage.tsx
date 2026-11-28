import { useNavigate } from "react-router-dom";

interface RoleSelectionPageProps {
  mode: "login" | "signup";
}

export function RoleSelectionPage({ mode }: RoleSelectionPageProps) {
  const navigate = useNavigate();

  const roles = [
    {
      id: "jobseeker",
      title: "کارجو",
      description: mode === "login" ? "ورود به حساب کارجو" : "ثبت‌نام به عنوان کارجو",
      gradient: "from-[#f2c9d1]/80 to-white",
      link: "/jobseekerlogin",
    },
    {
      id: "employer",
      title: "کارفرما",
      description: mode === "login" ? "ورود به حساب کارفرما" : "ثبت‌نام به عنوان کارفرما",
      gradient: "from-[#4b7a95]/80 to-white",
      link: "/employerlogin",
    },
    {
      id: "parent",
      title: "والد",
      description: mode === "login" ? "ورود به حساب والد" : "ثبت‌نام به عنوان والد یا سرپرست",
      gradient: "from-[#a8c48f]/80 to-white",
      link: "/parentlogin",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-vazirmatn" dir="rtl">
      
      <div className="flex-1 flex flex-col items-center pt-12 md:pt-20 pb-12 px-4 relative">
        
        {/* دکمه برگشت (سمت راست بالا) */}
        <button 
          onClick={() => navigate("/")}
          className="absolute top-4 md:top-8 right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* هدر */}
        <h1 className="text-[18px] md:text-[20px] font-bold text-[#262321] mb-8 md:mb-12 text-center mt-4">
          {mode === "login" ? "ورود به عنوان" : "ثبت‌نام به عنوان"}
        </h1>

        {/* کارت‌ها */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-5xl">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => navigate(role.link)}
              className="group relative w-full md:w-[280px] h-[100px] md:h-[320px] rounded-[16px] md:rounded-[24px] cursor-pointer overflow-hidden shadow-sm border border-gray-100 bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl"
            >
              {/* گرادیان */}
              <div className={`absolute inset-0 bg-gradient-to-l md:bg-gradient-to-t ${role.gradient} z-0`}></div>

              {/* دکمه فلش (حالا دقیقاً چسبیده به پایین و سمت چپ در هر دو حالت) */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#1d3557]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </div>

              {/* متن‌ها (در دسکتاپ راست پایین، در موبایل راست وسط) */}
              <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-7 text-right z-10">
                <h2 className="text-base md:text-lg font-bold text-[#1d3557] mb-0.5 md:mb-1">{role.title}</h2>
                <p className="text-[11px] md:text-xs text-[#315f86] font-medium">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}