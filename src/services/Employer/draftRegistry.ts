import type { DraftRef } from "./workDraftApi";
import type { EmployerSkillLevel } from "@/types/Employer/employer";

const KEY = "noghteh.employer.drafts.v1";
export interface DraftHint extends DraftRef {
  skillLevels?: Partial<Record<string, EmployerSkillLevel>>;
}
function readAll(): DraftHint[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(data)) return [];
    return data.filter((r): r is DraftHint => Boolean(r && typeof r.owner === "string" && ["work", "internship"].includes(r.kind) && Number.isSafeInteger(r.id) && r.id > 0));
  } catch { return []; }
}
function same(a: DraftRef, b: DraftRef) { return a.owner === b.owner && a.kind === b.kind && a.id === b.id; }
export function knownDrafts(owner: string) { return readAll().filter(r => r.owner === owner); }
export function rememberDraft(ref: DraftRef, skillLevels?: DraftHint["skillLevels"]): boolean {
  try {
    const records = readAll();
    const previous = records.find(r => same(r, ref));
    const next: DraftHint = { ...ref, skillLevels: skillLevels ?? previous?.skillLevels };
    localStorage.setItem(KEY, JSON.stringify([next, ...records.filter(r => !same(r, ref))]));
    return true;
  } catch { return false; }
}
export function forgetDraft(ref: DraftRef): boolean {
  try { localStorage.setItem(KEY, JSON.stringify(readAll().filter(r => !same(r, ref)))); return true; }
  catch { return false; }
}
export function draftHint(ref: DraftRef) { return readAll().find(r => same(r, ref)); }
