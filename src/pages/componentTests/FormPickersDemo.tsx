/**
 * Dropdowns and date picker demo (shown inside the components test page).
 * Each component appears twice: default colors, and re-themed through the `colors` prop.
 */

import { useState, type ReactNode } from "react";

import { Dropdown } from "@/components/ui/Dropdown";
import { JalaliDatePicker } from "@/components/ui/JalaliDatePicker";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { SearchableDropdown } from "@/components/ui/SearchableDropdown";
import type { DatePickerColors } from "@/types/DatePicker/datePicker";
import type { DropdownColors } from "@/types/Dropdown/dropdown";

const CITIES = ["تهران", "اصفهان", "شیراز", "تبریز", "مشهد", "کرج", "رشت", "یزد", "اهواز", "قم"];

const BLUE_DROPDOWN: DropdownColors = {
  border: "var(--color-blue-7)",
  activeBorder: "var(--color-blue)",
  hoverBg: "var(--color-blue-8)",
  hoverText: "var(--color-blue)",
  selectedBg: "var(--color-blue)",
  selectedText: "var(--color-white)",
  checkColor: "var(--color-white)",
  accent: "var(--color-blue)",
  chipBg: "var(--color-blue-8)",
  chipText: "var(--color-blue)",
};

const BLUE_DATE_PICKER: DatePickerColors = {
  border: "var(--color-blue-7)",
  activeBorder: "var(--color-blue)",
  dayHoverBg: "var(--color-blue-8)",
  dayHoverText: "var(--color-blue)",
  selectedBg: "var(--color-blue)",
  selectedText: "var(--color-white)",
  todayBg: "var(--color-blue-7)",
  todayText: "var(--color-blue-1)",
  navHoverBg: "var(--color-blue-8)",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-border-soft bg-white p-4">
      <h2 className="text-body font-bold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Pickers({ label, dropdown, datePicker }: { label: string; dropdown?: DropdownColors; datePicker?: DatePickerColors }) {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [date, setDate] = useState("");

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <p className="text-label font-bold text-text-secondary">{label}</p>

      <Section title="Dropdown">
        <Dropdown value={city} options={CITIES} onChange={setCity} colors={dropdown} />
      </Section>

      <Section title="SearchableDropdown">
        <SearchableDropdown value={searchedCity} options={CITIES} onChange={setSearchedCity} colors={dropdown} />
      </Section>

      <Section title="MultiSelectDropdown">
        <MultiSelectDropdown value={cities} options={CITIES} onChange={setCities} colors={dropdown} />
      </Section>

      <Section title="JalaliDatePicker">
        <JalaliDatePicker value={date} onChange={setDate} colors={datePicker} />
        <p className="text-caption text-text-secondary" dir="ltr">
          {date || "—"}
        </p>
      </Section>
    </div>
  );
}

export default function FormPickersDemo() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 p-4 md:grid-cols-2">
      <Pickers label="رنگ‌های پیش‌فرض" />
      <Pickers label="با prop رنگ (colors)" dropdown={BLUE_DROPDOWN} datePicker={BLUE_DATE_PICKER} />
    </div>
  );
}
