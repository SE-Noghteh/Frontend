import { RequestStatusChip } from "@/components/features/SeekerRequests/RequestStatusChips";
import { ButtonLink } from "@/components/ui/Button";
import type { SeekerRequest } from "@/types/Seeker/seeker";
import { formatJalaliDate } from "@/utils/formatToman";

interface RequestListItemProps {
  request: SeekerRequest;
}

export function RequestListItem({ request }: RequestListItemProps) {
  return (
    <article className="rounded-2xl border border-border-soft bg-white p-4 shadow-[0_2px_10px_rgba(38,35,33,0.04)] md:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-body leading-7 font-bold text-text-primary md:text-card-title">{request.title}</h3>
          <p className="mt-0.5 text-caption text-text-secondary">
            {request.employerName} · ارسال {formatJalaliDate(request.sentAt)}
          </p>
        </div>
        <RequestStatusChip status={request.employerStatus} />
      </div>

      <div className="mt-3 flex justify-end">
        <ButtonLink to={`/seeker/requests/${request.id}`} variant="secondary" size="sm" className="min-w-28">
          مشاهده
        </ButtonLink>
      </div>
    </article>
  );
}
