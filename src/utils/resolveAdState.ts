import type { AdApplicationState } from "@/types/Seeker/seeker";

/** Values accepted by the `?state=` query parameter to preview a state of the ad page. */
export type AdPreviewState = "pending" | "sent" | "expired" | "no-parent" | "network-error" | "adult" | null;

const PREVIEW_TO_STATE: Partial<Record<Exclude<AdPreviewState, null>, AdApplicationState>> = {
  pending: "pendingParent",
  sent: "sentToEmployer",
  expired: "expired",
  "no-parent": "noParent",
};

export function parseAdPreviewState(value: string | null): AdPreviewState {
  const allowed = ["pending", "sent", "expired", "no-parent", "network-error", "adult"];
  return allowed.includes(value ?? "") ? (value as AdPreviewState) : null;
}

/** The state the ad page shows: the preview override when present, else the ad's real state. */
export function resolveAdState(real: AdApplicationState, preview: AdPreviewState): AdApplicationState {
  return (preview && PREVIEW_TO_STATE[preview]) || real;
}
