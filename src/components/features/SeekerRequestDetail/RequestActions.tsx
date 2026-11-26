import { Pencil } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/Button";
import type { SeekerRequest } from "@/types/Seeker/seeker";

interface RequestActionsProps {
  request: SeekerRequest;
  onEdit: () => void;
  onCancel: () => void;
}

/** Buttons under the side cards. Which ones appear depends on the employer's decision. */
export function RequestActions({ request, onEdit, onCancel }: RequestActionsProps) {
  const { employerStatus } = request;

  let content;
  if (employerStatus === "accepted") {
    content = (
      <ButtonLink to={request.collabId ? `/seeker/collabs/${request.collabId}` : "/seeker/collabs"} fullWidth>
        مشاهده همکاری
      </ButtonLink>
    );
  } else if (employerStatus === "rejectedByEmployer") {
    content = (
      <ButtonLink to="/seeker/ads" fullWidth>
        آگهی‌های مشابه
      </ButtonLink>
    );
  } else {
    content = (
      <>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<Pencil size={14} aria-hidden="true" />}
          onClick={onEdit}
        >
          ویرایش درخواست
        </Button>
        <Button color="error" fullWidth onClick={onCancel}>
          انصراف از درخواست
        </Button>
      </>
    );
  }

  return (
    <section
      aria-label="اقدام‌های درخواست"
      className="flex flex-col gap-2.5 rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:p-5"
    >
      {content}
    </section>
  );
}
