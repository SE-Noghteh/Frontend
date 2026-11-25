
import { CheckCircle, AlertCircle } from "lucide-react";

interface AdPublishStepProps {
  fee: number;
  balance: number;
  error?: string;
}

export function AdPublishStep({
  fee,
  balance,
  error,
}: AdPublishStepProps) {
  const sufficient = balance >= fee;

  const formatMoney = (value: number) =>
    `${value.toLocaleString("fa-IR")} تومان`;

  return (
    <div className="flex flex-col gap-5">

      <h2 className="text-card-title font-bold">
        پرداخت و انتشار
      </h2>

      <div className="rounded-xl border border-border-soft bg-background-page p-4">

        <h3 className="mb-4 font-bold">
          هزینه انتشار آگهی
        </h3>

        <div className="flex flex-col gap-4 text-label">

          <div className="flex justify-between gap-3">
            <span>هزینه انتشار</span>
            <strong>{formatMoney(fee)}</strong>
          </div>

          <div className="flex justify-between gap-3">
            <span>موجودی کیف پول</span>
            <strong>{formatMoney(balance)}</strong>
          </div>

          <div className="flex justify-between gap-3 border-t border-border-soft pt-3">
            <span>موجودی پس از پرداخت</span>
            <strong>
              {sufficient
                ? formatMoney(balance - fee)
                : "—"}
            </strong>
          </div>

        </div>

      </div>

      <div
        role="status"
        className={`flex items-center gap-2 rounded-lg p-3 text-label ${
          sufficient
            ? "bg-success-soft text-success"
            : "bg-error-soft text-error"
        }`}
      >

        {sufficient ? (
          <CheckCircle size={18} />
        ) : (
          <AlertCircle size={18} />
        )}

        {sufficient
          ? "موجودی کیف پول برای انتشار آگهی کافی است."
          : "موجودی کیف پول کافی نیست."}

      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-error-soft p-3 text-label text-error"
        >
          {error}
        </p>
      )}

    </div>
  );
}
