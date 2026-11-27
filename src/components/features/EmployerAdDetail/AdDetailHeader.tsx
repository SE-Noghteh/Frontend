import { BriefcaseBusiness, GraduationCap, ChevronLeft } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { EmployerAdStatus } from "@/components/features/EmployerAds/EmployerAdStatus";
import type { EmployerAdStatus as AdStatus } from "@/types/Employer/employer";
export type AdDetailTab = "overview" | "applicants" | "versions";
interface AdDetailHeaderProps {
  title: string;
  kind: "work" | "internship";
  status: AdStatus;
  activeTab: AdDetailTab;
  onTabChange: (tab: AdDetailTab) => void;
  onBack: () => void;
  onEdit: () => void;
  onClose: () => void;
  republishTo: string;
  collaborationTo: string;
}
const TABS: { id: AdDetailTab; label: string }[] = [
  { id: "overview", label: "نمای کلی" }, { id: "applicants", label: "متقاضیان" }, { id: "versions", label: "نسخه‌ها" },
];
export function AdDetailHeader({ title, kind, status, activeTab, onTabChange, onBack, onEdit, onClose, republishTo, collaborationTo }: AdDetailHeaderProps) {
  const isInternship = kind === "internship";
  return (
    <header dir="rtl" className="flex min-w-0 flex-col gap-6">
      <nav aria-label="مسیر صفحه" className="flex items-center gap-2 text-caption text-text-secondary">
        <button type="button" onClick={onBack} className="hover:text-blue">آگهی‌ها</button>
        <ChevronLeft size={14} /><span className="truncate">{title}</span>
      </nav>
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <EmployerAdStatus status={status} />
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-ocean-8 px-3 py-1.5 text-caption text-ocean-3">
              {isInternship ? <GraduationCap size={15} /> : <BriefcaseBusiness size={15} />}
              {isInternship ? "کارآموزی" : "کاری"}
            </span>
          </div>
          <h1 className="break-words text-xl font-bold text-text-primary sm:text-2xl">{title}</h1>
        </div>
        <div className={cn("grid gap-3 lg:flex", status === "published" ? "grid-cols-2" : "grid-cols-1")}>
          {status === "published" && <>
            <Button variant="secondary" className="min-w-0 lg:min-w-36" onClick={onEdit}>ویرایش آگهی</Button>
            <Button color="error" variant="secondary" className="min-w-0 lg:min-w-36" onClick={onClose}>بستن آگهی</Button>
          </>}
          {status === "collaboration" && <ButtonLink to={collaborationTo}>مشاهده همکاری</ButtonLink>}
          {(status === "expired" || status === "closed") && <ButtonLink to={republishTo}>انتشار دوباره</ButtonLink>}
        </div>
      </div>
      <nav aria-label="بخش‌های آگهی" className="flex flex-wrap items-center gap-1.5">
        {TABS.map(tab => <button key={tab.id} type="button" aria-current={activeTab === tab.id ? "page" : undefined} onClick={() => onTabChange(tab.id)} className={cn("min-h-11 rounded-xl border px-4 py-2.5 text-label font-medium transition-colors", activeTab === tab.id ? "border-blue bg-blue text-white" : "border-border-soft bg-white text-text-primary hover:bg-green-7")}>{tab.label}</button>)}
      </nav>
    </header>
  );
}
