import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  Heart, 
  Maximize2, 
  X, 
  Sparkles, 
  Calendar, 
  Tag, 
  User, 
  Share2, 
  Check, 
  Film
} from 'lucide-react';
import { getGalleryItems, toggleGalleryLike } from '../lib/contentStore';

const CATEGORIES = [
  { id: 'All', label: 'Semua Kenangan', emoji: '🌟' },
  { id: 'Orientasi', label: 'Minggu Orientasi', emoji: '🎉' },
  { id: 'Hari Sukan', label: 'Hari Sukan & Merentas Desa', emoji: '🏃' },
  { id: 'Graduasi', label: 'Majlis Graduasi', emoji: '🎓' },
  { id: 'Kelas & Ulangkaji', label: 'Kelas & Ulangkaji', emoji: '📚' },
  { id: 'Pertandingan', label: 'Pertandingan & Inovasi', emoji: '🏆' },
];

const CARD_ROTATIONS = ['-rotate-1.5', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-0.5', 'rotate-1.5'];

export default function GallerySection() {
  const [photos, setPhotos] = useState(() => getGalleryItems());
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Sync photos on content updates
  useEffect(() => {
    const handleSync = () => {
      setPhotos(getGalleryItems());
    };
    window.addEventListener('content_updated', handleSync);
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    return () => {
      window.removeEventListener('content_updated', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  const filteredPhotos = photos.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const handleLike = (e, id) => {
    e.stopPropagation();
    const res = toggleGalleryLike(id);
    setPhotos(getGalleryItems());

    if (res.isLiked) {
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
          colors: ['#f43f5e', '#fb7185', '#fde047', '#38bdf8'],
        });
      } catch {
        // Confetti fallback
      }
    }
  };

  const handleShare = (photo) => {
    navigator.clipboard.writeText(`${photo.title} - Kenangan Form 6 SMJK Chung Hwa: ${window.location.origin}/#gallery`);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Ensure enough items to seamlessly span across any ultra-wide screen before repeating
  const reelItems = photos.length >= 6 
    ? photos 
    : [...photos, ...photos, ...photos].slice(0, 8);

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 bg-[#faf8f2] border-b-4 border-black relative overflow-hidden">
      
      {/* 1. 35mm Analog Film Reel Strip (Continuous Seamless Loop) */}
      <div className="mb-10 -mx-4 sm:-mx-6 bg-[#09090b] py-3.5 border-y-3 border-black overflow-hidden relative shadow-[0_4px_12px_rgba(0,0,0,0.25)] select-none">
        {/* Subtle vintage edge gradient shadows */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

        {/* Film Strip Photos Scrolling Container: Track 1 + Track 2 seamlessly looped */}
        <div className="film-reel-marquee flex overflow-hidden items-center">
          {/* Track 1 */}
          <div className="film-track">
            {reelItems.map((p, idx) => (
              <div 
                key={`reel-a-${p.id}-${idx}`}
                onClick={() => setSelectedPhoto(p)}
                className="w-40 sm:w-48 bg-[#18181b] border-2 border-zinc-700 hover:border-[#fde047] rounded-xl p-2 shrink-0 cursor-pointer transition-all duration-200 group shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#fde047] hover:-translate-y-1"
              >
                {/* Top Sprocket Perforations */}
                <div className="flex items-center justify-between px-1 pb-1.5 opacity-80 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                  <span className="text-[8px] font-mono-clean font-black text-amber-400/90 tracking-widest">
                    KODAK 35MM
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                </div>

                {/* Photo Thumbnail */}
                <div className="relative aspect-16/10 rounded-lg overflow-hidden my-1 border border-zinc-700 bg-black">
                  <img 
                    src={p.imageUrl} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                    <span className="text-[9px] font-mono-clean font-black text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/20 truncate max-w-[80%]">
                      🎞️ {p.category}
                    </span>
                    <span className="text-[9px] font-mono-clean font-bold text-yellow-300">
                      ♥ {p.likes || 0}
                    </span>
                  </div>
                </div>

                {/* Bottom Sprocket Perforations & Frame Mark */}
                <div className="flex items-center justify-between px-1 pt-1.5 opacity-80 border-t border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                  <span className="text-[8px] font-mono-clean font-extrabold text-zinc-400">
                    ▶ {((idx) % reelItems.length) + 1}A • SMCH T6
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 (Identical Clone for 100% Seamless Infinite Loop) */}
          <div className="film-track" aria-hidden="true">
            {reelItems.map((p, idx) => (
              <div 
                key={`reel-b-${p.id}-${idx}`}
                onClick={() => setSelectedPhoto(p)}
                className="w-40 sm:w-48 bg-[#18181b] border-2 border-zinc-700 hover:border-[#fde047] rounded-xl p-2 shrink-0 cursor-pointer transition-all duration-200 group shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#fde047] hover:-translate-y-1"
              >
                {/* Top Sprocket Perforations */}
                <div className="flex items-center justify-between px-1 pb-1.5 opacity-80 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                  <span className="text-[8px] font-mono-clean font-black text-amber-400/90 tracking-widest">
                    KODAK 35MM
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                </div>

                {/* Photo Thumbnail */}
                <div className="relative aspect-16/10 rounded-lg overflow-hidden my-1 border border-zinc-700 bg-black">
                  <img 
                    src={p.imageUrl} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                    <span className="text-[9px] font-mono-clean font-black text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/20 truncate max-w-[80%]">
                      🎞️ {p.category}
                    </span>
                    <span className="text-[9px] font-mono-clean font-bold text-yellow-300">
                      ♥ {p.likes || 0}
                    </span>
                  </div>
                </div>

                {/* Bottom Sprocket Perforations & Frame Mark */}
                <div className="flex items-center justify-between px-1 pt-1.5 opacity-80 border-t border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                  <span className="text-[8px] font-mono-clean font-extrabold text-zinc-400">
                    ▶ {((idx) % reelItems.length) + 1}A • SMCH T6
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                    <div className="w-2.5 h-1.5 bg-zinc-300 rounded-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e9d5ff] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
              <Camera className="w-3.5 h-3.5 text-purple-700" />
              <span>STUDENT LIFE & MEMORIES SCRAPBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
              Galeri Kenangan Tingkatan 6
            </h2>
            <p className="mt-2 text-slate-700 font-bold text-xs sm:text-sm max-w-xl">
              Abadikan detik manis, gelak tawa, dan ukhuwah pra-universiti warga <strong>SMJK Chung Hwa Kelantan</strong>. 
              Klik mana-mana foto untuk melihat resolusi penuh & butiran aktiviti!
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 bg-white border-2.5 border-black p-3 rounded-2xl shadow-[3px_3px_0px_#000] self-start md:self-auto font-mono-clean">
            <span className="text-2xl">📸</span>
            <div>
              <span className="block text-xs font-black text-black uppercase">JUMLAH KOLEKSI</span>
              <span className="text-sm font-extrabold text-purple-700">{photos.length} Foto Terpilih</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-clean font-black transition-all shrink-0 cursor-pointer border-2.5 ${
                  isSelected
                    ? 'bg-[#fde047] text-black border-black shadow-[3px_3px_0px_#000000] translate-y-[-2px]'
                    : 'bg-white text-slate-700 border-black hover:bg-slate-50 hover:text-black shadow-[1.5px_1.5px_0px_#000]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full border ${
                  isSelected ? 'bg-black text-[#fde047] border-black' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  {cat.id === 'All' 
                    ? photos.length 
                    : photos.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Polaroid Scrapbook Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="neo-card bg-white p-12 text-center border-3 border-black shadow-[6px_6px_0px_#000] max-w-md mx-auto">
            <div className="w-16 h-16 bg-[#fde047] border-2 border-black rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              📷
            </div>
            <h4 className="font-black text-lg text-black uppercase">Belum Ada Foto Dalam Kategori Ini</h4>
            <p className="text-xs text-slate-600 font-bold mt-1">
              Admin boleh memuat naik foto kenangan baharu melalui Panel Admin.
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start"
          >
            <AnimatePresence>
              {filteredPhotos.map((photo, index) => {
                const rotationClass = CARD_ROTATIONS[index % CARD_ROTATIONS.length];
                const isLiked = localStorage.getItem(`chung_hwa_gal_like_${photo.id}`) === 'true';

                return (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 25 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 25 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: index * 0.05 }}
                    whileHover={{ scale: 1.04, rotate: 0, y: -8, zIndex: 20 }}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`bg-white border-3 border-black p-3.5 pb-5 rounded-2xl shadow-[5px_5px_0px_#000000] hover:shadow-[9px_9px_0px_#000000] transition-shadow duration-200 cursor-pointer flex flex-col justify-between relative ${rotationClass}`}
                  >
                    {/* Realistic Washi Tape at Top */}
                    <div className="washi-tape left-1/2 -translate-x-1/2 w-28 h-5.5 bg-[#fef08a]/90 border border-black shadow-[1px_1px_0px_#000] rotate-[-1deg] flex items-center justify-center pointer-events-none z-10">
                      <span className="text-[9px] font-mono-clean font-black text-black tracking-widest uppercase opacity-75">
                        SMCH T6
                      </span>
                    </div>

                    {/* Image Frame */}
                    <div className="relative aspect-4/3 w-full rounded-xl border-2 border-black overflow-hidden bg-slate-100 group">
                      <img 
                        src={photo.imageUrl} 
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        loading="lazy"
                      />

                      {/* Top Category Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center gap-1 bg-black/85 text-[#fde047] text-[10px] font-mono-clean font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          <Tag className="w-2.5 h-2.5 text-[#fde047]" />
                          <span>{photo.category}</span>
                        </span>
                      </div>

                      {/* Zoom Indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <span className="p-1.5 bg-white text-black border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Bottom Date Tag */}
                      <div className="absolute bottom-2 left-2 z-10">
                        <span className="bg-white/90 text-black text-[9px] font-mono-clean font-extrabold px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          📅 {photo.date}
                        </span>
                      </div>
                    </div>

                    {/* Polaroid Text & Info */}
                    <div className="pt-3">
                      <h3 className="font-mono-clean font-black text-sm text-black leading-snug uppercase tracking-tight">
                        {photo.title}
                      </h3>

                      <p className="text-xs text-slate-700 font-semibold line-clamp-2 mt-1 leading-relaxed">
                        {photo.caption}
                      </p>

                      {/* Polaroid Footer */}
                      <div className="pt-3 mt-3 border-t-2 border-black/15 flex items-center justify-between gap-2 text-xs font-mono-clean">
                        <span className="text-[10px] font-bold text-slate-600 truncate max-w-[140px]">
                          👥 {photo.batch || 'Warga T6'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Like Button */}
                          <button
                            type="button"
                            onClick={(e) => handleLike(e, photo.id)}
                            title="Suka kenangan ini"
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg border-2 border-black font-black text-xs transition-transform active:scale-90 shadow-[1.5px_1.5px_0px_#000] cursor-pointer ${
                              isLiked 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-white text-black hover:bg-rose-50'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white stroke-white' : 'text-rose-500 fill-rose-500'}`} />
                            <span>{photo.likes || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* 2. Fullscreen Zoom Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs">
            {/* Click backdrop to dismiss */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setSelectedPhoto(null)} 
              aria-hidden="true" 
            />

            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full bg-white border-4 border-black rounded-3xl shadow-[10px_10px_0px_#000000] overflow-hidden z-20 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header */}
              <div className="p-4 sm:p-5 bg-[#fef08a] border-b-3 border-black flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl">📸</span>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono-clean font-black bg-black text-[#fde047] px-2 py-0.5 rounded uppercase">
                      {selectedPhoto.category}
                    </span>
                    <h3 className="font-mono-clean font-black text-base sm:text-lg text-black uppercase truncate mt-0.5">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 bg-white hover:bg-rose-100 text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] cursor-pointer shrink-0 transition-transform active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Large Image & Story */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                <div className="w-full aspect-16/10 rounded-2xl border-3 border-black overflow-hidden bg-black shadow-[4px_4px_0px_#000] relative">
                  <img 
                    src={selectedPhoto.imageUrl} 
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain bg-zinc-950"
                  />
                </div>

                <div className="p-4 bg-[#fffbeb] border-2.5 border-black rounded-2xl shadow-[3px_3px_0px_#000]">
                  <h4 className="text-xs font-mono-clean font-black text-black uppercase mb-1">
                    📖 Cerita di Sebalik Kenangan:
                  </h4>
                  <p className="text-sm text-slate-800 font-bold leading-relaxed">
                    “{selectedPhoto.caption}”
                  </p>
                </div>

                {/* Details Meta Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-clean text-xs">
                  <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <span className="text-[10px] text-slate-500 font-bold block">TARIKH ACARA:</span>
                    <span className="font-black text-black">{selectedPhoto.date}</span>
                  </div>

                  <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <span className="text-[10px] text-slate-500 font-bold block">KUMPULAN / BATCH:</span>
                    <span className="font-black text-black">{selectedPhoto.batch || 'Tingkatan 6'}</span>
                  </div>

                  <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <span className="text-[10px] text-slate-500 font-bold block">DIMUAT NAIK OLEH:</span>
                    <span className="font-black text-purple-700">{selectedPhoto.uploadedBy || 'Pentadbir PETINAM'}</span>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t-3 border-black flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, selectedPhoto.id)}
                    className="neo-btn bg-[#f43f5e] hover:bg-rose-600 text-white text-xs sm:text-sm px-4 py-2 font-black shadow-[2px_2px_0px_#000]"
                  >
                    <Heart className="w-4 h-4 mr-1.5 fill-white" />
                    <span>Suka Kenangan Ini ({selectedPhoto.likes || 0})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(selectedPhoto)}
                    className="neo-btn bg-white hover:bg-slate-100 text-black text-xs px-3.5 py-2 font-bold shadow-[2px_2px_0px_#000]"
                  >
                    {copiedId === selectedPhoto.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        <span>Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 mr-1" />
                        <span>Kongsi</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="neo-btn bg-black text-white text-xs px-5 py-2 font-black shadow-[2px_2px_0px_#fde047]"
                >
                  Tutup Pratonton
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
