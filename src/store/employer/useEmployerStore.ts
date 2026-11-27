import { create } from "zustand";
import { mockWalletBalance, mockWalletTransactions, mockBankCards, mockBankAccounts } from "@/data/mockEmployerFinance";
import type { WalletTransaction, MockBankCard, MockBankAccount } from "@/types/Employer/finance";
export type { WalletTransaction } from "@/types/Employer/finance";
import { getActiveMockAdDates } from "@/data/mockAdDates";
import { mockEmployerAds } from "@/data/mockEmployerAds";
import { mockEmployerApplicants } from "@/data/mockEmployerApplicants";
import type { AdApplicant, ApplicantStatus } from "@/components/features/EmployerAdDetail/AdApplicants";
import type { EmployerAd, EmployerAdStatus } from "@/types/Employer/employer";
import { canEditAd, canReceiveApplicants, canRepublishAd } from "@/utils/employerAdStatus";
import { validateAdDates } from "@/utils/dateValidation";
import { normalizeAdDeadline } from "@/utils/employerAdStatus";

export interface AdUpdateNotification {
  id: string;
  adId: string;
  applicantId: string;
  title: string;
  message: string;
  changedFields: string[];
  createdAt: string;
  read: boolean;
}
export const PUBLISH_FEE = 50000;
export const MOCK_INITIAL_WALLET_BALANCE = mockWalletBalance;
export const MIN_WALLET_TOP_UP = 10000;
export const MAX_WALLET_TOP_UP = 10000000;

interface EmployerState {
  ads: EmployerAd[];
  applicantsByAd: Record<string, AdApplicant[]>;
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  topUpWallet: (amount: number) => boolean;
  bankCards: MockBankCard[];
  bankAccounts: MockBankAccount[];
  addBankCard: (card: Omit<MockBankCard, "id">) => boolean;
  removeBankCard: (id: string) => void;
  setDefaultBankCard: (id: string) => void;
  addBankAccount: (account: Omit<MockBankAccount, "id">) => string;
  withdrawWallet: (amount: number, accountId: string) => boolean;
  notifications: AdUpdateNotification[];
  addAd: (ad: EmployerAd) => void;
  publishAdWithFee: (ad: EmployerAd, sourceId?: string) => boolean;
  updateAd: (id: string, changes: Partial<Omit<EmployerAd, "id">>) => void;
  notifyApplicants: (adId: string, applicantIds: string[], changedFields: string[]) => void;
  setAdStatus: (id: string, status: EmployerAdStatus) => void;
  setApplicantStatus: (adId: string, applicantId: string, status: ApplicantStatus) => boolean;
  registerApplicant: (adId: string, applicant: AdApplicant) => boolean;
  removeAd: (id: string) => void;
}

// Preserve the existing mock data, but use the detailed list as the source of applicant identities.
const initialApplicants = Object.fromEntries(Object.entries(mockEmployerApplicants).map(([id, list]) => [id, list.map(a => ({ ...a }))]));
const initialAds = mockEmployerAds.map(original => {
  const dates = original.status === "published" ? getActiveMockAdDates(original.id) : undefined;
  const ad = dates ? { ...original, ...dates } : original;
  const list = initialApplicants[ad.id];
  return list ? { ...ad, applicants: list.map(({id, name}) => ({id, name})), applicantsCount: list.length, newApplicantsCount: list.filter(a => a.status === "new").length } : ad;
});

