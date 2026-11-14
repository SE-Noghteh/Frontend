import { MessageSquare, Send } from "lucide-react";

import { ROLE_STYLES } from "@/constants/roles";

import { PreviewCard } from "./PreviewCard";
import { PreviewIconTile } from "./PreviewIconTile";

export function ChatPreview() {
  return (
    <PreviewCard className="p-4">
      <div className="flex items-center gap-2 text-caption font-bold text-text-primary">
        <PreviewIconTile role="employer">
          <MessageSquare />
        </PreviewIconTile>
        گفتگوی پروژه
      </div>
      <div className="mt-3 space-y-2 text-caption leading-6">
        <div
          className={`max-w-[82%] rounded-2xl rounded-es-md px-3 py-2 text-text-primary ${ROLE_STYLES.employer.soft}`}
        >
          پست دوم رو یه‌کم روشن‌تر می‌کنی؟
        </div>
        <div
          className={`ms-auto max-w-[82%] rounded-2xl rounded-ee-md px-3 py-2 text-text-primary ${ROLE_STYLES.seeker.soft}`}
        >
          حتماً، تا فردا نسخه جدید رو می‌ذارم.
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border-decorative px-3 py-2 text-caption text-charcoal-2">
        <span className="flex-1">پیام بنویس…</span>
        <Send className="size-4 text-blue" />
      </div>
    </PreviewCard>
  );
}
