import type { KeyboardEvent } from "react";
import { Search } from "lucide-react";

interface DropdownSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/** Search box shown at the top of a dropdown menu. */
export function DropdownSearch({
  value,
  onChange,
  placeholder = "جست‌وجو...",
  onKeyDown,
}: DropdownSearchProps) {
  return (
    <div className="relative mb-2 shrink-0">
      <Search
        size={17}
        aria-hidden="true"
        className="dd-icon pointer-events-none absolute start-3 top-1/2 -translate-y-1/2"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="جست‌وجوی گزینه‌ها"
        className="dd-search h-11 w-full rounded-lg border ps-10 pe-3 text-label outline-none"
      />
    </div>
  );
}
