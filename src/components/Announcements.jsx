import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellRing, 
  Pin, 
  Calendar, 
  User, 
  Search, 
  Share2, 
  Check, 
  Sparkles,
  Flame,
  Star
} from 'lucide-react';
import { announcements } from '../data/initialData';

export default function Announcements() {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'ALL', label: 'All Notices', bg: 'bg-white' },
    { id: 'IMPORTANT', label: '📢 Important', bg: 'bg-[#f87171]' },
    { id: 'ACADEMIC', label: '📚 Academic', bg: 'bg-[#67e8f9]' },
    { id: 'COMPETITION', label: '🏆 Competitions', bg: 'bg-[#fde047]' },
    { id: 'PETINAM', label: '👑 Council', bg: 'bg-[#4ade80]' },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesFilter = filter === 'ALL' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleShare = (id, title) => {
    navigator.clipboard.writeText(`${title} - Read more on SMJK Chung Hwa Form 6 Portal`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="announcements" className="py-16 px-4 sm:px-6 figma-neo-canvas border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f472b6] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
              <BellRing className="w-3.5 h-3.5" />
              <span>OFFICIAL BULLETIN BOARD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Announcements & Notices
            </h2>
            <p className="mt-1 text-slate-700 font-bold text-xs sm:text-sm">
              No more <em>“Eh, tomorrow got meeting ah?”</em> 😂 Check verified school and council updates here.
            </p>
          </div>

          {/* Neobrutalist Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-black absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[3px_3px_0px_#000000] focus:shadow-[5px_5px_0px_#000000] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 border-black transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-[3px_3px_0px_#fde047] translate-x-[-1px] translate-y-[-1px]'
                    : `${cat.bg} text-black hover:bg-slate-100 shadow-[2.5px_2.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Notice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredAnnouncements.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4, x: -3 }}
                className="neo-card relative p-6 bg-white border-3 border-black flex flex-col justify-between"
              >
                {/* Visual Pin / Washi Tape at top */}
                <div className="absolute -top-3.5 left-8 px-3 py-0.5 bg-[#fef08a] border-2 border-black rounded-md text-[10px] font-mono-clean font-black text-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                  <Pin className="w-3 h-3 text-red-600 fill-red-600" />
                  <span>OFFICIAL NOTICE</span>
                </div>

                <div>
                  {/* Category badge & Timestamp */}
                  <div className="flex items-center justify-between pt-1 mb-3">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md border-2 border-black bg-[#bae6fd] text-black shadow-[1.5px_1.5px_0px_#000]">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-black font-mono-clean font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-black">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-black leading-snug">
                    {item.title}
                  </h3>

                  {/* Content */}
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                    {item.content}
                  </p>
                </div>

                {/* Footer with Author & Quick Share */}
                <div className="mt-6 pt-3 border-t-2 border-black flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-black font-extrabold font-mono-clean">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.author}</span>
                  </div>

                  <button
                    onClick={() => handleShare(item.id, item.title)}
                    className="neo-btn bg-white hover:bg-[#fef08a] text-black text-xs px-3 py-1 gap-1"
                    title="Copy announcement link"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span className="text-black font-black">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
