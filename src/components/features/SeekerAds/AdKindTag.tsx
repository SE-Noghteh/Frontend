import { BookOpen, Briefcase } from "lucide-react";

import { StatusChip } from "@/components/ui/StatusChip";
import type { SeekerAdKind } from "@/types/Seeker/seeker";

interface AdKindTagProps {
  kind: SeekerAdKind;
}

/** "کاری" (blue) or "کارآموزی" (pink). */
export function AdKindTag({ kind }: AdKindTagProps) {
  return kind === "work" ? (
    <StatusChip tone="info" icon={<Briefcase size={12} aria-hidden="true" />}>
      کاری
    </StatusChip>
  ) : (
    <StatusChip tone="error" icon={<BookOpen size={12} aria-hidden="true" />}>
      کارآموزی
    </StatusChip>
  );
}
