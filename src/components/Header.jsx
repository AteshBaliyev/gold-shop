import React from 'react';
import { Flame, Gem, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, accountsCount }) {
  const navItems = [
    {
      id: 'accounts',
      name: 'Hesablar',
      icon: Flame,
      badge: `${accountsCount}`
    },
    {
      id: 'diamonds',
      name: 'Elmas Yüklə',
      icon: Gem,
      badge: 'Ani'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-2xl border-b border-slate-800 transition-all">
      {/* Top micro announcement */}
      <div className="bg-slate-900/60 border-b border-slate-800/60 py-1.5 px-4 text-[11px] text-center text-slate-300 flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="truncate"><strong>Gold Shop</strong>: Free Fire rəsmi hesab və elmas vitrini • 100% zəmanət</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('accounts')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm shrink-0">
              <Flame className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            </div>

            <div>
              <div className="flex items-center gap-1 font-bold text-lg sm:text-xl tracking-tight">
                <span className="text-white">Gold</span>
                <span className="text-amber-500">Shop</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide hidden xs:block">
                Free Fire Marketplace
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-500'}`} />
                  <span>{item.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Quick WhatsApp Support Action */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/994993370057?text=Salam,%20Gold%20Shop-dan%20yaziram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-all text-xs font-semibold shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">099 337 00 57</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* MOBILE DIRECT VISIBLE TABS (Telefonda Yuxarıda Hər İki Hissə: 'Hesablar' və 'Elmas Yüklə') */}
      <div className="md:hidden px-3 pb-3 pt-0">
        <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-1 rounded-2xl border border-slate-800/90 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-500'}`} />
                <span>{item.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
