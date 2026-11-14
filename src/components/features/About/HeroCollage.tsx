/** Decorative stack of mini cards showing what each side of Zedlancer sees. */
export function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[21rem] w-full max-w-sm origin-top scale-90 select-none md:h-[25rem] md:scale-100"
    >
      <div className="absolute inset-x-6 top-6 bottom-6 rounded-[2rem] border border-white/15 bg-white/5" />

      <div
        style={{ animationDelay: "0s" }}
        className="animate-float-soft absolute start-0 top-0 w-60 -rotate-3 rounded-2xl bg-white p-4 text-text-primary shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-ocean-8 px-2.5 py-0.5 text-caption font-medium text-ocean-3">
            آگهی کارفرما
          </span>
          <span className="text-caption text-text-secondary">۳ روز مهلت</span>
        </div>
        <p className="mt-3 text-label font-bold">طراحی ۵ پوستر تبلیغاتی</p>
        <p className="mt-1 text-caption leading-6 text-text-secondary">
          برای فروشگاه اینترنتی؛ فایل نهایی در دو سایز.
        </p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-md bg-background-page px-2 py-0.5 text-caption ring-1 ring-border-decorative">
            آنلاین
          </span>
          <span className="rounded-md bg-background-page px-2 py-0.5 text-caption ring-1 ring-border-decorative">
            گرافیک
          </span>
        </div>
      </div>

      <div
        style={{ animationDelay: "1.2s" }}
        className="animate-float-soft absolute end-0 top-28 w-64 rotate-2 rounded-2xl bg-brand-peach-soft p-4 text-text-primary shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent-default text-card-title font-bold text-charcoal">
            ن
          </span>
          <div>
            <p className="text-label font-bold">پاسپورت مهارتی</p>
            <p className="text-caption text-text-secondary">۲ همکاری موفق</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1 flex justify-between text-caption">
              <span>طراحی گرافیک</span>
              <span className="text-text-secondary">تأییدشده</span>
            </div>
            <div className="h-1.5 rounded-full bg-white">
              <div className="h-full w-4/5 rounded-full bg-blue" />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-caption">
              <span>ویرایش ویدئو</span>
              <span className="text-text-secondary">در حال رشد</span>
            </div>
            <div className="h-1.5 rounded-full bg-white">
              <div className="h-full w-2/5 rounded-full bg-ocean-blue" />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ animationDelay: "2.4s" }}
        className="animate-float-soft absolute start-6 bottom-0 flex w-56 -rotate-1 items-center gap-3 rounded-2xl bg-green-7 p-4 text-text-primary shadow-2xl"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green text-label font-bold text-charcoal">
          ✓
        </span>
        <div>
          <p className="text-label font-bold">رضایت والد ثبت شد</p>
          <p className="text-caption text-text-secondary">پروژه آماده‌ی شروع است</p>
        </div>
      </div>
    </div>
  );
}
