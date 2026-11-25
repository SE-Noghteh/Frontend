export function toISODate(date: Date): string {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayISO(): string {
  return toISODate(new Date());
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  const date = new Date(year, month - 1, day);

  return toISODate(date) === value;
}

export function addDays(
  value: string,
  days: number,
): string {
  const [year, month, day] = value
    .split("-")
    .map(Number);

  const date = new Date(year, month - 1, day);

  date.setDate(date.getDate() + days);

  return toISODate(date);
}

export function validateAdDates(
  deadline: string,
  deliveryDate: string,
  isInternship = false,
) {
  const today = getTodayISO();

  const dateLabel = isInternship
    ? "تاریخ شروع دوره"
    : "مهلت تحویل";

  const errors: {
    deadline?: string;
    deliveryDate?: string;
  } = {};

  if (!deadline) {
    errors.deadline = "مهلت درخواست را انتخاب کنید";
  } else if (!isValidISODate(deadline)) {
    errors.deadline = "تاریخ واردشده معتبر نیست";
  } else if (deadline < today) {
    errors.deadline =
      "مهلت درخواست نمی‌تواند قبل از امروز باشد";
  }

  if (!deliveryDate) {
    errors.deliveryDate =
      `${dateLabel} را انتخاب کنید`;
  } else if (!isValidISODate(deliveryDate)) {
    errors.deliveryDate =
      "تاریخ واردشده معتبر نیست";
  } else if (deliveryDate < today) {
    errors.deliveryDate =
      `${dateLabel} نمی‌تواند قبل از امروز باشد`;
  } else if (
    isValidISODate(deadline) &&
    deliveryDate <= deadline
  ) {
    errors.deliveryDate =
      `${dateLabel} باید بعد از مهلت درخواست باشد`;
  }

  return errors;
}