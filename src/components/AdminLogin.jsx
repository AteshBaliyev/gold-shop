import React, { useState } from 'react';
import { ShieldAlert, Eye, EyeOff, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onReturnToSite }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin2008') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Daxil etdiyiniz şifrə yalnışdır! Zəhmət olmasa düzgün inzibatçı şifrəsini yazın.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-7 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-500 shadow-sm">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              İnzibatçı Girişi
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Admin panelinə daxil olmaq üçün təyin olunmuş şifrəni daxil edin.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Şifrə
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Şifrəni daxil edin..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-in fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/10 active:scale-95 transition-all cursor-pointer"
          >
            Daxil Ol
          </button>
        </form>

        {/* Return to Site */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            onClick={onReturnToSite}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Mağazanın Ana Səhifəsinə Qayıt</span>
          </button>
        </div>

      </div>
    </div>
  );
}
