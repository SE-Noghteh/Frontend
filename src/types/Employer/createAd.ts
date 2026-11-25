
import type { EmployerAdKind } from "./employer";

export interface CreateAdForm {
  kind: EmployerAdKind | "";

  title: string;
  category: string;
  skills: string[];
  description: string;
  deliverables: string;
  deliveryFormat: string;

  deadline: string;
  deliveryDate: string;
  budget: string;
  collaborationMode: string;
  ageRange: string;
  parentConsent: boolean;

  internshipDuration: string;
  weeklyHours: string;
  hasAllowance: boolean;

  acceptedTerms: boolean;
}

export type CreateAdErrors = Partial<
  Record<keyof CreateAdForm, string>
>;

export type CreateAdStep = 1 | 2 | 3 | 4 | 5;

export const INITIAL_CREATE_AD_FORM: CreateAdForm = {
  kind: "",

  title: "",
  category: "",
  skills: [],
  description: "",
  deliverables: "",
  deliveryFormat: "",

  deadline: "",
  deliveryDate: "",
  budget: "",
  collaborationMode: "",
  ageRange: "",
  parentConsent: false,

  internshipDuration: "",
  weeklyHours: "",
  hasAllowance: false,

  acceptedTerms: false,
};
