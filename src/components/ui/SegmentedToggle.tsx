interface Option {
    label: string;
    value: string;
  }
  
  interface SegmentedToggleProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
  }
  
  export function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
    return (
      <div className="flex w-full gap-2">
        {options.map((option) => {
          const isActive = option.value === value;
          
          const baseStyles = "flex-1 rounded-md py-2 text-label font-medium transition-colors";
          const stateStyles = isActive
            ? "bg-action-primary text-white"
            : "border border-border-decorative text-text-primary hover:bg-surface-hover";
  
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`${baseStyles} ${stateStyles}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }