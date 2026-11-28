import { createContext, useContext, useState, type ReactNode } from "react";

export interface IndividualIdentityData {
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalId: string;
  gender: "female" | "male";
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  businessName: string;
  businessField: string;
  website: string;
  hasLicense: boolean;
}

export interface LegalIdentityData {
  companyName: string;
  legalEntityType: string;
  companyNationalId: string;
  registrationNumber: string;
  economicCode: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  representativeFirstName: string;
  representativeLastName: string;
  representativePosition: string;
  representativeGender: "female" | "male";
  representativeNationalCode: string;
  hasTaxFile: boolean;
  activities: string[];
  website: string;
  requiresActivityLicense: boolean;
}

export interface DocumentsData {
  nationalCard: File | null;
  businessLicense: File | null;
  videoFile: File | null;
  establishmentDocument: File | null; // 🔥
}

export interface AccountData {
  mobile: string;
  email: string;
  password: string;
}

interface EmployerSignupContextValue {
  accountType: "real" | "legal";
  setAccountType: (type: "real" | "legal") => void;
  individualIdentity: IndividualIdentityData | null;
  setIndividualIdentity: (data: IndividualIdentityData) => void;
  legalIdentity: LegalIdentityData | null;
  setLegalIdentity: (data: LegalIdentityData) => void;
  documents: DocumentsData;
  setDocuments: (data: DocumentsData) => void;
  account: AccountData;
  setAccount: (data: AccountData) => void;
  reset: () => void;
}

const EmployerSignupContext = createContext<EmployerSignupContextValue | null>(null);

export function EmployerSignupProvider({ children }: { children: ReactNode }) {
  const [accountType, setAccountType] = useState<"real" | "legal">("real");
  const [individualIdentity, setIndividualIdentity] = useState<IndividualIdentityData | null>(null);
  const [legalIdentity, setLegalIdentity] = useState<LegalIdentityData | null>(null);
  const [documents, setDocuments] = useState<DocumentsData>({
    nationalCard: null,
    businessLicense: null,
    videoFile: null,
    establishmentDocument: null, // 🔥
  });
  const [account, setAccount] = useState<AccountData>({ mobile: "", email: "", password: "" });

  const reset = () => {
    setAccountType("real");
    setIndividualIdentity(null);
    setLegalIdentity(null);
    setDocuments({ nationalCard: null, businessLicense: null, videoFile: null, establishmentDocument: null });
    setAccount({ mobile: "", email: "", password: "" });
  };

  return (
    <EmployerSignupContext.Provider
      value={{
        accountType, setAccountType,
        individualIdentity, setIndividualIdentity,
        legalIdentity, setLegalIdentity,
        documents, setDocuments,
        account, setAccount,
        reset,
      }}
    >
      {children}
    </EmployerSignupContext.Provider>
  );
}

export function useEmployerSignup() {
  const ctx = useContext(EmployerSignupContext);
  if (!ctx) throw new Error("useEmployerSignup must be used within EmployerSignupProvider");
  return ctx;
}