import {
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";

interface ParentPasswordCriteriaProps {
  password: string;
  confirmPassword?: string;
  showMatch?: boolean;
}

function passwordByteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

export function isValidParentPassword(
  password: string,
): boolean {
  const length = passwordByteLength(password);
  return length >= 8 && length <= 72;
}

export function ParentPasswordCriteria({
  password,
  confirmPassword = "",
  showMatch = false,
}: ParentPasswordCriteriaProps) {
  const byteLength = passwordByteLength(password);

  const items = [
    {
      label: "حداقل ۸ نویسه",
      valid: byteLength >= 8,
    },
    {
      label: "حداکثر ۷۲ بایت",
      valid: byteLength > 0 && byteLength <= 72,
    },
    ...(showMatch
      ? [
          {
            label: "تکرار رمز با رمز عبور یکسان است",
            valid:
              confirmPassword.length > 0 &&
              confirmPassword === password,
          },
        ]
      : []),
  ];

  return (
    <ul className="space-y-1.5 text-caption">
      {items.map((item) => {
        const untouched =
          password.length === 0 &&
          (!showMatch || confirmPassword.length === 0);

        return (
          <li
            key={item.label}
            className="flex items-center gap-2 text-text-secondary"
          >
            {untouched ? (
              <Circle
                size={14}
                className="text-text-disabled"
                aria-hidden="true"
              />
            ) : item.valid ? (
              <CheckCircle2
                size={14}
                className="text-success"
                aria-hidden="true"
              />
            ) : (
              <XCircle
                size={14}
                className="text-error"
                aria-hidden="true"
              />
            )}

            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
