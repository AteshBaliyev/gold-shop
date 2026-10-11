import React, { useState } from 'react';
import { X, CheckCircle, Flame, Send, MessageCircle } from 'lucide-react';

export default function SellAccountModal({ isOpen, onClose }) {
  const [level, setLevel] = useState('');
  const [rank, setRank] = useState('Böyük Usta');
  const [evoGuns, setEvoGuns] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(
      'Salam Gold Shop! Mən öz Free Fire hesabımı satmaq istəyirəm. Zəhmət olmasa qiymətləndirin.'
    );
    window.open(`https://wa.me/994993370057?text=${message}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || !level || !price) {
      alert('Zəhmət olmasa tələb olunan sahələri doldurun!');
      return;
    }

    const message = encodeURIComponent(
      `Salam Gold Shop! Mən hesabımı satmaq istəyirəm:\n` +
      `🔥 Level: ${level}\n` +
      `🏆 Rütbə: ${rank}\n` +
      `🔫 Evo Silah Sayı: ${evoGuns || '0'}\n` +
      `💰 Tələb Etdiyim Qiymət: ${price} AZN\n` +
      `📞 Əlaqə Nömrəsi: ${phone}\n` +
      `📝 Qeyd: ${notes || 'Yoxdur'}`
    );

    window.open(`https://wa.me/994993370057?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer border border-white/40 shadow-lg flex items-center gap-1 active:scale-95 transition-all"
          title="Bağla"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Bağla</span>
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Öz Hesabını Bizə Sat
          </h2>
          <p className="text-xs text-slate-400">
            Hesabınızın məlumatlarını göndərin, 30 dəqiqə ərzində qiymətləndirib pulunuzu karta köçürək.
          </p>

          {/* Quick Direct WhatsApp Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Birbaşa WhatsApp ilə Əlaqə Saxla (099 337 00 57)</span>
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Müraciətiniz Göndərildi!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Məlumatlar WhatsApp vasitəsilə komandamıza çatdırıldı. Qısa zamanda sizinlə əlaqə saxlayacağıq.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Bağla
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Hesab Leveli *</label>
                <input
                  type="number"
                  required
                  placeholder="Məs: 72"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Rütbə (Rank)</label>
                <select
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
                >
                  <option value="Böyük Usta">Böyük Usta</option>
                  <option value="Usta">Usta</option>
                  <option value="Qəhrəman">Qəhrəman</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Evo Silah Sayı</label>
                <input
                  type="number"
                  placeholder="Məs: 4"
                  value={evoGuns}
                  onChange={(e) => setEvoGuns(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">İstədiyiniz Qiymət (AZN) *</label>
                <input
                  type="number"
                  required
                  placeholder="Məs: 60"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Əlaqə Nömrəniz (WhatsApp) *</label>
              <input
                type="text"
                required
                placeholder="+994 50 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Əlavə Qeydlər</label>
              <textarea
                rows="2"
                placeholder="Old kostyumlar, emojilər..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-500 transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Qiymətləndirməyə Göndər</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
