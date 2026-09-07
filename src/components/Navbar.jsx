import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Bell, 
  Crown, 
  MessageSquare, 
  Compass, 
  Clock, 
  Sparkles,
  MousePointer2,
  Hand,
  LogIn,
  LogOut
} from 'lucide-react';
import { schoolInfo } from '../data/initialData';
import NotifyModal from './NotifyModal';

export default function Navbar({ 
  isMenuOpen = false, 
  currentUser, 
  onOpenAuthModal, 
  onNavigateToAdmin, 
  onLogout 
}) {
  const [daysToExam, setDaysToExam] = useState(0);
  const [activeTool, setActiveTool] = useState('cursor');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);

  // Real-time Smooth Spring Scroll Progress
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 25);
    });
  }, [scrollY]);

  useEffect(() => {
    const examDate = new Date(schoolInfo.stpmCountdownDate);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToExam(diffDays > 0 ? diffDays : 0);
  }, []);

  const navItems = [
    { label: 'Academic Hub', href: '#academic', icon: BookOpen },
    { label: 'Calendar', href: '#calendar', icon: Calendar },
    { label: 'Notices', href: '#announcements', icon: Bell },
    { label: 'PETINAM', href: '#petinam', icon: Crown },
    { label: 'Student Voice', href: '#voice', icon: MessageSquare },
    { label: 'Uni Corner', href: '#university', icon: Compass },
  ];

  return (
    <>
      {/* 1. Global Neobrutalist Scroll Progress Bar (Top Edge) */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/10 z-90 overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-[#fde047] border-b border-black origin-left shadow-[0_1px_4px_rgba(253,224,71,0.6)]"
          style={{ scaleX }}
        />
      </div>

      {/* 2. Floating Animated Navbar Dock */}
      <motion.header 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-70 px-3 sm:px-6 py-2.5 transition-all duration-200 pointer-events-none ${
          isScrolled ? 'backdrop-blur-[6px] bg-white/40' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto">
          
          {/* Left: School Crest + Brand in Neobrutalist Pill */}
          <motion.a 
            href="#" 
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.05 }}
            whileHover={{ y: -2, x: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2.5 bg-white border-2 border-black px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-shadow group ${
              isMenuOpen ? 'max-sm:opacity-0 max-sm:pointer-events-none' : 'opacity-100'
            }`}
          >
            <motion.div 
              className="w-8 h-9 shrink-0"
              whileHover={{ rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="/smjk-chung-hwa-kelantan-logo.png" 
                alt="SMJK Chung Hwa Kelantan Crest" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs tracking-tight text-black uppercase">SMJK CHUNG HWA</span>
                <span className="text-[10px] bg-[#f87171] text-white font-extrabold px-1.5 py-0.2 rounded border border-black shadow-[1px_1px_0px_#000]">KELANTAN</span>
              </div>
              <p className="text-[11px] text-slate-600 font-bold">FORM 6 • S.M.C.H. 1918</p>
            </div>
          </motion.a>

          {/* Center: Figma-style Navigation Dock */}
          <motion.nav 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
            className={`hidden lg:flex items-center gap-1 bg-white border-2 border-black px-2 py-1.5 rounded-2xl transition-shadow ${
              isScrolled ? 'shadow-[5px_5px_0px_#000000]' : 'shadow-[4px_4px_0px_#000000]'
            }`}
          >
            {/* Simulated Figma Tools with Gliding Spring Highlight */}
            <div className="flex items-center gap-1 pr-2 mr-2 border-r-2 border-black">
              <button
                onClick={() => setActiveTool('cursor')}
                title="Select Tool (V)"
                className="relative p-1.5 rounded-lg border border-black transition-all cursor-pointer overflow-hidden"
              >
                {activeTool === 'cursor' && (
                  <motion.div
                    layoutId="figmaActiveIndicator"
                    className="absolute inset-0 bg-[#38bdf8]"
                    transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  />
                )}
                <MousePointer2 className={`w-3.5 h-3.5 relative z-10 ${activeTool === 'cursor' ? 'text-black' : 'text-slate-500'}`} />
              </button>
              <button
                onClick={() => setActiveTool('hand')}
                title="Hand Tool (H)"
                className="relative p-1.5 rounded-lg border border-black transition-all cursor-pointer overflow-hidden"
              >
                {activeTool === 'hand' && (
                  <motion.div
                    layoutId="figmaActiveIndicator"
                    className="absolute inset-0 bg-[#fde047]"
                    transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                  />
                )}
                <Hand className={`w-3.5 h-3.5 relative z-10 ${activeTool === 'hand' ? 'text-black' : 'text-slate-500'}`} />
              </button>
            </div>

            {/* Nav Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold text-slate-800 hover:text-black hover:bg-[#fef08a] border border-transparent hover:border-black hover:shadow-[2px_2px_0px_#000000] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* Right Action Widgets */}
          <motion.div 
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.12 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* STPM Countdown Pill with Notify Me trigger */}
            <motion.button 
              type="button"
              onClick={() => setIsNotifyModalOpen(true)}
              title="Tetapkan peringatan peperiksaan STPM Sem 1"
              whileHover={{ scale: 1.05, y: -1, rotate: [-1, 1, 0] }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 bg-[#fef08a] hover:bg-[#fde047] border-2 border-black px-3 py-1.5 rounded-xl text-xs font-mono-clean text-black font-extrabold shadow-[3px_3px_0px_#000000] cursor-pointer transition-colors"
            >
              <Clock className="w-3.5 h-3.5 animate-pulse text-red-600 shrink-0" />
              <span>STPM Sem 1: <strong className="text-red-600 underline">{daysToExam}d left</strong></span>
              <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                <Bell className="w-2.5 h-2.5 fill-white" />
                <span>NOTIFY</span>
              </span>
            </motion.button>

            {/* Auth / Admin Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                {currentUser.role === 'admin' ? (
                  <motion.button
                    type="button"
                    onClick={onNavigateToAdmin}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 bg-[#fef08a] hover:bg-[#fde047] border-2 border-black px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono-clean text-black font-black shadow-[2.5px_2.5px_0px_#000000] cursor-pointer"
                    title="Buka Panel Pentadbir"
                  >
                    <Crown className="w-3.5 h-3.5 text-black animate-bounce shrink-0" />
                    <span className="hidden md:inline">Panel Admin</span>
                    <span className="md:hidden">Admin</span>
                  </motion.button>
                ) : (
                  <div className="hidden sm:flex items-center gap-1.5 bg-white border-2 border-black px-2.5 py-1.5 rounded-xl text-xs font-mono-clean font-bold shadow-[2px_2px_0px_#000]">
                    <span>{currentUser.avatar || '👨‍🎓'}</span>
                    <span className="max-w-[70px] truncate">{currentUser.name}</span>
                  </div>
                )}

                <motion.button
                  type="button"
                  onClick={onLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 bg-white hover:bg-rose-50 border-2 border-black rounded-xl text-xs text-rose-600 shadow-[2px_2px_0px_#000] cursor-pointer"
                  title={`Log keluar (${currentUser.name})`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={onOpenAuthModal}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 bg-white hover:bg-[#fef08a] border-2 border-black px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono-clean text-black font-extrabold shadow-[2.5px_2.5px_0px_#000000] cursor-pointer transition-colors"
                title="Log Masuk Portal (Email / Google)"
              >
                <LogIn className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="hidden sm:inline">Log Masuk</span>
                <span className="sm:hidden">Login</span>
              </motion.button>
            )}

            {/* Stacked Right Actions: Drop a Note on top, Menu + directly below with clean spacing */}
            <div className="flex flex-col items-end gap-2 w-32 sm:w-36">
              {/* CTA: Drop a Note */}
              <motion.a
                href="#voice"
                whileHover={{ y: -2, x: -1, boxShadow: '4px 4px 0px #000000' }}
                whileTap={{ y: 1, x: 1, boxShadow: '1px 1px 0px #000000' }}
                className="neo-btn bg-[#67e8f9] hover:bg-[#38bdf8] text-black text-xs font-extrabold px-3 py-1.5 w-full justify-center shadow-[2.5px_2.5px_0px_#000000]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-black shrink-0 animate-spin-slow" />
                <span>Drop a Note</span>
              </motion.a>

              {/* Portal target for StaggeredMenu toggle button */}
              <div id="staggered-menu-portal" className="w-full flex justify-end" />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* STPM Exam Countdown & Reminder Modal */}
      <NotifyModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
      />
    </>
  );
}
