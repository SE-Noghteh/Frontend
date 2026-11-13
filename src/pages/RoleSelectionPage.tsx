import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

interface RoleSelectionPageProps {
  mode: "login" | "signup";
}

export function RoleSelectionPage({ mode }: RoleSelectionPageProps) {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  const title = isLogin ? "ورود به عنوان" : "ثبت نام به عنوان";

  const handleRoleClick = (role: "jobseeker" | "employer" | "parent") => {
    if (role === "jobseeker") {
      navigate("/jobseekerlogin", { state: { tab: isLogin ? "login" : "signup" } });
    } else if (role === "employer") {
      navigate("/employerlogin", { state: { tab: isLogin ? "login" : "signup" } });
    } else if (role === "parent") {
      alert("صفحه والد به زودی...");
    }
  };

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md flex flex-col gap-6">
        <h1 className="text-center font-bold mb-4" style={{ fontFamily: "Vazirmatn", fontSize: "28px", color: "#262321" }}>
          {title}
        </h1>
        <Button onClick={() => handleRoleClick("jobseeker")} className="w-full bg-action-primary hover:bg-action-hover text-white py-4 rounded-xl font-bold text-lg transition-colors">
          کارجو
        </Button>
        <Button onClick={() => handleRoleClick("parent")} className="w-full bg-action-primary hover:bg-action-hover text-white py-4 rounded-xl font-bold text-lg transition-colors">
          والد
        </Button>
        <Button onClick={() => handleRoleClick("employer")} className="w-full bg-action-primary hover:bg-action-hover text-white py-4 rounded-xl font-bold text-lg transition-colors">
          کارفرما
        </Button>
      </div>
    </div>
  );
}