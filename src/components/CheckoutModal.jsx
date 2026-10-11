import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, ShieldCheck, Zap } from 'lucide-react';

export default function CheckoutModal({ orderData, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!orderData) return null;

  const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const m10Number = "099 337 00 57";

  const itemName = orderData.type === 'account' 
    ? `Hesab: ${orderData.account.title} (${orderData.account.code})`
    : `Elmas Paketi: ${orderData.package.name || orderData.package.title}`;

  const price = orderData.type === 'account'
    ? orderData.account.price
    : orderData.totalAmount;

  const whatsappMessage = encodeURIComponent(
    `Salam Gold Shop! Mən sifariş vermək istəyirəm:\n` +
    `📌 Sifariş Kodu: ${orderId}\n` +
    `🎮 Məhsul: ${itemName}\n` +
    (orderData.playerId ? `🆔 Free Fire UID: ${orderData.playerId}\n` : '') +
    (orderData.nickname ? `👤 Nickname: ${orderData.nickname}\n` : '') +
    `💰 Məbləğ: ${price} AZN\n` +
    `Ödənişi təsdiq etmək istəyirəm.`
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer border border-white/40 shadow-lg flex items-center gap-1 active:scale-95 transition-all"
          title="Bağla"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Bağla</span>
        </button>

        {/* Modal Header */}
        <div className="p-8 pb-6 border-b border-slate-800 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 border border-slate-700 text-amber-500 flex items-center justify-center mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Sifariş Təsdiqi
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-xs font-mono font-semibold mt-2.5">
            <span>KOD:</span>
            <span>{orderId}</span>
          </div>
        </div>

        {/* Details & Payment Info */}
        <div className="p-6 sm:p-8 space-y-5 text-xs">
          
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-slate-400">
              <span>Sifariş edilən:</span>
              <span className="font-semibold text-white text-right max-w-xs truncate">{itemName}</span>
            </div>

            {orderData.playerId && (
              <div className="flex justify-between items-center text-slate-400">
                <span>Free Fire UID:</span>
                <span className="font-mono font-semibold text-amber-400">{orderData.playerId}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800/80 flex justify-between items-baseline">
              <span className="font-medium text-slate-400">Yekun Məbləğ:</span>
              <div className="text-2xl font-bold text-white">
                {price} <span className="text-sm text-amber-500 font-semibold">AZN</span>
              </div>
            </div>
          </div>

          {/* Payment Details Box */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Ödəniş Məlumatları (m10 / Kart)</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                0% Komissiya
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <div className="text-[10px] text-slate-400">m10 Nömrəsi:</div>
                <div className="font-mono text-sm font-bold text-white">{m10Number}</div>
              </div>
              <button
                onClick={() => copyToClipboard(m10Number.replace(/\s+/g, ''))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Ödənişdən sonra qəbzi WhatsApp vasitəsilə göndərin. Təhvil dərhal həyata keçiriləcək.
            </p>
          </div>

          {/* WhatsApp Action Button */}
          <a
            href={`https://wa.me/994993370057?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsCompleted(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>WhatsApp-a Göndər & Təsdiq Et</span>
          </a>

          {isCompleted && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-center font-medium">
              ✓ Sifarişiniz qeydə alındı! Operator tezliklə cavab verəcək.
            </div>
          )}

          <div className="text-center pt-1">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Bağla
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
