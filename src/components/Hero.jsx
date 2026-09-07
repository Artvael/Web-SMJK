import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  CalendarDays, 
  BellRing, 
  Trophy, 
  Users2, 
  MessageSquareHeart, 
  ArrowUpRight,
  Pin,
  Sparkles,
  Flame,
  ThumbsUp
} from 'lucide-react';
import { schoolInfo } from '../data/initialData';
import FigmaCursors from './FigmaCursors';

export default function Hero({ currentUser, onNavigateToAdmin }) {
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { x: 0.8, y: 0.4 },
          colors: ['#fde047', '#f472b6', '#38bdf8', '#4ade80'],
        });
      } catch (e) {}
    }
  };

  const quickCards = [
    {
      id: 'academic',
      title: 'Academic Hub',
      desc: 'PA, Chemistry, Biology, Math & MUET notes, past-year drills & formulas',
      icon: BookOpen,
      href: '#academic',
      badge: '5 SUBJECTS',
      bgClass: 'bg-[#fef08a]', // Bright Yellow
      tag: '📚 100+ PDF Notes',
    },
    {
      id: 'calendar',
      title: 'Form 6 Calendar',
      desc: 'STPM exams, internal trials, PBS deadlines & PETINAM meetings',
      icon: CalendarDays,
      href: '#calendar',
      badge: 'COLOR-CODED',
      bgClass: 'bg-[#bae6fd]', // Sky Blue
      tag: '📅 Sem 1 Timeline',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      desc: 'Urgent schedule changes, tuitions & state competition notices',
      icon: BellRing,
      href: '#announcements',
      badge: 'LIVE BULLETIN',
      bgClass: 'bg-[#fecdd3]', // Coral Pink
      tag: '📢 Official Board',
    },
    {
      id: 'achievements',
      title: 'Achievements',
      desc: 'Chung Hwa Form 6 Hall of Fame, Olympiads & debate champions',
      icon: Trophy,
      href: '#achievements',
      badge: 'HALL OF FAME',
      bgClass: 'bg-[#bbf7d0]', // Mint Green
      tag: '🏆 Pride of SMCH',
    },
    {
      id: 'student-life',
      title: 'Student Life',
      desc: 'Memories, orientation, sports day, graduation & batch activities',
      icon: Users2,
      href: '#gallery',
      badge: 'MEMORIES',
      bgClass: 'bg-[#e9d5ff]', // Lilac Purple
      tag: '📸 Form 6 Life',
    },
    {
      id: 'feedback',
      title: 'Student Feedback',
      desc: 'Your Voice Matters: submit ideas, problems & appreciation to council',
      icon: MessageSquareHeart,
      href: '#voice',
      badge: 'CONFIDENTIAL',
      bgClass: 'bg-[#fed7aa]', // Warm Peach
      tag: '💬 PETINAM Direct',
    },
  ];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 figma-neo-canvas overflow-hidden border-b-4 border-black">
      
      {/* Collaborative Figma Multi-User Cursors Animation */}
      <FigmaCursors />

      {/* Top Figma Canvas Coordinates & System Badges */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-3 py-1 rounded-lg text-xs font-mono-clean font-extrabold shadow-[2px_2px_0px_#000000]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse"></span>
          <span>FRAME: DESK_CANVAS</span>
          <span className="text-slate-300">|</span>
          <span className="text-black">{schoolInfo.academicYear}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-clean font-extrabold text-black">
          <span className="bg-[#fef08a] border-2 border-black px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_#000000]">
            📍 KOTA BHARU, KELANTAN
          </span>
          <span className="hidden sm:inline-block bg-white border-2 border-black px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_#000000]">
            KOD: {schoolInfo.schoolCode}
          </span>
          <span className="bg-[#f472b6] text-white border-2 border-black px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_#000000]">
            EST. {schoolInfo.establishedYear}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Hero Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 text-left"
          >
            {/* Animated Welcome Admin Badge / Banner */}
            <AnimatePresence>
              {currentUser?.role === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -16 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="mb-5 p-4 rounded-2xl border-3 border-black bg-[#fef08a] shadow-[5px_5px_0px_#000000] flex flex-wrap items-center justify-between gap-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black text-[#fde047] flex items-center justify-center text-xl shadow-[2px_2px_0px_#fde047] border border-black shrink-0 animate-bounce">
                      👑
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-clean font-black bg-black text-[#fde047] px-2 py-0.5 rounded border border-black uppercase">
                          PETINAM ADMIN ACTIVE
                        </span>
                        <span className="text-[11px] font-extrabold text-slate-700 hidden sm:inline">
                          • Kawalan Portal
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-black tracking-tight mt-0.5">
                        Welcome Admin, {currentUser.name}!
                      </h2>
                      <p className="text-xs text-slate-700 font-bold">
                        Pantau statistik pelawat, semak log pengguna & urus suara pelajar di panel khas.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onNavigateToAdmin}
                    className="neo-btn bg-black hover:bg-slate-800 text-[#fde047] text-xs font-black px-4 py-2.5 shadow-[3px_3px_0px_#000000] cursor-pointer shrink-0 flex items-center gap-1.5 ml-auto sm:ml-0"
                  >
                    <span>Buka Panel Admin</span>
                    <ArrowUpRight className="w-4 h-4 text-[#fde047]" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#a7f3d0] border-2 border-black text-black text-xs font-extrabold px-3 py-1 rounded-full shadow-[2px_2px_0px_#000000]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Digital Home of Tingkatan Enam</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-[#fed7aa] border-2 border-black text-black text-xs font-extrabold px-3 py-1 rounded-full shadow-[2px_2px_0px_#000000]">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Sekolah Tertua di Kelantan</span>
              </span>
            </div>

            {/* School Crest + Big Neobrutalist Title */}
            <div className="flex items-center gap-4 mb-3">
              <motion.div 
                whileHover={{ rotate: [-2, 2, -1, 0], scale: 1.06 }}
                className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-white border-2 border-black p-1.5 rounded-2xl shadow-[4px_4px_0px_#000000] cursor-pointer"
              >
                <img 
                  src="/smjk-chung-hwa-kelantan-logo.png" 
                  alt="SMJK Chung Hwa Kelantan Crest" 
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.08] uppercase">
                  FORM 6 <span className="text-blue-600 underline decoration-wavy decoration-yellow-400">@</span> SMJK CHUNG HWA
                </h1>
                <p className="text-xs sm:text-sm font-extrabold text-slate-700 mt-1 font-mono-clean">
                  吉蘭丹中華國民型中學 • S.M.C.H. KELANTAN
                </p>
              </div>
            </div>

            {/* Motto with Highlighter */}
            <div className="mt-5 text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight flex flex-wrap gap-2">
              <span className="marker-highlight">Your Voice.</span>
              <span className="marker-highlight marker-highlight-cyan">Your Future.</span>
              <span className="marker-highlight marker-highlight-coral">Our Journey.</span>
            </div>

            <p className="mt-4 text-slate-800 text-sm sm:text-base leading-relaxed font-semibold max-w-xl">
              Portal rasmi Pelajar Tingkatan 6 dan Majlis Perwakilan Pelajar (<strong>PETINAM</strong>). 
              Akses cepat ke nota lengkap STPM, bank soalan past-year, jadual perancangan ber-kod warna, dan saluran aspirasi siswa 1-klik!
            </p>

            {/* Neobrutalist CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <a
                href="#academic"
                className="neo-btn bg-[#fde047] hover:bg-[#facc15] text-black text-xs sm:text-sm px-6 py-3"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Explore Academic Hub</span>
              </a>

              <a
                href="#voice"
                className="neo-btn bg-white hover:bg-slate-100 text-black text-xs sm:text-sm px-6 py-3"
              >
                <MessageSquareHeart className="w-4 h-4 mr-2 text-rose-500" />
                <span>Drop a Note to Council</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Neobrutalist President Sticky Note */}
          <motion.div 
            initial={{ opacity: 0, rotate: 3, scale: 0.95 }}
            animate={{ opacity: 1, rotate: 1.5, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Washi Tape visual at top */}
            <div className="washi-tape"></div>

            <div className="neo-card bg-[#fffbeb] border-3 border-black p-6 relative">
              {/* Pushpin at top center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="w-5 h-5 rounded-full bg-red-600 border-2 border-black shadow-[2px_2px_0px_#000]"></div>
              </div>

              {/* Note Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black text-xs font-mono-clean font-extrabold">
                <span className="flex items-center gap-1 text-black">
                  <Pin className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  NOTE FROM PRESIDENT
                </span>
                <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">
                  SEP 2026
                </span>
              </div>

              {/* Handwriting Quote */}
              <p className="mt-4 text-black font-handwriting text-2xl sm:text-3xl leading-snug">
                “Form 6 is not just an exam, it's where we discover our voice, build friendships for life, and chart our university dreams. Let's conquer STPM together! ✨”
              </p>

              {/* Note Footer & Interactive Like Button */}
              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-black">— PETINAM Committee 26/27</p>
                  <p className="text-[11px] text-slate-600 font-bold">SMJK Chung Hwa Kelantan</p>
                </div>

                <button
                  onClick={handleLike}
                  className={`neo-btn text-xs px-3 py-1.5 gap-1.5 transition-all ${
                    hasLiked 
                      ? 'bg-[#4ade80] text-black shadow-[1px_1px_0px_#000] translate-x-0.5 translate-y-0.5' 
                      : 'bg-[#fef08a] text-black hover:bg-[#fde047]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-black' : ''}`} />
                  <span className="font-mono-clean">{likes}</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 6 Quick Action Neobrutalist Cards */}
        <div className="mt-14 sm:mt-18">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-black rounded-sm border border-black shadow-[1px_1px_0px_#000]"></span>
              <h2 className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
                Quick Navigation & Portals
              </h2>
            </div>
            <span className="text-xs font-mono-clean font-bold text-slate-600 bg-white border-2 border-black px-2.5 py-1 rounded-md shadow-[2px_2px_0px_#000]">
              6 DESK MODULES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.id}
                  href={card.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 * idx }}
                  whileHover={{ y: -4, x: -4 }}
                  className={`neo-card group p-5 flex flex-col justify-between cursor-pointer border-3 border-black text-left ${card.bgClass}`}
                >
                  <div>
                    {/* Top Row: Icon and Tag */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] group-hover:rotate-6 transition-transform">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <span className="text-[10px] font-mono-clean font-extrabold px-2 py-0.5 rounded-md bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-black group-hover:text-blue-900 transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>

                    <p className="mt-2 text-xs font-bold text-slate-800 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Strip */}
                  <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono-clean font-extrabold text-black">
                    <span className="bg-white px-2 py-0.5 rounded border border-black">{card.tag}</span>
                    <span className="underline group-hover:text-blue-900">JUMP ➔</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
