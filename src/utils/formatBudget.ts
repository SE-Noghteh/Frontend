/**
 * Formats a budget given in thousand tomans for display.
 * 1200 -> "۱٫۲ میلیون", 900 -> "۹۰۰ هزار"
 */

import { toPersianDigits } from "./toPersianDigits";

export function formatBudget(thousandTomans: number): string {
  if (thousandTomans >= 1000) {
    const millions = (thousandTomans / 1000).toString().replace(".", "٫");
    return `${toPersianDigits(millions)} میلیون`;
  }

  return `${toPersianDigits(thousandTomans)} هزار`;
}
