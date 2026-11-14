import * as Accordion from "@radix-ui/react-accordion";
import { Check, Plus } from "lucide-react";

import type { FaqItem } from "@/types/Faq/faq";

interface FaqAccordionProps {
  items: FaqItem[];
}

/** Single-open accordion of questions; a divider line separates question and answer. */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible dir="rtl" className="space-y-3">
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="overflow-hidden rounded-2xl border border-border-decorative bg-surface-card transition-colors data-[state=open]:border-blue-7"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center gap-4 p-5 text-start">
              <span className="shrink-0 rounded-md bg-surface-info px-2 py-1 text-caption font-bold text-blue-5">
                {item.category}
              </span>
              <span className="flex-1 text-body font-bold text-text-primary">
                {item.question}
              </span>
              <Plus className="size-5 shrink-0 text-blue-6 transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_.25s_ease-out] data-[state=open]:animate-[accordion-down_.3s_ease-out]">
            <div className="mx-5 border-t border-border-decorative pb-5 pt-4">
              <p className="text-label leading-8 text-text-secondary">{item.answer}</p>
              {item.points && (
                <ul className="mt-4 space-y-2.5 text-label text-text-secondary">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-3 text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
