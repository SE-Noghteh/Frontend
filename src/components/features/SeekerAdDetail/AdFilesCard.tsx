import { ExternalLink, File, Paperclip } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerAdFile } from "@/types/Seeker/seeker";

interface AdFilesCardProps {
  files?: SeekerAdFile[];
}

export function AdFilesCard({
  files,
}: AdFilesCardProps) {
  return (
    <SectionCard
      title="فایل‌های پیوست"
      icon={<Paperclip size={15} aria-hidden="true" />}
    >
      {files === undefined ? (
        <p className="text-caption leading-7 text-text-secondary">
          اطلاعات فایل‌های پیوست برای این آگهی موجود نیست.
        </p>
      ) : files.length === 0 ? (
        <p className="text-caption leading-7 text-text-secondary">
          فایلی برای این آگهی پیوست نشده است.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {files.map((file) => {
            const content = (
              <>
                <div className="min-w-0 text-start">
                  <p
                    dir="ltr"
                    className="truncate text-start text-label font-bold text-text-primary"
                  >
                    {file.name}
                  </p>
                  <p className="text-caption text-text-secondary">
                    {file.meta}
                  </p>
                </div>

                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-info-soft text-info">
                  {file.url ? (
                    <ExternalLink
                      size={15}
                      aria-hidden="true"
                    />
                  ) : (
                    <File
                      size={15}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </>
            );

            return (
              <li key={`${file.name}-${file.url ?? file.meta}`}>
                {file.url ? (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl bg-background-page px-3 py-2.5 transition hover:bg-surface-info"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-background-page px-3 py-2.5">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}
