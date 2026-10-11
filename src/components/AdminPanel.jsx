import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, Plus, Trash2, CheckCircle, TrendingUp, 
  Users, Gem, ShoppingCart, Sparkles, ArrowLeft, LogOut, Package,
  Upload, Image as ImageIcon, X, Pencil, Check
} from 'lucide-react';
import { RECENT_ORDERS } from '../data/mockData';

export default function AdminPanel({ 
  accounts, 
  onAddAccount, 
  onUpdateAccount, 
  onDeleteAccount, 
  onReturnToSite, 
  onLogout,
  isFirebaseLive
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState(`GOLD-${Math.floor(100 + Math.random() * 900)}`);
  const [newPrice, setNewPrice] = useState('');
  const [newLevel, setNewLevel] = useState('70');
  const [newKasa, setNewKasa] = useState('Var');
  const [newEvoStatus, setNewEvoStatus] = useState('Max');
  const [imageUrls, setImageUrls] = useState([
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    '',
    '',
    '',
    ''
  ]);
  const [newItemsDetails, setNewItemsDetails] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  // EDIT STATE
  const [editingAccount, setEditingAccount] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editLevel, setEditLevel] = useState('70');
  const [editKasa, setEditKasa] = useState('Var');
  const [editEvoStatus, setEditEvoStatus] = useState('Max');
  const [editImages, setEditImages] = useState([]);
  const [editItemsDetails, setEditItemsDetails] = useState('');
  const [newEditImageUrl, setNewEditImageUrl] = useState('');
  const editFileInputRef = useRef(null);

  const handleStartEdit = (account) => {
    setEditingAccount(account);
    setEditTitle(account.title || '');
    setEditCode(account.code || '');
    setEditPrice(String(account.price || ''));
    setEditLevel(String(account.level || '60'));
    setEditKasa(account.kasa || 'Var');
    setEditEvoStatus(account.evoStatus || 'Max');
    const existingImgs = (account.images && account.images.length > 0)
      ? [...account.images]
      : [account.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'];
    setEditImages(existingImgs);
    setEditItemsDetails(account.itemsDetails || account.description || '');
    setNewEditImageUrl('');
  };

  const handleEditFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const availableSlots = 5 - editImages.length;
    if (availableSlots <= 0) {
      alert('Maksimum 5 şəkil saxlaya bilərsiniz. Yeni şəkil əlavə etmək üçün mövcud şəkillərdən birini silin.');
      return;
    }

    files.slice(0, availableSlots).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result;
        if (resultUrl) {
          setEditImages((prev) => {
            if (prev.length < 5) return [...prev, resultUrl];
            return prev;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddEditUrl = () => {
    if (!newEditImageUrl.trim()) return;
    if (editImages.length >= 5) {
      alert('Maksimum 5 şəkil əlavə edə bilərsiniz.');
      return;
    }
    setEditImages((prev) => [...prev, newEditImageUrl.trim()]);
    setNewEditImageUrl('');
  };

  const handleRemoveEditImage = (indexToRemove) => {
    setEditImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editCode.trim() || !editPrice) {
      alert('Zəhmət olmasa tələb olunan sahələri doldurun!');
      return;
    }

    const validImages = editImages.filter((img) => img && img.trim().length > 0);
    const finalImages = validImages.length > 0 ? validImages : [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    ];

    const updatedAccount = {
      ...editingAccount,
      code: editCode.trim().toUpperCase(),
      title: editTitle.trim(),
      price: parseFloat(editPrice),
      level: parseInt(editLevel, 10) || 60,
      rank: parseInt(editLevel, 10) >= 70 ? 'Böyük Usta' : parseInt(editLevel, 10) >= 60 ? 'Usta' : 'Qəhrəman',
      kasa: editKasa,
      evoStatus: editEvoStatus,
      evoGuns: editEvoStatus === 'Max' ? 6 : editEvoStatus === 'Orta' ? 3 : 0,
      image: finalImages[0],
      images: finalImages,
      itemsDetails: editItemsDetails.trim() || 'Zəngin Free Fire hesabı, nadir kostyumlar və silah dəstləri.',
      description: editItemsDetails.trim() || 'Təmiz və güvənli Free Fire hesabı. Dərhal təhvil verilir.',
      badges: [
        'YENİLƏNDİ',
        editKasa === 'Var' ? 'KASA VAR' : 'KASASIZ',
        `${editEvoStatus} EVO`
      ]
    };

    if (onUpdateAccount) {
      onUpdateAccount(updatedAccount);
    }
    setEditingAccount(null);
    setSuccessMsg(`✓ "${updatedAccount.title}" (${updatedAccount.code}) - ${finalImages.length} şəkil ilə uğurla yeniləndi!`);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.slice(0, 5).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result;
        if (resultUrl) {
          setImageUrls((prev) => {
            const firstEmpty = prev.findIndex((url) => !url || !url.trim());
            if (firstEmpty !== -1) {
              const updated = [...prev];
              updated[firstEmpty] = resultUrl;
              return updated;
            } else if (prev.length < 5) {
              return [...prev, resultUrl];
            }
            return prev;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateImageUrl = (index, val) => {
    setImageUrls((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const handleRemoveImageUrl = (index) => {
    setImageUrls((prev) => {
      const updated = [...prev];
      updated[index] = '';
      return updated;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim() || !newPrice) {
      alert('Zəhmət olmasa tələb olunan sahələri (Ad, Kod, Qiymət) doldurun!');
      return;
    }

    const validImages = imageUrls.filter((url) => url && url.trim().length > 0);
    const finalImages = validImages.length > 0 ? validImages : [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    ];

    const createdAccount = {
      id: Date.now(),
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      price: parseFloat(newPrice),
      level: parseInt(newLevel, 10) || 60,
      rank: parseInt(newLevel, 10) >= 70 ? 'Böyük Usta' : parseInt(newLevel, 10) >= 60 ? 'Usta' : 'Qəhrəman',
      likes: '9.0K',
      kasa: newKasa,
      evoStatus: newEvoStatus,
      evoGuns: newEvoStatus === 'Max' ? 6 : newEvoStatus === 'Orta' ? 3 : 0,
      image: finalImages[0],
      images: finalImages,
      itemsDetails: newItemsDetails.trim() || 'Zəngin Free Fire hesabı, nadir kostyumlar və silah dəstləri.',
      description: newItemsDetails.trim() || 'Təmiz və güvənli Free Fire hesabı. Dərhal təhvil verilir.',
      bindType: 'Google (Təmiz)',
      badges: ['YENİ', newKasa === 'Var' ? 'KASA VAR' : 'KASASIZ', `${newEvoStatus} EVO`],
      status: 'Aktiv',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddAccount(createdAccount);

    // Reset Form
    setNewTitle('');
    setNewCode(`GOLD-${Math.floor(100 + Math.random() * 900)}`);
    setNewPrice('');
    setNewItemsDetails('');
    setImageUrls([
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      '',
      '',
      '',
      ''
    ]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSuccessMsg(`✓ "${createdAccount.title}" (${createdAccount.code}) - ${finalImages.length} şəkil ilə Firebase bazasına və sayta əlavə edildi!`);
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Top Header with Navigation & Logout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-800 border border-slate-700/80 rounded-2xl text-amber-500 shadow-sm">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                İnzibatçı İdarəetmə Paneli
              </h1>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                Admin Aktiv
              </span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border flex items-center gap-1.5 ${
                isFirebaseLive 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseLive ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                <span>{isFirebaseLive ? '🔥 Firebase Cloud (Canlı)' : '🔥 Firebase Baza Aktivdir'}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              URL: <strong className="text-slate-300 font-mono">/admin</strong> • Hesablar avtomatik Firebase Firestore bulud bazasında və LocalStorage-də saxlanılır.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToSite}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sayta Qayıt</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold transition-all cursor-pointer"
            title="İnzibatçı panelindən çıx"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıxış</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs flex items-center gap-2.5 font-semibold shadow-sm animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Mövcud Hesablar</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            {accounts.length} Ədəd
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">🔥 Firebase Cloud & Local Sync</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Dövriyyə</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            4,820.50 ₼
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Aktiv satış statistikası</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Elmas Satışı</span>
            <Gem className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            142,800 💎
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">099 337 00 57 vasitəsilə</span>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Sifarişlər</span>
            <ShoppingCart className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">
            524 Ədəd
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Giriş şifrəsi: admin2008</span>
        </div>
      </div>

      {/* FORM: YENİ HESAB ƏLAVƏ ET */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Yeni Hesab Əlavə Et
              </h2>
              <p className="text-xs text-slate-400">
                Məlumatlar dərhal LocalStorage-ə yazılır və səhifə yeniləndikdə itmir.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. AD (Title) */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Hesabın Adı (Title) *
              </label>
              <input
                type="text"
                required
                placeholder="Məsələn: 7 EVO Silahlı, Old Sezon Hip-Hop Kostyumlu VIP Hesab..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* 2. KOD (Code) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Hesabın Kodu *
              </label>
              <input
                type="text"
                required
                placeholder="Məsələn: GOLD-107"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-mono font-semibold outline-none focus:border-amber-500 uppercase transition-all"
              />
            </div>

            {/* 3. QİYMƏT (Price) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Qiyməti (AZN) *
              </label>
              <input
                type="number"
                required
                step="0.5"
                placeholder="Məsələn: 85"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all font-mono"
              />
            </div>

            {/* 4. LEVEL (Level) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Hesabın Leveli
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all font-mono"
              />
            </div>

            {/* 5. KASA (Kasa) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kasa Vəziyyəti
              </label>
              <select
                value={newKasa}
                onChange={(e) => setNewKasa(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all"
              >
                <option value="Var">Var (Zəngin Kasa)</option>
                <option value="Yoxdur">Yoxdur (Standart)</option>
              </select>
            </div>

            {/* 6. EVO (Evo) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Evo Silah Vəziyyəti
              </label>
              <select
                value={newEvoStatus}
                onChange={(e) => setNewEvoStatus(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all"
              >
                <option value="Max">Max (Son Səviyyə)</option>
                <option value="Orta">Orta (Orta Səviyyə)</option>
                <option value="Yoxdur">Yoxdur</option>
              </select>
            </div>

            {/* 7. HESABIN ŞƏKİLLƏRİ (4-5 ƏDƏDƏ QƏDƏR ŞƏKİL YÜKLƏMƏ) */}
            <div className="sm:col-span-2 lg:col-span-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-xs font-bold text-white mb-0.5 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    <span>Hesabın Şəkilləri (Maksimum 4-5 Şəkil)</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Cihazdan şəkillər seçin və ya şəkil linklərini (URL) daxil edin. Alıcılar hər şəkilə baxa biləcəklər.
                  </p>
                </div>

                {/* File Upload Button */}
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="admin-image-upload"
                  />
                  <label
                    htmlFor="admin-image-upload"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 text-xs font-semibold cursor-pointer transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Cihazdan Yüklə (Max 5)</span>
                  </label>
                </div>
              </div>

              {/* 5 Image URL Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-300">
                        {idx === 0 ? '⭐ Şəkil 1 (Əsas Vitrin)' : `📷 Şəkil ${idx + 1}`}
                      </span>
                      {url && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageUrl(idx)}
                          className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          Təmizlə
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleUpdateImageUrl(idx, e.target.value)}
                      placeholder={idx === 0 ? 'https://... (Əsas şəkil linki)' : `https://... (Şəkil ${idx + 1})`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500 transition-all font-mono text-[11px]"
                    />
                  </div>
                ))}
              </div>

              {/* Image Previews Gallery */}
              {imageUrls.some((u) => u && u.trim().length > 0) && (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                    Yüklənmiş Şəkillərin Önizləməsi ({imageUrls.filter((u) => u && u.trim().length > 0).length} ədəd):
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {imageUrls.map((imgUrl, i) => {
                      if (!imgUrl || !imgUrl.trim()) return null;
                      return (
                        <div key={i} className="relative group/thumb w-20 h-20 rounded-xl overflow-hidden border border-slate-700 bg-black shrink-0 shadow-sm">
                          <img
                            src={imgUrl}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1 left-1 bg-black/70 text-[9px] font-bold text-amber-400 px-1.5 py-0.5 rounded">
                            #{i + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImageUrl(i)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600/90 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity cursor-pointer shadow"
                            title="Şəkli sil"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 8. HESABDAKI ƏŞYALAR HAQQINDA ƏTRAFLI MƏLUMAT */}
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Hesabdakı Əşyalar Haqqında Ətraflı Məlumat (İçində olan şeylər - SEO & Meta Data) *</span>
                <span className="text-[11px] text-slate-400 font-normal">Hesab kartında və axtarışda görünür</span>
              </label>
              <textarea
                rows="3"
                required
                value={newItemsDetails}
                onChange={(e) => setNewItemsDetails(e.target.value)}
                placeholder="Məsələn: Kriminal Qırmızı kostyum, AK47 Dragon Lv7 MAX, MP40 Cobra Lv7 MAX, 180+ geyim dəsti, 15 köhnə elit pass, nadir emojilər və çanta kolleksiyası..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all leading-relaxed"
              ></textarea>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/10 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>Hesabı Əlavə Et</span>
            </button>
          </div>
        </form>
      </div>

      {/* MÖVCUD HESABLARIN SİYAHISI VƏ SİL DÜYMƏSİ */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Mövcud Hesabların Siyahısı
              </h2>
              <p className="text-xs text-slate-400">
                Hesabı 'Sil' düyməsinə basaraq həm vitrindən, həm də LocalStorage-dən silə bilərsiniz.
              </p>
            </div>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full font-semibold">
            {accounts.length} Aktiv Hesab
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3.5 px-3">Kod & Şəkil</th>
                <th className="py-3.5 px-3">Hesabın Adı</th>
                <th className="py-3.5 px-3">İçindəki Əşyalar</th>
                <th className="py-3.5 px-3">Kasa</th>
                <th className="py-3.5 px-3">Evo</th>
                <th className="py-3.5 px-3">Level</th>
                <th className="py-3.5 px-3">Qiymət</th>
                <th className="py-3.5 px-3 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-800/30 transition-colors">
                  
                  {/* Kod & Şəkil */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.image}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                      <span className="font-mono font-semibold text-amber-400 text-xs bg-slate-950 px-2 py-1 rounded border border-slate-800">
                        {acc.code}
                      </span>
                    </div>
                  </td>

                  {/* Ad */}
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-white max-w-xs block leading-snug">
                      {acc.title}
                    </span>
                  </td>

                  {/* İçindəki Əşyalar */}
                  <td className="py-3.5 px-3 max-w-xs">
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {acc.itemsDetails || acc.description}
                    </p>
                  </td>

                  {/* Kasa */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      acc.kasa === 'Var' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {acc.kasa === 'Var' ? 'Var' : 'Yoxdur'}
                    </span>
                  </td>

                  {/* Evo */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-semibold text-amber-400">
                    {acc.evoStatus}
                  </td>

                  {/* Level */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-medium text-slate-300">
                    Lv. {acc.level}
                  </td>

                  {/* Qiymət */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="font-bold text-white text-sm">
                      {acc.price} ₼
                    </span>
                  </td>

                  {/* 'Düzəliş Et' & 'Sil' Düymələri */}
                  <td className="py-3.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStartEdit(acc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25 font-semibold text-xs transition-colors cursor-pointer"
                        title="Elanın məlumatlarına və şəkillərinə düzəliş et"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Düzəliş Et</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`"${acc.title}" (${acc.code}) hesabını saytdan və LocalStorage-dən silmək istədiyinizdən əminsiniz?`)) {
                            onDeleteAccount(acc.id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-semibold text-xs transition-colors cursor-pointer"
                        title="Hesabı saytdan birdəfəlik sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Sil</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Son Sifarişlər */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-white">
          Son Real Sifarişlərin Tarixçəsi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {RECENT_ORDERS.map((ord) => (
            <div key={ord.id} className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-amber-400">{ord.id}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                    {ord.type}
                  </span>
                </div>
                <div className="font-semibold text-white mt-1">{ord.item}</div>
                <div className="text-[11px] text-slate-400">{ord.playerId} • {ord.time}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white text-sm">{ord.amount}</div>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DÜZƏLİŞ MODALI (ELANDA ŞƏKİLLƏRİ ARTIRMAQ VƏ YA SİLMƏK, MƏLUMATLARI DƏYİŞMƏK) */}
      {editingAccount && (
        <div 
          onClick={() => setEditingAccount(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
          >
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Mövcud Elana Düzəliş Et
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kod: <strong className="font-mono text-amber-400">{editingAccount.code}</strong> • Şəkilləri artırın, silin və ya məlumatları yeniləyin
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingAccount(null)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md border border-white/30"
                title="Bağla"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>Bağla</span>
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSaveEdit} className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* ŞƏKİLLƏR BÖLMƏSİ (Şəkilləri artırmaq və ya silmək) */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div>
                    <label className="text-xs font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-500" />
                      <span>Hesabın Şəkilləri ({editImages.length} / 5 Şəkil)</span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Şəkillərin üstündəki <strong>Sil (X)</strong> düyməsi ilə silə, aşağıdan isə yeni şəkillər artıra bilərsiniz.
                    </p>
                  </div>

                  {/* Cihazdan Fayl Seçmək Düyməsi */}
                  <div className="shrink-0">
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditFileUpload}
                      className="hidden"
                      id="edit-account-file-upload"
                    />
                    <label
                      htmlFor="edit-account-file-upload"
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm ${
                        editImages.length >= 5
                          ? 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/10'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>+ Cihazdan Şəkil Artır</span>
                    </label>
                  </div>
                </div>

                {/* Mövcud Şəkillərin Qalereyası (Artırmaq / Silmək) */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2.5">
                    Mövcud Şəkillər (Birinci şəkil əsas vitrində görünür):
                  </span>
                  {editImages.length === 0 ? (
                    <div className="py-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                      Heç bir şəkil qalmayıb. Zəhmət olmasa aşağıdan ən azı 1 şəkil əlavə edin.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {editImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative group/editThumb rounded-xl overflow-hidden border border-slate-700 bg-black aspect-square shadow-sm">
                          <img
                            src={imgUrl}
                            alt={`Edit preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 left-1.5 bg-black/80 text-[10px] font-bold text-amber-400 px-1.5 py-0.5 rounded shadow">
                            {idx === 0 ? '⭐ Əsas' : `#${idx + 1}`}
                          </div>
                          {/* Şəkli Sil Düyməsi */}
                          <button
                            type="button"
                            onClick={() => handleRemoveEditImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg"
                            title="Bu şəkli sil"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Linklə (URL) Şəkil Artırma Bölməsi */}
                {editImages.length < 5 && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="url"
                      placeholder="və ya şəkil linkini (URL) bura yapışdırın: https://..."
                      value={newEditImageUrl}
                      onChange={(e) => setNewEditImageUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-500 transition-all font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={handleAddEditUrl}
                      disabled={!newEditImageUrl.trim()}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Linki Əlavə Et
                    </button>
                  </div>
                )}
              </div>

              {/* DİGƏR SAHƏLƏR (Title, Code, Price, Level, Kasa, Evo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hesabın Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hesabın Kodu *
                  </label>
                  <input
                    type="text"
                    required
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-mono font-semibold outline-none focus:border-amber-500 uppercase transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Qiyməti (AZN) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.5"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Level
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Kasa Vəziyyəti
                  </label>
                  <select
                    value={editKasa}
                    onChange={(e) => setEditKasa(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="Var">Var (Zəngin Kasa)</option>
                    <option value="Yoxdur">Yoxdur (Standart)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Evo Silah Vəziyyəti
                  </label>
                  <select
                    value={editEvoStatus}
                    onChange={(e) => setEditEvoStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all"
                  >
                    <option value="Max">Max (Son Səviyyə)</option>
                    <option value="Orta">Orta (Orta Səviyyə)</option>
                    <option value="Yoxdur">Yoxdur</option>
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hesabdakı Əşyalar Haqqında Ətraflı Məlumat (SEO / Meta Data) *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={editItemsDetails}
                    onChange={(e) => setEditItemsDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-amber-500 transition-all leading-relaxed"
                  ></textarea>
                </div>

              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  İmtina Et
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/15 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Dəyişiklikləri Yadda Saxla</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
