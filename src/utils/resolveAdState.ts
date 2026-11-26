import type { AdApplicationState } from "@/types/Seeker/seeker";

/**
 * Old `pending` and `no-parent` preview links remain backward-compatible:
 * both now lead to the direct-to-employer application flow.
 */
export type AdPreviewState = "pending" | "sent" | "expired" | "no-parent" | "network-error" | "adult" | null;

const PREVIEW_TO_STATE: Partial<Record<Exclude<AdPreviewState, null>, AdApplicationState>> = {
  pending: "sentToEmployer",
  sent: "sentToEmployer",
  expired: "expired",
  "no-parent": "open",
};

export function parseAdPreviewState(value: string | null): AdPreviewState {
  const allowed = ["pending", "sent", "expired", "no-parent", "network-error", "adult"];
  return allowed.includes(value ?? "") ? (value as AdPreviewState) : null;
}

/** The state the ad page shows: the preview override when present, else the ad's real state. */
export function resolveAdState(real: AdApplicationState, preview: AdPreviewState): AdApplicationState {
  return (preview && PREVIEW_TO_STATE[preview]) || real;
}
