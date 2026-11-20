import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { CollabActionConfig, CollabActionId } from "@/types/Seeker/collab";

interface CollabActionsCardProps {
  actions: CollabActionConfig[];
  onAction: (id: CollabActionId) => void;
}

/** Buttons of the collaboration (primary first on phones, side by side on desktop). */
export function CollabActionsCard({ actions, onAction }: CollabActionsCardProps) {
  if (actions.length === 0) return null;

  return (
    <section
      aria-label="اقدام‌های همکاری"
      className="flex flex-col gap-2.5 rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:flex-row-reverse md:justify-end md:p-5"
    >
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant}
          className="md:min-w-36"
          startIcon={action.id === "requestContractEdit" ? <Pencil size={14} aria-hidden="true" /> : undefined}
          onClick={() => onAction(action.id)}
        >
          {action.label}
        </Button>
      ))}
    </section>
  );
}
