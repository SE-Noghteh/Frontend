/**
 * General component test page (route: /components-test).
 * Pick a component from the tabs; the choice lives in the URL (`?c=sidebar`) so it can be shared.
 * Add new demos in `componentTests/registry.ts`. Not part of the product: remove the route before release.
 */

import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

import { COMPONENT_TESTS } from "@/pages/componentTests/registry";

export default function ComponentsTestPage() {
  const [params, setParams] = useSearchParams();
  const active = COMPONENT_TESTS.find((test) => test.key === params.get("c")) ?? COMPONENT_TESTS[0];
  const Demo = active.component;

  return (
    <div dir="rtl" className="min-h-screen bg-background-page">
      <nav
        aria-label="کامپوننت‌ها"
        className="sticky top-0 z-50 flex flex-wrap items-center gap-2 border-b border-green-8 bg-white px-4 py-3"
      >
        <span className="ms-1 text-label font-bold text-charcoal">تست کامپوننت‌ها</span>
        {COMPONENT_TESTS.map((test) => (
          <button
            key={test.key}
            type="button"
            aria-pressed={test.key === active.key}
            onClick={() => setParams({ c: test.key })}
            className={`rounded-[10px] px-4 py-2 text-label transition-colors ${
              test.key === active.key ? "bg-blue text-white" : "bg-green-8 text-charcoal-1 hover:bg-green-6"
            }`}
          >
            {test.title}
          </button>
        ))}
      </nav>

      <Suspense fallback={<p className="p-6 text-label text-charcoal-1">در حال بارگذاری…</p>}>
        <Demo />
      </Suspense>
    </div>
  );
}
