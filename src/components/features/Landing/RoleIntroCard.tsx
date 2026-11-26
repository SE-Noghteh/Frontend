import { ROLE_STYLES } from "@/constants/roles";
import type { RoleGuideContent, UserRole } from "@/types/Landing/landing";

import { RoleScene } from "./RoleScene";

interface RoleIntroCardProps {
  role: UserRole;
  guide: RoleGuideContent;
}

/** Tinted card with the role's headline and illustration. */
export function RoleIntroCard({ role, guide }: RoleIntroCardProps) {
  const style = ROLE_STYLES[role];

  return (
    <div className={`relative overflow-hidden rounded-[28px] p-7 ${style.soft}`}>
      <div className="relative z-10 max-w-[260px]">
        <div className={`text-caption font-bold ${style.text}`}>{guide.title}</div>
        <p className="mt-2 text-card-title font-extrabold leading-8 text-text-primary">{guide.lead}</p>
      </div>
      <RoleScene
        role={role}
        className="absolute -bottom-6 end-[-30px] w-[250px] opacity-95"
      />
      <div className="h-[130px]" />
    </div>
  );
}
