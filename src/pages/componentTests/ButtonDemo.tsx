/**
 * Button demo (shown inside the components test page).
 * Covers every variant × state, the color presets, sizes, loading, full width and a custom color.
 */

import { ChevronLeft, Plus } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";

import { Button, type ButtonColor, type ButtonVariant } from "@/components/ui/Button";

const COLORS: { key: ButtonColor; title: string }[] = [
  { key: "blue", title: "آبی · Blue" },
  { key: "ocean", title: "اقیانوسی · Ocean" },
  { key: "green", title: "سبز · Green" },
  { key: "peach", title: "هلویی · Peach" },
  { key: "error", title: "خطا · Error" },
];

const VARIANTS: { key: ButtonVariant; title: string; label: string }[] = [
  { key: "primary", title: "اصلی", label: "ثبت آگهی" },
  { key: "secondary", title: "ثانویه", label: "انصراف" },
  { key: "text", title: "متنی", label: "جزئیات بیشتر" },
];

function Cell({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-caption text-charcoal-2">{caption}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border-soft bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-card-title font-bold text-charcoal">{title}</h2>
      {children}
    </section>
  );
}

function VariantColumn({ variant, color }: { variant: (typeof VARIANTS)[number]; color: ButtonColor }) {
  const { key, title, label } = variant;
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl bg-background-page p-5">
      <h3 className="text-body font-bold text-charcoal">{title}</h3>
      <Cell caption="عادی">
        <Button variant={key} color={color}>{label}</Button>
      </Cell>
      <Cell caption="hover">
        <Button variant={key} color={color} data-state="hover">{label}</Button>
      </Cell>
      <Cell caption="فشرده">
        <Button variant={key} color={color} data-state="pressed">{label}</Button>
      </Cell>
      <Cell caption="غیرفعال">
        <Button variant={key} color={color} disabled>{label}</Button>
      </Cell>
      <Cell caption="با آیکون">
        <Button variant={key} color={color} endIcon={<Plus />}>{label}</Button>
      </Cell>
      <Cell caption="کوچک">
        <Button variant={key} color={color} size="sm">ادامه</Button>
      </Cell>
      <Cell caption="فقط آیکون">
        <Button variant={key} color={color} size="icon" aria-label="افزودن">
          <Plus />
        </Button>
      </Cell>
    </div>
  );
}

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div dir="rtl" className="mx-auto flex max-w-6xl flex-col gap-8 p-6">
      {COLORS.map(({ key, title }) => (
        <Section key={key} title={title}>
          <div className="grid gap-4 md:grid-cols-3">
            {VARIANTS.map((variant) => (
              <VariantColumn key={variant.key} variant={variant} color={key} />
            ))}
          </div>
        </Section>
      ))}

      <Section title="رنگ دلخواه (فقط با --btn-color)">
        <div className="flex flex-wrap items-center gap-4" style={{ "--btn-color": "#7c3aed" } as CSSProperties}>
          <Button>اصلی</Button>
          <Button variant="secondary">ثانویه</Button>
          <Button variant="text">متنی</Button>
          <Button disabled>غیرفعال</Button>
        </div>
      </Section>

      <Section title="روی پس‌زمینه تیره (tone=onDark)">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-blue p-6">
          <Button tone="onDark">اصلی</Button>
          <Button tone="onDark" variant="secondary">ثانویه</Button>
          <Button tone="onDark" variant="text">متنی</Button>
          <Button tone="onDark" disabled>غیرفعال</Button>
          <Button tone="onDark" variant="secondary" disabled>غیرفعال</Button>
        </div>
      </Section>

      <Section title="حالت لودینگ و عرض کامل (نمونه فرم ورود)">
        <form
          className="mx-auto flex max-w-sm flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <Button type="submit" fullWidth loading={loading}>ورود</Button>
          <Button variant="secondary" fullWidth endIcon={<ChevronLeft />}>ثبت‌نام</Button>
          <Button variant="text" fullWidth>فراموشی رمز عبور</Button>
        </form>
      </Section>

      <Section title="نمونه کاربرد: ردیف‌های لیست آگهی">
        <div className="flex flex-col gap-3">
          {[
            { text: "۳ جدید از ۱۲", action: "درخواست‌ها", variant: "primary" as const, size: "sm" as const },
            { text: "۵ درخواست", action: "همکار", variant: "secondary" as const, size: "sm" as const },
            { text: "هنوز درخواستی نیست", action: "انتشار دوباره", variant: "secondary" as const, size: "sm" as const },
          ].map((row) => (
            <div key={row.action} className="flex items-center justify-between rounded-2xl border border-border-soft p-4">
              <Button variant={row.variant} size={row.size}>{row.action}</Button>
              <span className="text-caption text-charcoal-1">{row.text}</span>
            </div>
          ))}
          <div>
            <Button endIcon={<Plus />}>آگهی جدید</Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
