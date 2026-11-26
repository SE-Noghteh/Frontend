import { Check } from "lucide-react";

import type { SeekerParent } from "@/types/Seeker/seeker";

interface SeekerParentFooterProps {
  parent: SeekerParent;
}

/** Card pinned to the bottom of the sidebar: the parent who approves the final contract when required. */
export function SeekerParentFooter({ parent }: SeekerParentFooterProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-peach-soft p-3 text-start">
      <span aria-hidden="true" className="absolute -top-4 -start-4 size-14 rounded-full bg-accent-default/35" />
      <p className="relative flex items-center gap-1.5 text-label font-bold text-text-primary">
        <Check size={14} aria-hidden="true" className="text-success" />
        والد تأییدکننده قرارداد
      </p>
      <p className="relative mt-1 text-caption text-text-secondary">
        {parent.name} · {parent.relation}
      </p>
    </div>
  );
}
