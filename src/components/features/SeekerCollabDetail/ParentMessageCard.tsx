import { MessageSquare, Pencil } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";

interface ParentMessageCardProps {
  message: string;
  onEdit: () => void;
  onCancel: () => void;
}

/** The parent's reason for rejecting the terms, with the two ways forward. */
export function ParentMessageCard({ message, onEdit, onCancel }: ParentMessageCardProps) {
  return (
    <SectionCard title="پیام والد" icon={<MessageSquare size={15} aria-hidden="true" />}>
      <p className="text-label leading-8 text-text-primary">«{message}»</p>
      <div className="mt-4 flex flex-col items-stretch gap-2 md:flex-row-reverse md:items-center md:justify-end">
        <Button startIcon={<Pencil size={14} aria-hidden="true" />} onClick={onEdit}>
          درخواست ویرایش قرارداد
        </Button>
        <Button variant="text" size="sm" onClick={onCancel}>
          انصراف از همکاری
        </Button>
      </div>
    </SectionCard>
  );
}
