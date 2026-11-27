import { addDays, getTodayISO } from "@/utils/dateValidation";
import { formatAdDeadline } from "@/utils/employerAdStatus";

// Only active demo fixtures get rolling dates, once per app load.
// Expired/closed/collaboration fixtures retain their original dates.
const today = getTodayISO();
const deadlineOffsets: Record<string, number> = { "1": 7, "2": 14 };

export function getActiveMockAdDates(id: string) {
  const offset = deadlineOffsets[id];
  if (offset === undefined) return undefined;
  return {
    deadline: formatAdDeadline(addDays(today, offset)),
    deliveryDate: addDays(today, offset + 14),
  };
}
