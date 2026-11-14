interface PreviewKeyValueListProps {
  rows: readonly (readonly [label: string, value: string])[];
  className?: string;
}

/** Divided "label ... value" rows used inside preview cards. */
export function PreviewKeyValueList({ rows, className = "mt-3" }: PreviewKeyValueListProps) {
  return (
    <div className={`${className} divide-y divide-border-decorative text-caption`}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between py-2">
          <span className="text-charcoal-2">{label}</span>
          <span className="font-semibold text-text-primary">{value}</span>
        </div>
      ))}
    </div>
  );
}
