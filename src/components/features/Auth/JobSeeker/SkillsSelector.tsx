import { useState, useRef, useEffect } from "react";
import type { Skill } from "@/types/Auth/register";

interface SkillsSelectorProps {
  value: Skill[];
  onChange: (skills: Skill[]) => void;
  error?: string;
}

const MOCK_SKILLS: Skill[] = [
  { id: "1", title: "طراحی گرافیک", category: "" }, 
  { id: "2", title: "طراحی رابط کاربری", category: "طراحی تجربه‌های دیجیتال" },
  { id: "3", title: "طراحی محصول", category: "ایده‌پردازی و حل مسئله" },
  { id: "4", title: "طراحی صنعتی", category: "به‌زودی؛ فعلاً قابل انتخاب نیست" },
  { id: "5", title: "برنامه‌نویسی", category: "توسعه نرم‌افزار" },
];

export function SkillsSelector({ value, onChange, error }: SkillsSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSkills = MOCK_SKILLS.filter(
    (skill) => skill.title.includes(searchTerm) && !value.some((v) => v.id === skill.id)
  );

  const handleSelect = (skill: Skill) => {
    if (skill.category.includes("به‌زودی")) return; 
    onChange([...value, skill]);
    setSearchTerm("");
  };

  const handleRemove = (skillId: string) => {
    onChange(value.filter((s) => s.id !== skillId));
  };

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={wrapperRef} dir="rtl">
      <label className="text-label text-text-primary font-medium text-right">
        علاقه‌مندی‌ها <span className="text-status-error">*</span>
      </label>



      {/* search box*/}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="جست‌وجوی مهارت یا حوزه"
          className={`w-full rounded-md border px-3 py-2 pl-10 text-body text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors bg-surface-card ${
            error ? "border-status-error" : "border-border-decorative"
          }`}
        />
        {/* Magnifying glass icon*/}
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {error && <p className="text-caption text-status-error text-right">{error}</p>}
      <p className="text-caption text-text-secondary text-right">می‌توانی چند حوزه را انتخاب کنی.</p>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start">
          {value.map((skill) => (
            <div key={skill.id} className="flex items-center gap-1.5 bg-brand-peach-soft text-text-primary px-3 py-1 rounded-md text-label">
              <button type="button" onClick={() => handleRemove(skill.id)} className="text-text-secondary hover:text-status-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <span>{skill.title}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-caption text-text-secondary text-right mt-1">
        اگر نتیجه‌ای پیدا نشد، عبارت کوتاه‌تر یا حوزه دیگری را جست‌وجو کن؛ انتخاب‌های قبلی‌ات باقی می‌مانند.
      </p>

      {/*Results drop-down list*/}
      {isOpen && (
        <div className="w-full mt-2 bg-surface-card border border-border-decorative rounded-md shadow-sm overflow-hidden">
          {filteredSkills.length > 0 ? (
            <div className="flex flex-col max-h-60 overflow-y-auto">
              {filteredSkills.map((skill) => {
                const isDisabled = skill.category.includes("به‌زودی");
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleSelect(skill)}
                    disabled={isDisabled}
                    className={`flex flex-col items-start px-4 py-2 text-right w-full transition-colors ${
                      isDisabled ? "opacity-50 cursor-not-allowed bg-surface-disabled/50" : "hover:bg-surface-hover"
                    }`}
                  >
                    <span className="text-label font-medium text-text-primary">{skill.title}</span>
                    <span className="text-caption text-text-secondary mt-0.5">{skill.category}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-caption text-text-secondary">
              موردی یافت نشد.
            </div>
          )}
        </div>
      )}

    </div>
  );
}