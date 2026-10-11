import React from 'react';
import { Flame, Gem, ShieldCheck, MessageCircle } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#0B0F17] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Gold <span className="text-amber-500">Shop</span>
              </span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Azərbaycanın güvənli Free Fire alqı-satqı və elmas yükləmə platforması. 
              Bütün əməliyyatlar 100% zəmanətli və rəsmi qaydada həyata keçirilir.
            </p>

            <div className="pt-1">
              <a
                href="https://wa.me/994993370057"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: 099 337 00 57</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Bölmələr
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => { setActiveTab('accounts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400 hover:text-white"
                >
                  Free Fire Hesabları
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('diamonds'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-slate-400 hover:text-white"
                >
                  Elmas Yüklə (UID ilə)
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/994993370057"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors text-slate-400 hover:text-white"
                >
                  Canlı Dəstək & Əlaqə
                </a>
              </li>
            </ul>
          </div>

          {/* Security & Payments */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Təhlükəsizlik
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Zəmanətli Təhvil</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Gem className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Rəsmi Server Yükləməsi</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                Ödənişlər m10, MilliÖn, eManat və bütün bank kartları ilə qəbul olunur.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <strong>Gold Shop</strong>. Bütün hüquqlar qorunur.
          </div>
          <div className="text-slate-400">
            Premium Gaming Marketplace
          </div>
        </div>

      </div>
    </footer>
  );
}
