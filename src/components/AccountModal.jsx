import React, { useState, useEffect } from 'react';
import { 
  X, Flame, ShieldCheck, Award, MessageCircle, 
  ChevronLeft, ChevronRight, Image as ImageIcon,
  Maximize2, ZoomIn, Eye
} from 'lucide-react';

export default function AccountModal({ account, onClose }) {
  if (!account) return null;

  // Prepare up to 4-5 images array
  const imagesList = (account.images && account.images.length > 0)
    ? account.images 
    : [account.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isFullscreenViewer, setIsFullscreenViewer] = useState(false);

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  // Keyboard navigation for image gallery & fullscreen view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'Escape') {
        if (isFullscreenViewer) {
          setIsFullscreenViewer(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagesList.length, isFullscreenViewer]);

  const handleOrderWhatsApp = () => {
    const rawNumber = "994993370057"; // 099 337 00 57
    const message = `Salam, mən Gold Shop-dan ${account.code} kodlu hesabı ${account.price} AZN-ə almaq istəyirəm.`;
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <>
      {/* 1. MAIN ACCOUNT DETAIL MODAL (Daha Geniş və Böyük Ölçü: max-w-4xl) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-slate-900/98 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[96vh] sm:max-h-[92vh] flex flex-col"
        >
          
          {/* Super Visible Modal Close Button (Həmişə aydın görünən qırmızı X düyməsi) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white border-2 border-white/60 shadow-2xl transition-all cursor-pointer flex items-center gap-1.5 font-black text-xs sm:text-sm hover:scale-105 active:scale-95 ring-4 ring-rose-600/30"
            title="Elanı Bağla (ESC)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            <span>Bağla</span>
          </button>

          {/* TOP INTERACTIVE GALLERY (4-5 Şəkil) */}
          <div className="relative bg-slate-950 shrink-0">
            
            {/* Main Large Image Container (Kliklədikdə daha böyük ekranda açılır) */}
            <div 
              onClick={() => setIsFullscreenViewer(true)}
              className="relative aspect-[16/11] sm:aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden bg-black cursor-zoom-in group/imgview"
              title="Şəklə tam ekranda və daha böyük baxmaq üçün klikləyin"
            >
              <img
                src={imagesList[activeImgIndex]}
                alt={`${account.title} - Şəkil ${activeImgIndex + 1}`}
                className="w-full h-full object-cover sm:object-contain md:object-cover transition-all duration-300 group-hover/imgview:scale-[1.02]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/50 pointer-events-none"></div>

              {/* Navigation Arrows (if more than 1 image) */}
              {imagesList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-800 transition-all cursor-pointer shadow-lg hover:scale-110 z-10"
                    title="Əvvəlki şəkil"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-800 transition-all cursor-pointer shadow-lg hover:scale-110 z-10"
                    title="Növbəti şəkil"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top Left: Badges */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                <span className="bg-slate-950/85 border border-slate-800 text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-lg shadow-sm">
                  {account.code}
                </span>
                <span className="bg-slate-950/85 border border-slate-800 text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg shadow-sm">
                  LVL {account.level}
                </span>
              </div>

              {/* Bottom Right: Photo Counter & Fullscreen Action (X düyməsinə mane olmur) */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFullscreenViewer(true); }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  title="Şəklə daha böyük (Tam Ekran) bax"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                  <span>Tam Ekran</span>
                </button>

                <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-200 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeImgIndex + 1} / {imagesList.length}</span>
                </div>
              </div>

              {/* Bottom Left Title Overlay */}
              <div className="absolute bottom-3 left-4 right-52 pointer-events-none z-10">
                <h2 className="text-base sm:text-xl font-bold text-white truncate drop-shadow">
                  {account.title}
                </h2>
              </div>
            </div>

            {/* Clickable Image Thumbnails Strip (4-5 Şəkil Seçimi) */}
            {imagesList.length > 1 && (
              <div className="p-2 sm:p-2.5 bg-slate-950/95 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-semibold text-slate-400 pl-1 pr-1 hidden sm:inline">
                  Şəkillər:
                </span>
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImgIndex === idx 
                        ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20' 
                        : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-0.5 left-0.5 bg-black/70 text-[9px] font-bold text-amber-400 px-1 rounded">
                      #{idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            )}

          </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-5 text-xs">
          
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-[11px] text-slate-400 font-medium">Hesab Kodu</div>
              <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">{account.code}</div>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-[11px] text-slate-400 font-medium">Kasa</div>
              <div className={`text-xs font-semibold mt-0.5 ${account.kasa === 'Var' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {account.kasa === 'Var' ? '✓ Var' : '✗ Yoxdur'}
              </div>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-[11px] text-slate-400 font-medium">Evo Vəziyyəti</div>
              <div className="text-xs font-semibold text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{account.evoStatus}</span>
              </div>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="text-[11px] text-slate-400 font-medium">Bağlantı</div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{account.bindType}</div>
            </div>
          </div>

          {/* Evo Details */}
          {account.evoDetails && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-1.5">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Evo Silahlar və Səviyyələri</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {account.evoDetails}
              </p>
            </div>
          )}

          {/* Hesabdakı Əşyalar (İçində olan şeylər) */}
          {(account.itemsDetails || account.description) && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-1.5">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📦 Hesabdakı Əşyalar (İçində Olanlar):</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {account.itemsDetails || account.description}
              </p>
            </div>
          )}

          {/* Safety Guarantee */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <strong className="text-white block font-semibold">Gold Shop Zəmanəti:</strong>
              <span className="text-slate-400 leading-relaxed">Hesabın bütün şifrələri və təhlükəsizlik məlumatları alıcının adına 100% zəmanətlə təhvil verilir. Operatorumuz: <strong>099 337 00 57</strong></span>
            </div>
          </div>
        </div>

        {/* Footer with Price and WhatsApp Order button */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div>
            {account.oldPrice && (
              <span className="text-xs text-slate-500 line-through block font-medium">
                {account.oldPrice} ₼
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {account.price}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-amber-500">AZN</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-rose-600/90 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>Bağla</span>
            </button>
            <button
              onClick={handleOrderWhatsApp}
              className="flex items-center gap-2 px-5 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/10 cursor-pointer active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
              <span>Sifariş Et</span>
            </button>
          </div>
        </div>

      </div>
    </div>

      {/* 2. FULLSCREEN LIGHTBOX / BÖYÜK ŞƏKİL BAXIŞI (TAM EKRAN) */}
      {isFullscreenViewer && (
        <div 
          onClick={() => setIsFullscreenViewer(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
        >
          {/* Direct Floating Close Button (Ekran küncündə həmişə sabit görünən qırmızı X) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreenViewer(false);
            }}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[200] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-2xl border-2 border-white/60 flex items-center gap-2 cursor-pointer active:scale-95 transition-all hover:scale-105"
            title="Böyük şəkli bağla (ESC)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            <span>Bağla (ESC)</span>
          </button>

          {/* Top Control Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between gap-4 py-2.5 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shrink-0 z-10"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-amber-400 bg-black/60 border border-slate-800 px-2.5 py-1 rounded-lg text-xs">
                {account.code}
              </span>
              <span className="text-white text-xs font-semibold truncate max-w-xs sm:max-w-md">
                {account.title}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-300 font-semibold bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                {activeImgIndex + 1} / {imagesList.length} Şəkil
              </span>

              <button
                type="button"
                onClick={() => setIsFullscreenViewer(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all cursor-pointer border border-white/40 shadow-md"
                title="Böyük şəkli bağla (ESC)"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Bağla</span>
              </button>
            </div>
          </div>

          {/* Center Large Image with Previous / Next Arrows */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center p-2 sm:p-4 my-2"
          >
            {/* Prev Image Arrow */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700 transition-all cursor-pointer shadow-2xl hover:scale-110 z-20"
                title="Əvvəlki şəkil (← ox düyməsi)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* High-Resolution Large Image (Object-Contain so zero crop, 100% details) */}
            <img
              src={imagesList[activeImgIndex]}
              alt={`${account.title} - Şəkil ${activeImgIndex + 1}`}
              className="max-h-[75vh] sm:max-h-[78vh] max-w-[92vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-slate-800/90 transition-all duration-200 select-none"
            />

            {/* Next Image Arrow */}
            {imagesList.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700 transition-all cursor-pointer shadow-2xl hover:scale-110 z-20"
                title="Növbəti şəkil (→ ox düyməsi)"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Navigator */}
          {imagesList.length > 1 && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shrink-0 overflow-x-auto max-w-full shadow-lg"
            >
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImgIndex === idx 
                      ? 'border-amber-500 scale-105 shadow-lg shadow-amber-500/30' 
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-0.5 left-0.5 bg-black/80 text-[9px] font-bold text-amber-400 px-1 rounded">
                    #{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </>
  );
}
