import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Dropdown } from "@/components/ui/Dropdown";
import { useEmployerStore } from "@/store/employer/useEmployerStore";
import { useToastStore } from "@/store/ui/useToastStore";
import { formatToman } from "@/utils/formatToman";
import { amountInput, asciiDigits, formatAmount, isAmount } from "@/utils/mockFinance";
import { financeInput } from "./WalletTopUpDialog";
const banks = ["بانک ملی", "بانک ملت", "بانک صادرات", "بانک تجارت", "بانک سامان", "سایر بانک‌ها"];
export function AddCardDialog({onClose}:{onClose:()=>void}) {
  const [number,setNumber]=useState("");const [holder,setHolder]=useState("استودیو سپیدار");const [bank,setBank]=useState(banks[0]);const [preferred,setPreferred]=useState(false);const [error,setError]=useState("");
  const add=useEmployerStore(s=>s.addBankCard);const toast=useToastStore(s=>s.showToast);
  function save(){if(!/^\d{16}$/.test(number)){setError("شماره کارت باید ۱۶ رقم باشد.");return;}if(!holder.trim()){setError("نام دارنده را وارد کنید.");return;}if(!add({bank,last4:number.slice(-4),holder:holder.trim(),isDefault:preferred})){setError("این کارت قبلاً اضافه شده یا اطلاعات نامعتبر است.");return;}toast({tone:"success",title:"کارت اضافه شد",description:`${bank} · ${number.slice(-4)}`});onClose();}
  return <Dialog isOpen title="افزودن کارت" onClose={onClose}><div dir="rtl" className="flex flex-col gap-4">
    <label className="flex flex-col gap-2 text-label font-medium">شماره کارت<input dir="ltr" inputMode="numeric" className={`${financeInput} ${error.includes("شماره کارت")?"border-error":""}`} value={number.replace(/(\d{4})(?=\d)/g,"$1 ")} onChange={e=>{setNumber(asciiDigits(e.target.value).replace(/\D/g,"").slice(0,16));setError("");}} placeholder="0000 0000 0000 0000" maxLength={19} autoComplete="off"/></label>
    <label className="flex flex-col gap-2 text-label font-medium">نام دارنده کارت<input className={financeInput} value={holder} onChange={e=>setHolder(e.target.value)}/></label>
    <div className="flex flex-col gap-2 text-label font-medium">بانک<Dropdown value={bank} options={banks} onChange={setBank}/></div>
    <label className="flex items-center gap-2 text-label"><input type="checkbox" checked={preferred} onChange={e=>setPreferred(e.target.checked)} className="accent-blue"/>کارت پیش‌فرض باشد</label>
    {error&&<p role="alert" className="text-caption text-error">{error}</p>}
    <div className="flex gap-2"><Button variant="secondary" onClick={onClose}>انصراف</Button><Button className="flex-1" onClick={save}>ذخیره کارت</Button></div>
  </div></Dialog>;
}
export function WithdrawDialog({onClose}:{onClose:()=>void}) {
  const balance=useEmployerStore(s=>s.walletBalance);const accounts=useEmployerStore(s=>s.bankAccounts);const withdraw=useEmployerStore(s=>s.withdrawWallet);const add=useEmployerStore(s=>s.addBankAccount);const toast=useToastStore(s=>s.showToast);
  const [raw,setRaw]=useState("");const [account,setAccount]=useState(accounts[0]?.label??"");const [newAccount,setNewAccount]=useState(false);const [suffix,setSuffix]=useState("");const [error,setError]=useState("");
  const ADD="+ افزودن حساب جدید";
  function saveAccount(){if(!/^\d{4}$/.test(suffix)){setError("چهار رقم آخر شبا را وارد کنید.");return;}const label=`شبا ···· ${suffix}`;if(accounts.some(a=>a.label===label)){setError("این حساب موجود است.");return;}if(add({label,last4:suffix})){setAccount(label);setNewAccount(false);setError("");}}
  function submit(){const selected=accounts.find(a=>a.label===account);if(!isAmount(raw)||Number(raw)>balance){setError("مبلغ برداشت معتبر نیست یا موجودی کافی نیست.");return;}if(!selected||!withdraw(Number(raw),selected.id)){setError("حساب یا مبلغ را بررسی کنید.");return;}toast({tone:"success",title:"درخواست برداشت ثبت شد",description:"در انتظار بررسی"});onClose();}
  return <Dialog isOpen title={newAccount?"افزودن حساب":"برداشت از کیف پول"} onClose={onClose}><div dir="rtl" className="flex flex-col gap-4">
    {newAccount?<><label className="flex flex-col gap-2 text-label">چهار رقم آخر شبا<input className={financeInput} inputMode="numeric" value={suffix} onChange={e=>setSuffix(asciiDigits(e.target.value).replace(/\D/g, "").slice(0,4))}/></label><div className="flex gap-2"><Button variant="secondary" onClick={()=>{setNewAccount(false);setError("");}}>بازگشت</Button><Button className="flex-1" onClick={saveAccount}>افزودن حساب</Button></div></>:<>
    <div className="flex justify-between gap-2 text-label"><span className="text-text-secondary">حداکثر قابل برداشت</span><strong>{formatToman(balance)}</strong></div>
    <label className="flex flex-col gap-2 text-label font-medium">مبلغ برداشت (تومان)<input className={financeInput} inputMode="numeric" value={raw&&/^\d+$/.test(raw)?formatAmount(Number(raw)):raw} onChange={e=>{setRaw(amountInput(e.target.value));setError("");}}/></label>
    <div className="flex flex-col gap-2 text-label font-medium">به حساب<Dropdown value={account} options={[...accounts.map(a=>a.label),ADD]} onChange={v=>{setError("");if(v===ADD){setSuffix("");setNewAccount(true);}else setAccount(v);}} placeholder="انتخاب حساب"/></div>
    <p className="text-caption leading-6 text-text-secondary">مبلغ‌های در امانت قابل برداشت نیستند. انتقال بانکی هنوز فعال نیست.</p>
    <div className="flex gap-2"><Button variant="secondary" onClick={onClose}>انصراف</Button><Button className="flex-1" onClick={submit}>ثبت درخواست برداشت</Button></div></>}
    {error&&<p role="alert" className="text-caption text-error">{error}</p>}
  </div></Dialog>;
}