export const useEmployerStore = create<EmployerState>((set, get) => ({
  ads: initialAds,
  applicantsByAd: initialApplicants,
  walletBalance: MOCK_INITIAL_WALLET_BALANCE,
  walletTransactions: mockWalletTransactions,
  bankCards: mockBankCards,
  bankAccounts: mockBankAccounts,
  addBankCard: (card) => {
    const cards = get().bankCards;
    if (!/^\d{4}$/.test(card.last4) || !card.holder.trim() || !card.bank.trim() || cards.some(c => c.bank === card.bank && c.last4 === card.last4)) return false;
    const isDefault = card.isDefault || cards.length === 0;
    set({ bankCards: [...cards.map(c => isDefault ? { ...c, isDefault: false } : c), { ...card, isDefault, id: crypto.randomUUID() }] });
    return true;
  },
  removeBankCard: (id) => set(state => {
    const remaining = state.bankCards.filter(card => card.id !== id);
    return { bankCards: remaining.some(card => card.isDefault) ? remaining : remaining.map((card, index) => ({ ...card, isDefault: index === 0 })) };
  }),
  setDefaultBankCard: (id) => set(state => state.bankCards.some(card => card.id === id) ? { bankCards: state.bankCards.map(card => ({ ...card, isDefault: card.id === id })) } : state),
  addBankAccount: (account) => {
    if (!/^\d{4}$/.test(account.last4) || !account.label.trim()) return "";
    const id = crypto.randomUUID();
    set(state => ({ bankAccounts: [...state.bankAccounts, { ...account, id }] }));
    return id;
  },
  withdrawWallet: (amount, accountId) => {
    const state = get();
    const account = state.bankAccounts.find(item => item.id === accountId);
    if (!account || !Number.isSafeInteger(amount) || amount <= 0 || amount > state.walletBalance) return false;
    const balanceAfter = state.walletBalance - amount;
    const transaction: WalletTransaction = { id: crypto.randomUUID(), kind: "withdrawal", amount: -amount, balanceAfter, description: "برداشت به حساب بانکی", reference: account.label, createdAt: new Date().toISOString(), status: "pending" };
    set(current => ({ walletBalance: balanceAfter, walletTransactions: [transaction, ...current.walletTransactions] }));
    return true;
  },

  topUpWallet: (amount) => {
    const state = get();
    if (!Number.isSafeInteger(amount) || amount < MIN_WALLET_TOP_UP || amount > MAX_WALLET_TOP_UP || !Number.isSafeInteger(state.walletBalance + amount)) return false;
    const balanceAfter = state.walletBalance + amount;
    const transaction: WalletTransaction = {
      id: crypto.randomUUID(), kind: "top-up", amount, balanceAfter,
      description: "شارژ کیف پول", createdAt: new Date().toISOString(),
    };
    set(current => ({ walletBalance: balanceAfter, walletTransactions: [transaction, ...current.walletTransactions] }));
    return true;
  },
  notifications: [],

  addAd: (ad) => set(state => ({ ads: [ad, ...state.ads] })),

  publishAdWithFee: (ad, sourceId) => {
    const state = get();
    const source = sourceId ? state.ads.find(item => item.id === sourceId) : undefined;
    if (sourceId && (!source || !canRepublishAd(source))) return false;
    if (state.walletBalance < PUBLISH_FEE || state.ads.some(item => item.id === ad.id) || ad.status !== "published") return false;
    const dateErrors = validateAdDates(normalizeAdDeadline(ad.deadline), normalizeAdDeadline(ad.deliveryDate), ad.kind === "internship");
    if (dateErrors.deadline || dateErrors.deliveryDate) return false;
    const transaction: WalletTransaction = {
      id: crypto.randomUUID(), kind: sourceId ? "republication" : "publication",
      amount: -PUBLISH_FEE, balanceAfter: state.walletBalance - PUBLISH_FEE,
      description: `${sourceId ? "انتشار دوباره" : "انتشار"} آگهی «${ad.title}»`,
      createdAt: new Date().toISOString(), adId: ad.id,
    };
    set(current => ({
      walletBalance: transaction.balanceAfter,
      walletTransactions: [transaction, ...current.walletTransactions],
      ads: [{ ...ad, applicants: [], applicantsCount: 0, newApplicantsCount: 0 }, ...current.ads],
      applicantsByAd: { ...current.applicantsByAd, [ad.id]: [] },
    }));
    return true;
  },

  updateAd: (id, changes) => set(state => ({ ads: state.ads.map(ad => ad.id === id && canEditAd(ad) ? { ...ad, ...changes, id: ad.id, status: ad.status, createdAt: ad.createdAt, applicants: ad.applicants, applicantsCount: ad.applicantsCount, newApplicantsCount: ad.newApplicantsCount } : ad) })),

  notifyApplicants: (adId, applicantIds, changedFields) => set(state => {
    const ad = state.ads.find(item => item.id === adId);
    if (!ad || !changedFields.length) return state;
    const notifications = [...new Set(applicantIds)].map(applicantId => ({
      id: crypto.randomUUID(), adId, applicantId,
      title: "تغییر اطلاعات آگهی",
      message: `اطلاعات آگهی «${ad.title}» تغییر کرده است. موارد تغییرکرده: ${changedFields.join("، ")}. لطفاً شرایط جدید آگهی را بررسی کنید.`,
      changedFields: [...changedFields], createdAt: new Date().toISOString(), read: false,
    }));
    return { notifications: [...notifications, ...state.notifications] };
  }),

  setAdStatus: (id, status) => set(state => ({ ads: state.ads.map(ad => {
    if (ad.id !== id) return ad;
    // Only the active ad can be closed. Reopening requires a new paid publication.
    if (status === "closed" && canReceiveApplicants(ad)) return { ...ad, status };
    return ad;
  }) })),

  setApplicantStatus: (adId, applicantId, status) => {
    const state = get();
    const ad = state.ads.find(item => item.id === adId);
    const list = state.applicantsByAd[adId] ?? [];
    const applicant = list.find(item => item.id === applicantId);
    if (!ad || !canReceiveApplicants(ad) || !applicant || applicant.status === "accepted") return false;
    if (status === "accepted" && (applicant.status === "rejected" || list.some(item => item.status === "accepted"))) return false;
    const next = list.map(item => item.id === applicantId ? { ...item, status } : item);
    set(current => ({
      applicantsByAd: { ...current.applicantsByAd, [adId]: next },
      ads: current.ads.map(item => item.id === adId ? {
        ...item,
        status: status === "accepted" ? "collaboration" : item.status,
        newApplicantsCount: next.filter(a => a.status === "new").length,
      } : item),
    }));
    return true;
  },

  registerApplicant: (adId, applicant) => {
    const state = get();
    const ad = state.ads.find(item => item.id === adId);
    const list = state.applicantsByAd[adId] ?? [];
    if (!ad || !canReceiveApplicants(ad) || list.some(item => item.id === applicant.id)) return false;
    const next: AdApplicant[] = [...list, { ...applicant, status: "new" }];
    set(current => ({
      applicantsByAd: { ...current.applicantsByAd, [adId]: next },
      ads: current.ads.map(item => item.id === adId ? { ...item, applicants: next.map(({id, name}) => ({id, name})), applicantsCount: next.length, newApplicantsCount: next.filter(a => a.status === "new").length } : item),
    }));
    return true;
  },

  removeAd: (id) => set(state => ({ ads: state.ads.filter(ad => ad.id !== id) })),
}));
