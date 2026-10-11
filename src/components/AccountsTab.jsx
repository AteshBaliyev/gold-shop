import React, { useState, useMemo } from 'react';
import { 
  Search, Package, Flame, Award, SlidersHorizontal, 
  RotateCcw, MessageCircle, ShieldCheck, Sparkles, 
  Eye, CheckCircle2, Lock
} from 'lucide-react';

export default function AccountsTab({ 
  accounts, 
  onSelectAccount, 
  onOpenSellModal 
}) {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [kasaFilter, setKasaFilter] = useState('ALL'); // 'ALL' | 'Var' | 'Yoxdur'
  const [evoFilter, setEvoFilter] = useState('ALL'); // 'ALL' | 'Max' | 'Orta' | 'Yoxdur'
  const [minLevel, setMinLevel] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Collapsible filters for mobile & clean UX

  // WhatsApp Order Handler
  const handleOrderWhatsApp = (account) => {
    const rawNumber = "994993370057"; // 099 337 00 57
    const message = `Salam, mən Gold Shop-dan ${account.code} kodlu hesabı ${account.price} AZN-ə almaq istəyirəm.`;
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setKasaFilter('ALL');
    setEvoFilter('ALL');
    setMinLevel('');
  };

  // Filtered Accounts Logic
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || 
        acc.title.toLowerCase().includes(query) ||
        (acc.code && acc.code.toLowerCase().includes(query)) ||
        (acc.itemsDetails && acc.itemsDetails.toLowerCase().includes(query)) ||
        (acc.description && acc.description.toLowerCase().includes(query));

      const matchesKasa = kasaFilter === 'ALL' || acc.kasa === kasaFilter;
      const matchesEvo = evoFilter === 'ALL' || acc.evoStatus === evoFilter;

      const minLvlNum = minLevel ? parseInt(minLevel, 10) : 0;
      const matchesLevel = isNaN(minLvlNum) || acc.level >= minLvlNum;

      return matchesSearch && matchesKasa && matchesEvo && matchesLevel;
    });
  }, [accounts, searchTerm, kasaFilter, evoFilter, minLevel]);

  const hasActiveFilters = searchTerm !== '' || kasaFilter !== 'ALL' || evoFilter !== 'ALL' || minLevel !== '';

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Modern Glassmorphic Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garena Free Fire Təsdiqlənmiş Hesablar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Premium Free Fire <br className="hidden sm:inline" />
              <span className="text-amber-500">Hesab Vitrini</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Maksimum səviyyəli Evo silahlar, nadir old sezon kolleksiyaları və turnir hesabları. 
              Bütün giriş məlumatları operatorlarımız tərəfindən <strong>100% zəmanətlə</strong> təhvil verilir.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Güvənli Təhvil</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Birbaşa WhatsApp Dəstək</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
                <Lock className="w-4 h-4 text-slate-300" />
                <span>Təmiz Bağlantı</span>
              </div>
            </div>
          </div>

          {/* Quick Action Button: Sell your account */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={onOpenSellModal}
              className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/15 cursor-pointer text-center"
            >
              + Öz Hesabını Sat
            </button>
            <span className="text-xs text-slate-400 text-center">
              Hesabınızı qiymətləndirib alırıq
            </span>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTERING PANEL */}
      <section className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        
        {/* TOP ROW: Search Bar (Həmişə Görünür) + 'Filtrləri Aç' Düyməsi + 'Sıfırla' */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          
          {/* 1. SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Hesab adına və ya koduna görə axtarış (Məs: GOLD-101)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-9 py-3 text-xs text-white placeholder-slate-500 outline-none transition-all font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer p-1"
                title="Axtarışı təmizlə"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons: 'Filtrləri Aç' və 'Sıfırla' */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-sm select-none ${
                isFiltersOpen || (kasaFilter !== 'ALL' || evoFilter !== 'ALL' || minLevel !== '')
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-amber-500/15'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700/80 text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{isFiltersOpen ? 'Filtrləri Bağla' : 'Filtrləri Aç'}</span>
              {(kasaFilter !== 'ALL' || evoFilter !== 'ALL' || minLevel !== '') && (
                <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                title="Bütün filtrləri sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Sıfırla</span>
              </button>
            )}
          </div>

        </div>

        {/* EXPANDABLE EXTRA FILTERS (Yalnız 'Filtrləri Aç' düyməsinə basdıqda açılır) */}
        {isFiltersOpen && (
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* 2. KASA FILTER */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Kasa Vəziyyəti
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setKasaFilter('ALL')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    kasaFilter === 'ALL'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hamısı
                </button>
                <button
                  type="button"
                  onClick={() => setKasaFilter('Var')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    kasaFilter === 'Var'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Var
                </button>
                <button
                  type="button"
                  onClick={() => setKasaFilter('Yoxdur')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    kasaFilter === 'Yoxdur'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yoxdur
                </button>
              </div>
            </div>

            {/* 3. EVO SİLAH FILTER */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Evo Silah
              </label>
              <div className="grid grid-cols-4 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setEvoFilter('ALL')}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                    evoFilter === 'ALL'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hamısı
                </button>
                <button
                  type="button"
                  onClick={() => setEvoFilter('Max')}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                    evoFilter === 'Max'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Max
                </button>
                <button
                  type="button"
                  onClick={() => setEvoFilter('Orta')}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                    evoFilter === 'Orta'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Orta
                </button>
                <button
                  type="button"
                  onClick={() => setEvoFilter('Yoxdur')}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                    evoFilter === 'Yoxdur'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yoxdur
                </button>
              </div>
            </div>

            {/* 4. MINIMUM LEVEL INPUT */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Minimum Səviyyə
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Məsələn: 60"
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all font-mono"
                />
                {minLevel && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-amber-500 font-semibold">
                    Lv. {minLevel}+
                  </span>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Results summary bar */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-slate-800">
          <div>
            Aktiv hesab sayı: <strong className="text-white font-bold ml-1">{filteredAccounts.length}</strong>
          </div>
          <div className="text-[11px] text-slate-400 hidden sm:block">
            * Bütün sifarişlər birbaşa rəsmi WhatsApp xəttinə ötürülür
          </div>
        </div>

      </section>

      {/* ACCOUNTS GRID */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <Package className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">
            Axtarışa uyğun heç bir hesab tapılmadı
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Axtarış sözünü təmizləyin və ya filtrləri dəyişin.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Filtrləri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccounts.map((account) => {
            const hasKasa = account.kasa === 'Var';

            return (
              <article
                key={account.id}
                itemScope
                itemType="https://schema.org/Product"
                data-code={account.code}
                data-kasa={account.kasa}
                data-evo={account.evoStatus}
                data-items={account.itemsDetails || account.description}
                className="group rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
              >
                {/* SEO Metadata tags */}
                <meta itemProp="name" content={account.title} />
                <meta itemProp="sku" content={account.code} />
                <meta itemProp="description" content={account.itemsDetails || account.description} />
                <meta itemProp="price" content={String(account.price)} />
                <meta itemProp="priceCurrency" content="AZN" />

                {/* 1. ACCOUNT IMAGE & TOP BADGES (Şəkilə basanda detallı səhifə açılır) */}
                <div 
                  onClick={() => onSelectAccount(account)}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer group/img"
                  title="Detallı şəkillərə və məlumatlara baxmaq üçün klikləyin"
                >
                  <img
                    itemProp="image"
                    src={account.image || (account.images && account.images[0])}
                    alt={account.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/50"></div>

                  {/* Center Zoom Hover Pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-slate-950/90 text-amber-400 border border-amber-500/40 text-xs font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Böyük Bax</span>
                    </span>
                  </div>

                  {/* Top Left: Account Code */}
                  <div className="absolute top-3.5 left-3.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 font-mono font-semibold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {account.code}
                  </div>

                  {/* Top Right: Level Tag */}
                  <div className="absolute top-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
                    LVL {account.level}
                  </div>

                  {/* Multiple Images Indicator Badge */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-semibold group-hover/img:border-amber-500/50 transition-colors">
                    <span>📷</span>
                    <span>{(account.images && account.images.length) || 1} Şəkil</span>
                  </div>

                  {/* Rank Badge */}
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-800">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{account.rank}</span>
                  </div>
                </div>

                {/* 2. CARD CONTENT */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  
                  <div className="space-y-3.5">
                    {/* Account Name - Tapping title also opens details */}
                    <h3 
                      itemProp="name" 
                      onClick={() => onSelectAccount(account)}
                      className="font-bold text-base text-white hover:text-amber-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {account.title}
                    </h3>

                    {/* KEY ATTRIBUTES: Kasa & Evo */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      
                      {/* Kasa Status */}
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-medium">Kasa:</span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                          hasKasa 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-slate-800 text-slate-400 border-slate-700/60'
                        }`}>
                          {hasKasa ? 'Var' : 'Yoxdur'}
                        </span>
                      </div>

                      {/* Evo Silah Status */}
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-medium">Evo Silah:</span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>{account.evoStatus}</span>
                        </span>
                      </div>

                    </div>

                    {/* HESABDAKI ƏŞYALAR VƏ METADATA (Detallı Məlumat) */}
                    {(account.itemsDetails || account.description) && (
                      <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                        <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                          <span>📦 Hesabdakı Əşyalar:</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {account.itemsDetails || account.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. PRICE AND ORDER BUTTON */}
                  <div className="pt-4 border-t border-slate-800 space-y-3.5">
                    
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-medium text-slate-400">Qiymət:</span>
                      <div className="flex items-baseline gap-1.5">
                        {account.oldPrice && (
                          <span className="text-xs text-slate-500 line-through font-medium">
                            {account.oldPrice} ₼
                          </span>
                        )}
                        <span className="text-2xl font-extrabold text-white">
                          {account.price}
                        </span>
                        <span className="font-semibold text-amber-500 text-sm">AZN</span>
                      </div>
                    </div>

                    {/* Action Buttons: Ətraflı Bax & Sifariş Et */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <button
                        onClick={() => onSelectAccount(account)}
                        className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-extrabold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
                        title="Hesabın bütün şəkillərinə və ətraflı məlumatlarına bax"
                      >
                        <Eye className="w-4.5 h-4.5 text-amber-400 stroke-[2.5]" />
                        <span>Ətraflı Bax</span>
                      </button>

                      <button
                        onClick={() => handleOrderWhatsApp(account)}
                        className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                        title="WhatsApp ilə sifariş et"
                      >
                        <MessageCircle className="w-4.5 h-4.5 text-slate-950 fill-slate-950" />
                        <span>Sifariş Et</span>
                      </button>
                    </div>

                  </div>

                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <section className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-800 text-amber-500 border border-slate-700">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">Rəsmi WhatsApp Xətti: 099 337 00 57</div>
            <div className="text-xs text-slate-400 mt-0.5">Sifariş düyməsinə basaraq dərhal operatorla əlaqə saxlayın.</div>
          </div>
        </div>

        <a
          href="https://wa.me/994993370057?text=Salam,%20Gold%20Shop%20haqqinda%20məlumat%20almaq%20istəyirəm"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all shrink-0"
        >
          Birbaşa Əlaqə
        </a>
      </section>

    </div>
  );
}
