import React, { useState } from 'react';
import { 
  Gem, MessageCircle, ShieldCheck, Zap, Sparkles, 
  User, CheckCircle2, Award
} from 'lucide-react';
import { DIAMOND_PACKAGES } from '../data/mockData';

export default function DiamondTab() {
  const [playerId, setPlayerId] = useState('');

  // WhatsApp Order Handler
  const handleBuyDiamondWhatsApp = (pkg) => {
    const rawNumber = "994993370057"; // 099 337 00 57
    const idText = playerId.trim() ? playerId.trim() : '...';
    const message = `Salam, Gold Shop-dan ${pkg.name} yükləmək istəyirəm, oyunçu ID-m: ${idText}`;
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const standardPackages = DIAMOND_PACKAGES.filter((p) => !p.isPass);
  const passPackages = DIAMOND_PACKAGES.filter((p) => p.isPass);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Modern Glassmorphic Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide">
              <Gem className="w-3.5 h-3.5" />
              <span>Garena Rəsmi Serverləri ilə Ani Köçürmə</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Free Fire <br className="hidden sm:inline" />
              <span className="text-amber-500">Elmas Yükləmə</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              İstədiyiniz paketi seçin və <strong>'Al'</strong> düyməsinə basaraq WhatsApp (<strong>099 337 00 57</strong>) üzərindən sifarişinizi təsdiqləyin. Şifrə tələb olunmur, yalnız oyunçu ID kifayətdir.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg shrink-0">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Təhlükəsizlik</div>
              <div className="text-sm font-bold text-white">Yalnız ID ilə Köçürülür</div>
              <div className="text-xs text-amber-400 mt-0.5">Şifrə tələb olunmur</div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYER ID (UID) INPUT BAR */}
      <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              <span>Free Fire Oyunçu ID-niz (UID):</span>
            </label>
            <p className="text-xs text-slate-400">
              ID daxil etsəniz, 'Al' düyməsinə basanda avtomatik WhatsApp mesajına əlavə olunacaq.
            </p>
          </div>

          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              placeholder="Məsələn: 2849102948"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-slate-500 outline-none transition-all"
            />
            {playerId && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ✓ Hazırdır
              </span>
            )}
          </div>
        </div>
      </section>

      {/* MAIN DIAMOND PACKAGES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Əsas Elmas Paketləri
              </h2>
              <p className="text-xs text-slate-400">
                Bonus elmaslar birbaşa oyunçu hesabınıza göndərilir
              </p>
            </div>
          </div>
        </div>

        {/* DIAMOND PACKAGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {standardPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
            >
              
              {/* Top Tag / Badge */}
              {pkg.tag && (
                <div className="absolute top-5 right-5">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
                    {pkg.tag}
                  </span>
                </div>
              )}

              {/* Package Content */}
              <div className="space-y-5">
                
                {/* Clean Diamond Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-all">
                  <Gem className="w-6 h-6" />
                </div>

                {/* Package Name & Diamond Breakdown */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pkg.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className="text-slate-400">Cəmi:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <span>{pkg.total}</span>
                      <span>💎</span>
                    </span>
                    {pkg.bonus > 0 && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        +{pkg.bonus} Bonus
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  Çatdırılma müddəti: <strong>2 - 5 dəqiqə</strong> (Garena serveri ilə).
                </div>

              </div>

              {/* Price and 'Al' Button */}
              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
                
                <div>
                  {pkg.oldPrice && (
                    <span className="text-xs text-slate-500 line-through block font-medium">
                      {pkg.oldPrice} AZN
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">
                      {pkg.price}
                    </span>
                    <span className="font-semibold text-amber-500 text-sm">AZN</span>
                  </div>
                </div>

                {/* Unified Primary Button */}
                <button
                  onClick={() => handleBuyDiamondWhatsApp(pkg)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Al</span>
                </button>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP & PASS PACKAGES */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-amber-500">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Üzvlük və Pass Paketləri
              </h2>
              <p className="text-xs text-slate-400">
                Gündəlik elmas qazandıran xüsusi həftəlik və aylıq kartlar
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {passPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
            >
              {pkg.tag && (
                <div className="absolute top-5 right-5">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/80">
                    {pkg.tag}
                  </span>
                </div>
              )}

              <div className="space-y-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-500">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pkg.name}
                  </h3>
                  
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-semibold">
                    <span className="text-slate-400 font-normal">Dəyəri:</span>
                    <span className="text-white">{pkg.diamonds} Elmas</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  🎁 Hər gün daxil olaraq elmasları və xüsusi hədiyyələri toplayın.
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  {pkg.oldPrice && (
                    <span className="text-xs text-slate-500 line-through block font-medium">
                      {pkg.oldPrice} AZN
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">
                      {pkg.price}
                    </span>
                    <span className="font-semibold text-amber-500 text-sm">AZN</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyDiamondWhatsApp(pkg)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Al</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Trust & Payment Note */}
      <section className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-800 text-amber-500 border border-slate-700 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Ani Yükləmə (2-5 Dəq)</h4>
            <p className="mt-1 text-slate-400 leading-relaxed">Sifariş təsdiqlənən kimi elmaslar dərhal oyunçu ID nömrənizə yüklənir.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-800 text-amber-500 border border-slate-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">0% Komissiya</h4>
            <p className="mt-1 text-slate-400 leading-relaxed">m10, MilliÖn, eManat və bütün bank kartları ilə rahat ödəniş.</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-800 text-amber-500 border border-slate-700 shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Canlı Dəstək</h4>
            <p className="mt-1 text-slate-400 leading-relaxed">Operator xətti: <strong>099 337 00 57</strong> (7/24 xidmətinizdəyik).</p>
          </div>
        </div>
      </section>

    </div>
  );
}
