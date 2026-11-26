import * as Popover from "@radix-ui/react-popover";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

import { SearchLiveSuggestions } from "./SearchLiveSuggestions";
import { SearchTrendingSuggestions } from "./SearchTrendingSuggestions";

interface OpportunitySearchBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  /** Called when the user submits or picks a suggestion. */
  onSearch: (query: string) => void;
}

/** Search input with a popover of popular searches / live matches. */
export function OpportunitySearchBox({
  value,
  onValueChange,
  onSearch,
}: OpportunitySearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const query = value.trim();

  const search = (nextQuery: string) => {
    setIsOpen(false);
    onSearch(nextQuery);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Anchor asChild>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            search(query);
          }}
          className="flex items-center gap-2 rounded-2xl border border-border-decorative bg-surface-card p-2 transition-shadow focus-within:border-action-primary focus-within:shadow-[0_0_0_4px_rgba(29,53,87,.08)]"
        >
          <Search className="ms-3 size-5 shrink-0 text-charcoal-2" />
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => {
              onValueChange(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="دنبال چه کاری هستی؟ مثلاً طراحی لوگو، تدوین، ترجمه…"
            className="h-12 min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-charcoal-3"
            aria-label="جستجوی فرصت‌های کاری"
          />
          {/* TODO: replace with the shared Button component. */}
          <button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-action-primary px-6 text-label font-bold text-white transition-colors hover:bg-action-hover active:scale-[.98]"
          >
            جستجو
          </button>
        </form>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          align="center"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            if (inputRef.current && event.target === inputRef.current) {
              event.preventDefault();
            }
          }}
          style={{ width: "var(--radix-popover-trigger-width)" }}
          className="animate-popover-in z-50 overflow-hidden rounded-2xl border border-border-decorative bg-surface-card p-4 shadow-[0_28px_56px_-18px_rgba(29,53,87,.32)] outline-none"
        >
          {query ? (
            <SearchLiveSuggestions
              query={query}
              onSelectQuery={search}
              onNavigate={() => setIsOpen(false)}
            />
          ) : (
            <SearchTrendingSuggestions
              onSelectQuery={search}
              onNavigate={() => setIsOpen(false)}
            />
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
