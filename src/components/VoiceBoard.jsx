import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pin, 
  Lightbulb, 
  AlertOctagon, 
  Heart, 
  HelpCircle, 
  Search, 
  Sparkles, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { toggleLikeFeedback } from '../lib/supabase';

// Category Configuration & Styling
const CATEGORY_MAP = {
  All: {
    label: 'Semua Papan Nota (All Notes)',
    shortLabel: 'Semua',
    icon: LayoutGrid,
    bg: 'bg-white',
    border: 'border-black',
    accentBg: 'bg-[#fef08a]',
    bannerText: '🌟 Papan Kenyataan Menyeluruh — Semua Suara, Cadangan & Aduan Tingkatan 6 SMJK Chung Hwa',
    colorHex: '#000000',
  },
  Suggestion: {
    label: '💡 Papan Cadangan (Suggestion Board)',
    shortLabel: 'Suggestion',
    icon: Lightbulb,
    bg: 'bg-[#fef9c3]',
    border: 'border-black',
    accentBg: 'bg-[#fde047]',
    bannerText: '💡 Papan Cadangan Tingkatan 6 — Idea bernas pelajar untuk fasiliti, akademik & aktiviti sekolah',
    colorHex: '#eab308',
  },
  Problem: {
    label: '🆘 Papan Aduan & Isu (Problem Board)',
    shortLabel: 'Problem',
    icon: AlertOctagon,
    bg: 'bg-[#fee2e2]',
    border: 'border-black',
    accentBg: 'bg-[#fca5a5]',
    bannerText: '🆘 Papan Aduan & Isu — Masalah pelajar yang dikumpul untuk tindakan pentadbiran & guru',
    colorHex: '#ef4444',
  },
  Appreciation: {
    label: '❤️ Papan Penghargaan (Appreciation Board)',
    shortLabel: 'Appreciation',
    icon: Heart,
    bg: 'bg-[#fce7f3]',
    border: 'border-black',
    accentBg: 'bg-[#fbcfe8]',
    bannerText: '❤️ Papan Penghargaan — Ucapan terima kasih & sokongan moral sesama warga Form 6',
    colorHex: '#ec4899',
  },
  Request: {
    label: '📢 Papan Permintaan (Request Board)',
    shortLabel: 'Request',
    icon: HelpCircle,
    bg: 'bg-[#e0f2fe]',
    border: 'border-black',
    accentBg: 'bg-[#bae6fd]',
    bannerText: '📢 Papan Permintaan — Inisiatif & sokongan yang dimohon daripada Majlis PETINAM',
    colorHex: '#0284c7',
  },
};

// Subtle deterministic card rotation for authentic sticky note feel
const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-1.5', 'rotate-1.5', '-rotate-0.5', 'rotate-0.5', 'rotate-2', '-rotate-2'];

