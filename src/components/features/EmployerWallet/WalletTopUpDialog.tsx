import { useRef, useState } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useEmployerStore, MIN_WALLET_TOP_UP, MAX_WALLET_TOP_UP } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { formatToman } from "@/utils/formatToman";
import { amountInput, formatAmount, isAmount } from "@/utils/mockFinance";
import { cn } from "@/utils/cn";
interface WalletTopUpDialogProps { isOpen: boolean; onClose: () => void; onSuccess?: () => void; minimumNeeded?: number; }
const PRESETS = [500000, 1000000, 2000000, 5000000];
export const financeInput = "min-h-11 w-full rounded-lg border border-ocean-blue bg-white px-3 py-2 text-label outline-none focus-visible:ring-2 focus-visible:ring-blue";
export function WalletTopUpDialog(props: WalletTopUpDialogProps) { return props.isOpen ? <TopUpContent {...props} /> : null; }
function TopUpContent({ onClose, onSuccess, minimumNeeded = 0 }: WalletTopUpDialogProps) {
  const balance = useEmployerStore(s => s.walletBalance);
  const topUp = useEmployerStore(s => s.topUpWallet);
  const cards = useEmployerStore(s => s.bankCards);
  const toast = useToastStore(s => s.showToast);
  const [raw,setRaw] = useState(String(minimumNeeded ? Math.max(MIN_WALLET_TOP_UP,minimumNeeded) : 1000000));
  const [gateway,setGateway] = useState(false);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const lock = useRef(false);
  const amount = Number(raw);
  const valid = isAmount(raw) && amount >= MIN_WALLET_TOP_UP && amount <= MAX_WALLET_TOP_UP;
  const defaultCard = cards.find(c => c.isDefault);
  function next() { if (!valid) {setError(`مبلغ باید بین ${formatToman(MIN_WALLET_TOP_UP)} و ${formatToman(MAX_WALLET_TOP_UP)} باشد.`);return;} setError("");setGateway(true); }
  async function pay() {
    if (lock.current || !valid) return;
    lock.current=true;setLoading(true);setError("");
    try {await new Promise<void>(r=>setTimeout(r,600)); if(!topUp(amount)){setError("شارژ انجام نشد.");return;} toast({tone:"success",title:"کیف پول شارژ شد",description:formatToman(amount)});onSuccess?.();onClose();}
    finally {lock.current=false;setLoading(false);}
  }
  return <Dialog isOpen title={gateway?"تأیید شارژ":"شارژ کیف پول"} onClose={()=>{if(!lock.current)onClose();}} isDismissible={!loading}>
    <div dir="rtl" className="flex min-w-0 flex-col gap-4">
      {!gateway ? <>
        <label className="flex flex-col gap-2 text-label font-medium">مبلغ شارژ (تومان)<input className={financeInput} inputMode="numeric" value={raw && /^\d+$/.test(raw)?formatAmount(amount):raw} onChange={e=>{setRaw(amountInput(e.target.value));setError("");}} /></label>
        <div className="flex flex-wrap gap-2">{PRESETS.map(p=><button key={p} type="button" aria-pressed={p===amount} onClick={()=>{setRaw(String(p));setError("");}} className={cn("rounded-lg border px-3 py-2 text-caption",p===amount?"border-green-3 bg-green-7":"border-border-soft bg-white")}>{formatAmount(p)}</button>)}</div>
        {minimumNeeded>0 && <p className="rounded-lg bg-warning-soft p-3 text-caption text-warning">برای انتشار آگهی حداقل {formatToman(minimumNeeded)} شارژ نیاز است.</p>}
        <p className="text-caption text-text-secondary">موجودی پس از شارژ: {valid?formatToman(balance+amount):"—"}</p>
        <div className="flex gap-2"><Button variant="secondary" onClick={onClose}>انصراف</Button><Button className="flex-1" onClick={next}>ادامه</Button></div>
      </>:<>
        <div className="rounded-2xl bg-green-7 p-5"><p className="font-bold">مبلغ قابل پرداخت</p><p className="mt-4 text-card-title font-bold">{formatToman(amount)}</p></div>
        <div className="flex items-center gap-3 rounded-xl border border-border-soft p-4"><CreditCard size={22} className="text-blue"/><div><p className="text-label font-bold">{defaultCard?`${defaultCard.bank} · •••• ${defaultCard.last4.replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[Number(d)])}`:"کیف پول"}</p></div></div>
        <p className="text-caption leading-6 text-text-secondary">در این مرحله وجهی از حساب بانکی کسر نمی‌شود.</p>
        <div className="flex gap-2"><Button variant="secondary" disabled={loading} onClick={onClose}>انصراف</Button><Button className="flex-1" loading={loading} disabled={loading} onClick={()=>void pay()}>تأیید شارژ</Button></div>
        <Button variant="text" disabled={loading} onClick={()=>{setGateway(false);setError("");}}>تغییر مبلغ</Button>
      </>}
      {error && <p role="alert" className="rounded-lg bg-error-soft p-3 text-caption text-error">{error}</p>}
    </div>
  </Dialog>;
}
