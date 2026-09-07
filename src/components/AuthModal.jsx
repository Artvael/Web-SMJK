import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../lib/authStore';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('Upper 6 Science 1 (6S1)');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await loginWithEmail(email, password);
        if (res.success) {
          setSuccessMsg(`Selamat datang kembali, ${res.user.name}!`);
          setTimeout(() => {
            onAuthSuccess?.(res.user);
            onClose();
          }, 800);
        } else {
          setErrorMsg(res.message || 'Gagal log masuk.');
        }
      } else {
        const res = await registerWithEmail(name, email, password, studentClass);
        if (res.success) {
          setSuccessMsg(`Pendaftaran berjaya! Selamat datang ke portal, ${res.user.name}.`);
          setTimeout(() => {
            onAuthSuccess?.(res.user);
            onClose();
          }, 800);
        } else {
          setErrorMsg(res.message || 'Gagal mendaftar akaun.');
        }
      }
    } catch {
      setErrorMsg('Ralat rangkaian. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await signInWithGoogle();
      if (res.success) {
        if (res.redirecting) return; // Supabase OAuth redirecting to Google
        setSuccessMsg(`Berjaya log masuk dengan Google sebagai ${res.user.name}!`);
        setTimeout(() => {
          onAuthSuccess?.(res.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.message || 'Log masuk Google dibatalkan.');
      }
    } catch {
      setErrorMsg('Gagal menyambung ke perkhidmatan Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        
        {/* Backdrop click dismiss */}
        <div 
          className="absolute inset-0 cursor-pointer" 
          onClick={onClose} 
          aria-hidden="true" 
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000000] p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Top Washi Tape */}
          <div className="washi-tape left-1/2 -translate-x-1/2 w-32 h-6 bg-[#67e8f9] border border-black shadow-[1.5px_1.5px_0px_#000] rotate-[-1deg] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono-clean font-black text-black tracking-widest uppercase">
              PORTAL AUTH
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-rose-200 border-2 border-black rounded-xl text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Header Title */}
          <div className="text-center mt-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#fde047] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center mx-auto mb-2.5 rotate-[-2deg]">
              <ShieldCheck className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
              {mode === 'login' ? 'Log Masuk Portal' : 'Daftar Akaun Pelajar'}
            </h3>
            <p className="text-xs text-slate-600 font-bold mt-1">
              {mode === 'login' 
                ? 'Akses kawalan Admin & pengurusan rasmi PETINAM' 
                : 'Sertai komuniti digital Tingkatan 6 SMJK Chung Hwa'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl border-2.5 border-black p-1 bg-slate-100 mb-5 shadow-[2px_2px_0px_#000]">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-mono-clean font-black rounded-lg transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-black text-white shadow-[1.5px_1.5px_0px_#fde047]' 
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Log Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-1.5 text-xs font-mono-clean font-black rounded-lg transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-black text-white shadow-[1.5px_1.5px_0px_#fde047]' 
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Daftar Akaun
            </button>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-100 border-2 border-black rounded-xl text-xs font-bold text-rose-800 flex items-center gap-2 shadow-[2px_2px_0px_#000]">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-100 border-2 border-black rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-[2px_2px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Official Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full neo-btn bg-white hover:bg-slate-50 text-black text-xs sm:text-sm font-black py-3 px-4 gap-3 justify-center shadow-[3px_3px_0px_#000] mb-4 cursor-pointer transition-all"
          >
            {/* Google Colorful "G" Logo SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t-2 border-black/20" />
            <span className="shrink mx-3 text-[10px] font-mono-clean font-black text-slate-500 uppercase tracking-wider">
              ATAU EMEL & KATA LALUAN
            </span>
            <div className="flex-grow border-t-2 border-black/20" />
          </div>

          {/* 2. Email & Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                  Nama Penuh
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Artvael Victor / Siti Aminah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 pl-9 pr-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Alamat Emel
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@smjkchunghwa.edu.my"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 pl-9 pr-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Kata Laluan
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 pl-9 pr-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                  Kelas Tingkatan 6
                </label>
                <div className="relative">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full bg-slate-50 pl-9 pr-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000] cursor-pointer"
                  >
                    <option>Upper 6 Science 1 (6S1)</option>
                    <option>Upper 6 Science 2 (6S2)</option>
                    <option>Upper 6 Arts 1 (6A1)</option>
                    <option>Upper 6 Arts 2 (6A2)</option>
                    <option>Lower 6 Science 1</option>
                    <option>Lower 6 Arts 1</option>
                    <option>Majlis Pentadbiran PETINAM</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full neo-btn bg-[#fde047] hover:bg-[#facc15] disabled:bg-slate-200 text-black text-xs sm:text-sm font-black py-3 px-4 gap-2 justify-center shadow-[3px_3px_0px_#000] cursor-pointer mt-2"
            >
              <span>{loading ? 'Memproses...' : mode === 'login' ? 'Log Masuk ➔' : 'Daftar Akaun ➔'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-5 text-center">
            <p className="text-[10px] font-mono-clean font-bold text-slate-500">
              SMJK Chung Hwa Kelantan • Hak Cipta Terpelihara PETINAM 2026/2027
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
