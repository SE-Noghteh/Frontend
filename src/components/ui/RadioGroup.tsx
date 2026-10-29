interface RadioOption {
    label: string;
    value: string;
  }
  
  interface RadioGroupProps {
    label: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    isRequired?: boolean;
    error?: string;
  }
  
  export function RadioGroup({ label, options, value, onChange, isRequired, error }: RadioGroupProps) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-label text-text-primary font-medium">
          {label} {isRequired && <span className="text-status-error">*</span>}
        </label>
        <div className="flex items-center gap-6 mt-1">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    className="peer sr-only"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => onChange(option.value)}
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? "border-action-primary" : "border-border-decorative group-hover:border-text-secondary"
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-action-primary" />}
                  </div>
                </div>
                <span className={`text-label select-none ${
                  isSelected ? "text-text-primary font-medium" : "text-text-secondary"
                }`}>
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
        {error && <p className="text-caption text-status-error">{error}</p>}
      </div>
    );
  }