/**
 * SAMPLE FILE
 *
 * More specialized utilities may reuse generic utilities.
 */

import { formatCurrency } from "./formatCurrency";

export function formatPrice(value: number): string {
  return formatCurrency(value);
}