export default function VoiceBoard({ notes = [], onLikeChange, highlightedNoteId = null }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [likesMap, setLikesMap] = useState({});

  // When a new note is added and highlighted, automatically switch to its category or All
  useEffect(() => {
    if (highlightedNoteId) {
      const targetNote = notes.find((n) => n.id === highlightedNoteId);
      if (targetNote && selectedCategory !== 'All' && selectedCategory !== targetNote.category) {
        setSelectedCategory(targetNote.category);
      }
    }
  }, [highlightedNoteId, notes, selectedCategory]);

  // Handle Like Interaction
  const handleLike = (e, noteId) => {
    e.stopPropagation();
    const res = toggleLikeFeedback(noteId);
    if (res.success) {
      setLikesMap((prev) => ({
        ...prev,
        [noteId]: { likes: res.likes, isLiked: res.isLiked },
      }));
      onLikeChange?.();
    }
  };

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { All: notes.length, Suggestion: 0, Problem: 0, Appreciation: 0, Request: 0 };
    notes.forEach((n) => {
      if (counts[n.category] !== undefined) {
        counts[n.category] += 1;
      }
    });
    return counts;
  }, [notes]);

  // Filter notes by category and search query
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        (n.name && n.name.toLowerCase().includes(query)) ||
        (n.title && n.title.toLowerCase().includes(query)) ||
        (n.message && n.message.toLowerCase().includes(query)) ||
        (n.studentClass && n.studentClass.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [notes, selectedCategory, searchQuery]);

  // Time formatter
  const formatTime = (isoString) => {
    if (!isoString) return 'Baru sahaja';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffHrs = Math.floor((now - date) / (1000 * 60 * 60));
      if (diffHrs < 1) return 'Baru sahaja';
      if (diffHrs < 24) return `${diffHrs}j yang lalu`;
      const diffDays = Math.floor(diffHrs / 24);
      if (diffDays === 1) return 'Semalam';
      if (diffDays < 7) return `${diffDays} hari lalu`;
      return date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short' });
    } catch {
      return 'Sebelum ini';
    }
  };

  const activeTheme = CATEGORY_MAP[selectedCategory] || CATEGORY_MAP.All;

  return (
    <div className="mt-12 w-full">
      {/* 1. Main Neobrutalist Board Container (Frame Kayu & Besi Tebal) */}
      <div className="border-4 border-black bg-white rounded-3xl shadow-[8px_8px_0px_#000000] overflow-hidden transition-all">
        
        {/* Board Top Header Toolbar */}
        <div className="bg-[#18181b] border-b-4 border-black text-white px-5 sm:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Board Title & Live Count */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fde047] text-black border-2 border-black shadow-[2px_2px_0px_#fff] flex items-center justify-center shrink-0 rotate-[-2deg]">
                <Pin className="w-5 h-5 fill-black stroke-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-clean font-black uppercase px-2 py-0.5 rounded bg-[#f472b6] text-black border border-black shadow-[1.5px_1.5px_0px_#fff]">
                    Papan Interaktif
                  </span>
                  <span className="text-xs font-mono-clean text-amber-300 font-bold">
                    {filteredNotes.length} Nota Dipaparkan
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white mt-0.5">
                  PAPAN TULIS SUARA PELAJAR
                </h3>
              </div>
            </div>

            {/* Controls Stack: Dropdown Category + Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              
              {/* PRIMARY DROPDOWN CATEGORY SELECTOR (Sesuai Permintaan Pengguna) */}
              <div className="relative min-w-[220px]">
                <label className="block text-[10px] font-mono-clean font-black text-slate-300 uppercase mb-1">
                  Pilih Papan Tulis / Select Board:
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white text-black font-extrabold text-xs sm:text-sm pl-3.5 pr-10 py-2.5 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#fde047] cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="All">🌟 Semua Papan Nota (All Notes)</option>
                    <option value="Suggestion">💡 Papan Cadangan (Suggestion Board)</option>
                    <option value="Problem">🆘 Papan Aduan (Problem Board)</option>
                    <option value="Appreciation">❤️ Papan Penghargaan (Appreciation Board)</option>
                    <option value="Request">📢 Papan Permintaan (Request Board)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[3]" />
                </div>
              </div>

              {/* Search Box */}
              <div className="relative self-end w-full sm:w-56">
                <label className="block text-[10px] font-mono-clean font-black text-slate-300 uppercase mb-1">
                  Cari Nota / Nama:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Contoh: Junaedi, kipas, PA..."
                    className="w-full bg-white text-black font-bold text-xs pl-9 pr-3 py-2.5 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#fff] focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-400"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Quick Pill Tabs for Instant Toggling */}
          <div className="mt-4 pt-3 border-t border-zinc-700 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {Object.keys(CATEGORY_MAP).map((catKey) => {
              const cat = CATEGORY_MAP[catKey];
              const isSelected = selectedCategory === catKey;
              const Icon = cat.icon;
              return (
                <button
                  type="button"
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-clean font-black transition-all shrink-0 cursor-pointer border-2 ${
                    isSelected
                      ? `${cat.accentBg} text-black border-black shadow-[2px_2px_0px_#fff] translate-y-[-1px]`
                      : 'bg-zinc-800 text-slate-300 border-zinc-600 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.shortLabel}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full border ${isSelected ? 'bg-black text-white border-black' : 'bg-zinc-900 text-slate-300 border-zinc-700'}`}>
                    {categoryCounts[catKey]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Banner Inside Board */}
        <div className={`px-5 sm:px-8 py-3 border-b-3 border-black font-mono-clean font-black text-xs flex items-center justify-between transition-colors ${activeTheme.accentBg} text-black`}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate">{activeTheme.bannerText}</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] bg-white border border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000]">
            Kategori Aktif: <strong>{activeTheme.shortLabel}</strong>
          </span>
        </div>

        {/* 2. Chalkboard / Sticky Board Canvas */}
        <div className="p-6 sm:p-10 figma-blueprint-grid min-h-[420px] relative">
          
          <AnimatePresence mode="wait">
            {filteredNotes.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-16 px-4"
              >
                <div className="w-16 h-16 bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_#000] mx-auto flex items-center justify-center mb-3 rotate-3">
                  <Pin className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-xl font-black text-black uppercase">
                  Belum Ada Nota Di Papan Ini
                </h4>
                <p className="text-xs text-slate-600 font-bold max-w-sm mx-auto mt-1">
                  {searchQuery
                    ? `Tiada nota yang sepadan dengan carian "${searchQuery}". Cuba gunakan kata kunci lain.`
                    : 'Jadilah yang terawal menghantar nota ke papan ini menggunakan borang di atas!'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 neo-btn bg-[#fde047] text-black text-xs font-black px-4 py-2"
                  >
                    Reset Carian
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start"
              >
                {filteredNotes.map((note, index) => {
                  const isNew = note.id === highlightedNoteId;
                  const catConfig = CATEGORY_MAP[note.category] || CATEGORY_MAP.Suggestion;
                  const Icon = catConfig.icon;
                  const rotationClass = ROTATIONS[index % ROTATIONS.length];
                  const currentLikes = (likesMap[note.id]?.likes !== undefined) ? likesMap[note.id].likes : (note.likes || 0);
                  const isLiked = likesMap[note.id]?.isLiked || false;

                  return (
                    <motion.div
                      key={note.id}
                      layout
                      initial={{ opacity: 0, scale: 0.88, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: -20 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 20, delay: index * 0.04 }}
                      whileHover={{ y: -6, scale: 1.02, rotate: 0, zIndex: 30 }}
                      className={`relative rounded-2xl border-3 border-black p-5 flex flex-col justify-between transition-shadow duration-200 ${catConfig.bg} shadow-[5px_5px_0px_#000000] hover:shadow-[8px_8px_0px_#000000] ${rotationClass} ${
                        isNew ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''
                      }`}
                    >
                      {/* Realistic Neobrutalist Washi Tape Strip on top */}
                      <div className="washi-tape left-1/2 -translate-x-1/2 w-28 h-5.5 bg-[#fef08a]/90 border border-black shadow-[1.5px_1.5px_0px_#000] rotate-[-1deg] flex items-center justify-center pointer-events-none z-10">
                        <span className="text-[9px] font-mono-clean font-black text-black tracking-widest uppercase opacity-70">
                          PETINAM NOTE
                        </span>
                      </div>

                      {/* Top Bar: Category Pill & Status */}
                      <div className="pt-2 flex items-center justify-between gap-2 mb-3">
                        <div className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.8 rounded-md border-2 border-black shadow-[1.5px_1.5px_0px_#000] ${catConfig.accentBg} text-black font-mono-clean`}>
                          <Icon className="w-3 h-3" />
                          <span>{note.category}</span>
                        </div>

                        {/* Status badge from council */}
                        {note.status && (
                          <span className="text-[9px] font-mono-clean font-bold px-1.5 py-0.5 bg-white/90 border border-black rounded text-black shadow-[1px_1px_0px_#000] truncate max-w-[130px]">
                            {note.status}
                          </span>
                        )}
                      </div>

                      {/* Title of the Note */}
                      <h4 className="font-black text-base sm:text-lg text-black uppercase tracking-tight leading-snug mb-2 font-mono-clean">
                        {note.title}
                      </h4>

                      {/* Message Body */}
                      <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed mb-4 whitespace-pre-wrap bg-white/60 p-3 rounded-xl border border-black/80">
                        “{note.message}”
                      </p>

                      {/* Bottom Author & Class Footer with Like Heart */}
                      <div className="pt-3 border-t-2 border-black/40 flex items-center justify-between gap-2 mt-auto">
                        
                        {/* Author Info */}
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0 font-black text-xs text-black shadow-[1px_1px_0px_#000]">
                            {note.isAnonymous ? '?' : (note.name ? note.name.charAt(0).toUpperCase() : 'U')}
                          </div>
                          <div className="min-w-0">
                            <span className="font-black text-xs text-black block truncate">
                              {note.name || 'Anonymous Student'}
                            </span>
                            <span className="text-[10px] text-slate-700 font-bold block truncate">
                              {note.studentClass || 'Tingkatan 6'}
                            </span>
                          </div>
                        </div>

                        {/* Right: Timestamp & Interactive Like Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono-clean text-slate-700 font-bold">
                            {formatTime(note.created_at)}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleLike(e, note.id)}
                            title="Sokong nota ini"
                            className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg border-2 border-black transition-transform active:scale-90 cursor-pointer shadow-[1.5px_1.5px_0px_#000] ${
                              isLiked ? 'bg-rose-400 text-white' : 'bg-white text-black hover:bg-rose-100'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white stroke-white' : 'text-rose-500 fill-rose-500'}`} />
                            <span>{currentLikes}</span>
                          </button>
                        </div>

                      </div>

                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Board Bottom Footer Bar */}
        <div className="bg-[#f4f4f5] border-t-3 border-black px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono-clean text-slate-700 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
            <span>Papan Sebenar: Disegerakkan secara langsung dengan pangkalan data SMJK Chung Hwa.</span>
          </div>
          <span>PETINAM 2026/2027 • Suara Anda Keutamaan Kami</span>
        </div>

      </div>
    </div>
  );
}
