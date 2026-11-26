import { File, Paperclip } from "lucide-react";

import { SectionCard } from "@/components/ui/SectionCard";
import type { SeekerAdFile } from "@/types/Seeker/seeker";

interface AdFilesCardProps {
  files?: SeekerAdFile[];
}

export function AdFilesCard({ files }: AdFilesCardProps) {
  return (
    <SectionCard title="فایل‌های پیوست" icon={<Paperclip size={15} aria-hidden="true" />}>
      {files === undefined ? (
        <p className="text-caption leading-7 text-text-secondary">
          اطلاعات فایل‌های پیوست برای این آگهی در داده‌های فعلی موجود نیست.
        </p>
      ) : files.length === 0 ? (
        <p className="text-caption leading-7 text-text-secondary">
          فایلی برای این آگهی پیوست نشده است.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center justify-between gap-3 rounded-xl bg-background-page px-3 py-2.5"
            >
              <div className="min-w-0 text-start">
                <p dir="ltr" className="truncate text-start text-label font-bold text-text-primary">
                  {file.name}
                </p>
                <p className="text-caption text-text-secondary">{file.meta}</p>
              </div>
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-info-soft text-info">
                <File size={15} aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
