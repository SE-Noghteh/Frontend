
import {
  History,
  FileText,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

export interface AdVersion {
  id: string;
  version: number;
  date: string;
  description: string;
  changes: string[];
  isCurrent: boolean;
}

interface AdVersionsProps {
  versions: AdVersion[];
  onViewVersion: (id: string) => void;
}

export function AdVersions({
  versions,
  onViewVersion,
}: AdVersionsProps) {
  return (
    <section
      dir="rtl"
      className="flex min-w-0 flex-col gap-4 rounded-xl border border-border-soft bg-white p-4 sm:p-6"
    >

      <div className="flex items-center gap-2">

        <History size={20} className="text-blue" />

        <h2 className="text-card-title font-bold">
          تاریخچه نسخه‌های آگهی
        </h2>

      </div>

      {versions.length === 0 ? (

        <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-center">

          <div className="flex size-16 items-center justify-center rounded-full bg-green-7">

            <FileText
              size={28}
              className="text-blue"
            />

          </div>

          <h3 className="font-bold">
            تاریخچه‌ای ثبت نشده است
          </h3>

          <p className="text-label text-text-secondary">
            تغییرات آگهی در این بخش نمایش داده می‌شوند.
          </p>

        </div>

      ) : (

        <div className="flex flex-col gap-4">

          {versions.map((version) => (

            <article
              key={version.id}
              className="rounded-xl border border-border-soft p-4"
            >

              <div className="flex flex-wrap items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <FileText
                    size={18}
                    className="text-blue"
                  />

                  <h3 className="font-bold">
                    نسخه{" "}
                    {version.version.toLocaleString("fa-IR")}
                  </h3>

                  {version.isCurrent && (

                    <span className="rounded-lg bg-green-7 px-2 py-1 text-caption">
                      نسخه فعلی
                    </span>

                  )}

                </div>

                <span className="flex items-center gap-1.5 text-caption text-text-secondary">

                  <Clock3 size={14} />

                  {version.date}

                </span>

              </div>

              <p className="mt-3 break-words text-label leading-7">
                {version.description}
              </p>

              {version.changes.length > 0 && (

                <ul className="mt-3 list-disc space-y-2 ps-5 text-caption text-text-secondary">

                  {version.changes.map((change, index) => (

                    <li key={`${index}-${change}`}>
                      {change}
                    </li>

                  ))}

                </ul>

              )}

              <div className="mt-4 flex justify-end">

                <Button
                  variant="text"
                  size="sm"
                  onClick={() =>
                    onViewVersion(version.id)
                  }
                >
                  مشاهده نسخه
                </Button>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>
  );
}
