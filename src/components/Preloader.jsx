import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Coffee, GraduationCap, CheckCircle2, Zap } from 'lucide-react';

const LOADING_STEPS = [
  { threshold: 0, text: 'Mengambil nota Pengajian Am & fail STPM...', icon: BookOpen },
  { threshold: 25, text: 'Menyusun jadual waktu & arkib PETINAM...', icon: Coffee },
  { threshold: 50, text: 'Memanaskan cawan kopi Form 6 & bilik rehat...', icon: Zap },
  { threshold: 75, text: 'Menghubungkan ke Portal Rasmi S.M.C.H...', icon: Sparkles },
  { threshold: 92, text: 'Menyiapkan antaramuka neobrutalis...', icon: GraduationCap },
  { threshold: 100, text: 'Semua sistem siap! Selamat datang ke S.M.C.H. 🎓', icon: CheckCircle2 },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock background scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Simulate natural fast-paced loading
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear increments for a realistic energetic feel
      const increment = Math.floor(Math.random() * 8) + 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            document.body.style.overflow = originalOverflow;
            if (onComplete) onComplete();
          }, 650); // Shutter wipe duration
        }, 320); // Small pause at 100% to let user see "100%"
      }
    }, 45);

    // Allow keyboard Escape to skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(interval);
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 200);
  };

  // Find active step based on progress
  const currentStep = [...LOADING_STEPS].reverse().find((step) => progress >= step.threshold) || LOADING_STEPS[0];
  const StepIcon = currentStep.icon;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#fdfbf7] figma-neo-canvas flex flex-col items-center justify-center p-4 sm:p-6 select-none border-b-6 border-black"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Playful Floating Geometric Neobrutalist Badges */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-8 left-8 hidden sm:flex items-center justify-center w-14 h-14 bg-[#fde047] border-2.5 border-black rounded-2xl shadow-[4px_4px_0px_#000] font-black text-xl"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 right-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#f472b6] border-2.5 border-black rounded-xl shadow-[4px_4px_0px_#000] text-xs font-black text-black uppercase"
      >
        <span>⚡</span>
        <span>EST. 1918</span>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-10 hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#67e8f9] border-2.5 border-black rounded-xl shadow-[4px_4px_0px_#000] text-xs font-mono-clean font-black text-black"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>PORTAL_ACTIVE</span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [2, -2, 2] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 right-10 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#a3e635] border-2.5 border-black rounded-xl shadow-[4px_4px_0px_#000] text-xs font-mono-clean font-black text-black"
      >
        <span>🎓</span>
        <span>STPM 2026/2027</span>
      </motion.div>

      {/* Main Neobrutalist Preloader Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-white border-3.5 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000000] text-center"
      >
        {/* Top Washi Tape */}
        <div className="washi-tape bg-[#fde047] border-2 border-dashed border-black/30 text-[10px] font-mono-clean font-black flex items-center justify-center tracking-wider uppercase">
          S.M.C.H. SYSTEM BOOT
        </div>

        {/* School Crest with Glowing Neobrutalist Frame */}
        <div className="relative inline-block mt-2 mb-4">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-24 sm:w-24 sm:h-28 mx-auto p-2 bg-[#fffbeb] border-2.5 border-black rounded-2xl shadow-[4px_4px_0px_#000] flex items-center justify-center relative group"
          >
            <img
              src="/smjk-chung-hwa-kelantan-logo.png"
              alt="SMJK Chung Hwa Kelantan Crest"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
            {/* Sparkle badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#fde047] border-2 border-black rounded-full flex items-center justify-center text-xs shadow-[2px_2px_0px_#000]">
              ✨
            </div>
          </motion.div>
        </div>

        {/* Titles */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#fde047] rounded-lg text-[11px] font-mono-clean font-black uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TINGKATAN 6 • PETINAM
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
            SMJK CHUNG HWA
          </h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            吉蘭丹中華國民型中學 • KOTA BHARU
          </p>
        </div>

        {/* Digital Counter & Status */}
        <div className="bg-[#f8fafc] border-2.5 border-black rounded-2xl p-4 mb-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[11px] font-mono-clean font-black text-slate-500 uppercase tracking-wider">
              MEMUAT TURUN SISTEM
            </span>
            <div className="text-3xl sm:text-4xl font-mono-clean font-black text-black tracking-tight flex items-baseline">
              <span>{progress}</span>
              <span className="text-lg text-[#f472b6] ml-0.5">%</span>
            </div>
          </div>

          {/* Chunky Neobrutalist Progress Bar */}
          <div className="w-full h-6 bg-white border-2 border-black rounded-xl p-1 overflow-hidden shadow-inner relative">
            <motion.div
              className="h-full rounded-lg bg-gradient-to-r from-[#fde047] via-[#67e8f9] to-[#f472b6] border-r-2 border-black"
              style={{
                width: `${progress}%`,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.08) 8px, rgba(0,0,0,0.08) 16px)',
              }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Dynamic Micro-Status Message */}
        <div className="min-h-[44px] flex items-center justify-center px-3 py-2 bg-[#fffbeb] border-2 border-black rounded-xl text-xs font-bold text-slate-800 shadow-[2px_2px_0px_#000] gap-2">
          <StepIcon className="w-4 h-4 text-black shrink-0 animate-bounce" />
          <span className="truncate">{currentStep.text}</span>
        </div>

        {/* Skip button for rapid users */}
        <div className="mt-4 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-mono-clean font-medium">
            Form 6 Excellence Portal
          </span>
          <button
            type="button"
            onClick={handleSkip}
            className="font-mono-clean font-black text-black hover:text-[#e11d48] transition-colors underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <span>[ Langkau / Skip ]</span>
          </button>
        </div>
      </motion.div>

      {/* Footer copyright stamp */}
      <div className="mt-6 text-center text-slate-400 text-[11px] font-mono-clean font-bold">
        © {new Date().getFullYear()} S.M.C.H. KELANTAN • POWERED BY PETINAM
      </div>
    </motion.div>
  );
}
