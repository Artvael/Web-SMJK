import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellRing, 
  Pin, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  Filter, 
  Sparkles, 
  AlertCircle, 
  Calendar, 
  User, 
  Share2 
} from 'lucide-react';
import { 
  getAnnouncements, 
  addAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../../lib/contentStore';

const CATEGORY_CONFIG = {
  IMPORTANT: {
    label: '📢 Important',
    tag: '📢 PENTING',
    colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeBg: 'bg-[#f87171]',
  },
  ACADEMIC: {
    label: '📚 Academic',
    tag: '📚 AKADEMIK',
    colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeBg: 'bg-[#67e8f9]',
  },
  COMPETITION: {
    label: '🏆 Competitions',
    tag: '🏆 PERTANDINGAN',
    colorClass: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeBg: 'bg-[#fde047]',
  },
  PETINAM: {
    label: '👑 Council',
    tag: '👑 DEWAN SISWA',
    colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeBg: 'bg-[#4ade80]',
  },
};

export default function AdminAnnouncementsTab() {
  const [announcements, setAnnouncements] = useState(() => getAnnouncements());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Form states for new announcement
  const [title, setTitle] = useState('');
  const [type, setType] = useState('IMPORTANT');
  const [tag, setTag] = useState('📢 PENTING');
  const [author, setAuthor] = useState('Pentadbir Tingkatan 6 SMCH');
  const [date, setDate] = useState('Hari ini');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  const refreshAnnouncements = () => {
    setAnnouncements(getAnnouncements());
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    if (CATEGORY_CONFIG[newType]) {
      setTag(CATEGORY_CONFIG[newType].tag);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Sila lengkapkan tajuk dan isi kandungan pengumuman.');
      return;
    }

    const config = CATEGORY_CONFIG[type] || CATEGORY_CONFIG.IMPORTANT;

    addAnnouncement({
      type,
      categoryColor: config.colorClass,
      tag: tag.trim() || config.tag,
      title: title.trim(),
      content: content.trim(),
      date: date.trim() || 'Hari ini',
      author: author.trim() || 'Pengurusan SMJK Chung Hwa',
      pinned,
    });

    refreshAnnouncements();
    setShowAddForm(false);
    setTitle('');
    setContent('');
    setPinned(false);
    setStatusMsg('✅ Notis pengumuman baharu berjaya diterbitkan!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingAnn || !editingAnn.title.trim() || !editingAnn.content.trim()) {
      alert('Sila lengkapkan maklumat pengumuman.');
      return;
    }

    const config = CATEGORY_CONFIG[editingAnn.type] || CATEGORY_CONFIG.IMPORTANT;
    const updated = {
      ...editingAnn,
      categoryColor: config.colorClass,
      tag: editingAnn.tag || config.tag,
    };

    updateAnnouncement(updated);
    refreshAnnouncements();
    setEditingAnn(null);
    setStatusMsg('✅ Pengumuman berjaya dikemas kini!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleDelete = (id, annTitle) => {
    if (window.confirm(`Adakah anda pasti ingin memadamkan notis "${annTitle}"?`)) {
      deleteAnnouncement(id);
      refreshAnnouncements();
      setStatusMsg('🗑️ Notis berjaya dipadamkan.');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const handleTogglePin = (ann) => {
    const updated = { ...ann, pinned: !ann.pinned };
    updateAnnouncement(updated);
    refreshAnnouncements();
    setStatusMsg(updated.pinned ? '📌 Notis disematkan di atas.' : '📍 Notis dinyahsemat.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // Filter & search
  const filteredList = announcements.filter((item) => {
    const matchesFilter = filterType === 'ALL' || item.type === filterType;
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pinnedCount = announcements.filter((a) => a.pinned).length;

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#f472b6] border-2 border-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-black mb-1 shadow-[1.5px_1.5px_0px_#000]">
            <BellRing className="w-3 h-3" />
            <span>Papan Buletin Rasmi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            Pengurusan Pengumuman & Notis
          </h2>
          <p className="text-xs font-bold text-slate-600 mt-0.5">
            Urus kenyataan rasmi sekolah, perubahan waktu kelas, dan makluman penting PETINAM.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="neo-btn bg-[#fde047] hover:bg-yellow-400 text-black text-xs font-mono-clean font-black px-4 py-2.5 gap-2 shadow-[3px_3px_0px_#000] shrink-0 cursor-pointer"
        >
          {showAddForm ? (
            <>
              <X className="w-4 h-4" />
              <span>Tutup Borang</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Cipta Notis Baharu</span>
            </>
          )}
        </button>
      </div>

      {/* Success/Status Alert */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 bg-emerald-100 border-2.5 border-black rounded-xl font-bold text-xs text-emerald-950 shadow-[3px_3px_0px_#000] flex items-center justify-between"
          >
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg('')} className="text-black font-black hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#fefce8] p-4 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-[10px] font-mono-clean font-black uppercase text-slate-600 block mb-1">
            Jumlah Notis
          </span>
          <span className="text-2xl font-black text-black font-mono-clean">{announcements.length}</span>
        </div>

        <div className="bg-[#fee2e2] p-4 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-[10px] font-mono-clean font-black uppercase text-rose-700 block mb-1">
            Disemat (Pinned)
          </span>
          <span className="text-2xl font-black text-rose-950 font-mono-clean">{pinnedCount}</span>
        </div>

        <div className="bg-[#e0f2fe] p-4 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-[10px] font-mono-clean font-black uppercase text-blue-700 block mb-1">
            Akademik / Peperiksaan
          </span>
          <span className="text-2xl font-black text-blue-950 font-mono-clean">
            {announcements.filter((a) => a.type === 'ACADEMIC').length}
          </span>
        </div>

        <div className="bg-[#dcfce7] p-4 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#000]">
          <span className="text-[10px] font-mono-clean font-black uppercase text-emerald-700 block mb-1">
            Aktiviti PETINAM
          </span>
          <span className="text-2xl font-black text-emerald-950 font-mono-clean">
            {announcements.filter((a) => a.type === 'PETINAM').length}
          </span>
        </div>
      </div>

      {/* Add New Announcement Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#fdf4ff] p-6 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000]">
              <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#f472b6] border border-black rounded-lg shadow-[1.5px_1.5px_0px_#000]">
                    <Plus className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-base font-black text-black uppercase font-mono-clean">
                    Borang Notis Pengumuman Baharu
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-1.5 hover:bg-black/10 rounded-lg text-black font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category Type */}
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Kategori Notis
                    </label>
                    <select
                      value={type}
                      onChange={(e) => handleTypeChange(e.target.value)}
                      className="w-full bg-white px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    >
                      <option value="IMPORTANT">📢 PENTING (Important)</option>
                      <option value="ACADEMIC">📚 AKADEMIK (Academic)</option>
                      <option value="COMPETITION">🏆 PERTANDINGAN (Competition)</option>
                      <option value="PETINAM">👑 DEWAN SISWA (PETINAM)</option>
                    </select>
                  </div>

                  {/* Tag Text */}
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Label / Tag
                    </label>
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="e.g. 📢 PENTING"
                      className="w-full bg-white px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>

                  {/* Date Text */}
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Tarikh / Masa Dipaparkan
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. Hari ini, 10:30 AM"
                      className="w-full bg-white px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Tajuk Pengumuman *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Jadual Peperiksaan Percubaan STPM Sem 1 Dikeluarkan"
                      className="w-full bg-white px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>

                  {/* Author / Source */}
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Pihak Berkuasa / Pengirim
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Unit Pengajian Am / Setiausaha PETINAM"
                      className="w-full bg-white px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Isi Kandungan Notis Lengkap *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis makluman terperinci, arahan tindakan kepada pelajar, lokasi atau dokumen berkaitan..."
                    className="w-full bg-white px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                {/* Pin Toggle */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                  <input
                    type="checkbox"
                    id="pinned-new"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="pinned-new" className="text-xs font-black text-black cursor-pointer select-none">
                    📌 Sematkan di Bahagian Atas Papan Kenyataan (Pinned Notice)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="neo-btn bg-slate-200 hover:bg-slate-300 text-black text-xs font-bold px-4 py-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="neo-btn bg-[#4ade80] hover:bg-emerald-400 text-black text-xs font-black px-6 py-2 shadow-[3px_3px_0px_#000] cursor-pointer"
                  >
                    Terbitkan Notis Rasmi ➔
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border-2.5 border-black shadow-[3px_3px_0px_#000]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'ALL', label: 'Semua Notis' },
            { id: 'IMPORTANT', label: '📢 Penting' },
            { id: 'ACADEMIC', label: '📚 Akademik' },
            { id: 'COMPETITION', label: '🏆 Pertandingan' },
            { id: 'PETINAM', label: '👑 Dewan Siswa' },
          ].map((cat) => {
            const isSelected = filterType === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterType(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-clean font-black border-2 border-black transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-[2px_2px_0px_#fde047]'
                    : 'bg-slate-50 hover:bg-slate-100 text-black'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-black absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci notis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 rounded-lg border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
            <p className="text-sm font-mono-clean font-bold text-slate-500">
              Tiada pengumuman ditemui mengikut tapisan semasa.
            </p>
          </div>
        ) : (
          filteredList.map((ann) => {
            const config = CATEGORY_CONFIG[ann.type] || CATEGORY_CONFIG.IMPORTANT;

            return (
              <div
                key={ann.id}
                className={`neo-card p-5 bg-white border-3 border-black rounded-2xl transition-all shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] relative ${
                  ann.pinned ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left Column: Info & Content */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] ${config.badgeBg}`}>
                        {ann.tag || config.tag}
                      </span>

                      {ann.pinned && (
                        <span className="flex items-center gap-1 text-[10px] font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          <Pin className="w-2.5 h-2.5 fill-current" />
                          <span>PINNED</span>
                        </span>
                      )}

                      <span className="text-[11px] font-mono-clean font-bold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{ann.date}</span>
                      </span>

                      <span className="text-[11px] font-mono-clean font-bold text-slate-600 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{ann.author}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-black text-black leading-snug">
                      {ann.title}
                    </h3>

                    <p className="text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-black/20">
                      {ann.content}
                    </p>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleTogglePin(ann)}
                      title={ann.pinned ? 'Nyahsemat' : 'Sematkan di atas'}
                      className={`p-2 rounded-xl border-2 border-black text-xs font-bold shadow-[2px_2px_0px_#000] transition-all cursor-pointer ${
                        ann.pinned
                          ? 'bg-amber-300 hover:bg-amber-400 text-black'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Pin className={`w-3.5 h-3.5 ${ann.pinned ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingAnn(ann)}
                      title="Edit pengumuman"
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-800 border-2 border-black rounded-xl text-xs font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(ann.id, ann.title)}
                      title="Padam pengumuman"
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 border-2 border-black rounded-xl text-xs font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAnn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border-4 border-black p-6 w-full max-w-xl shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#67e8f9] border border-black rounded-lg shadow-[1.5px_1.5px_0px_#000]">
                    <Edit3 className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-base font-black text-black uppercase font-mono-clean">
                    Kemaskini Notis Pengumuman
                  </h3>
                </div>
                <button
                  onClick={() => setEditingAnn(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-black font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={editingAnn.type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        const cfg = CATEGORY_CONFIG[newType];
                        setEditingAnn({
                          ...editingAnn,
                          type: newType,
                          tag: cfg ? cfg.tag : editingAnn.tag,
                        });
                      }}
                      className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black"
                    >
                      <option value="IMPORTANT">📢 PENTING</option>
                      <option value="ACADEMIC">📚 AKADEMIK</option>
                      <option value="COMPETITION">🏆 PERTANDINGAN</option>
                      <option value="PETINAM">👑 DEWAN SISWA</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Label / Tag
                    </label>
                    <input
                      type="text"
                      value={editingAnn.tag || ''}
                      onChange={(e) => setEditingAnn({ ...editingAnn, tag: e.target.value })}
                      className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Tarikh / Masa
                    </label>
                    <input
                      type="text"
                      value={editingAnn.date || ''}
                      onChange={(e) => setEditingAnn({ ...editingAnn, date: e.target.value })}
                      className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Tajuk Notis *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAnn.title}
                    onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Pengirim / Pengarang
                  </label>
                  <input
                    type="text"
                    value={editingAnn.author || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, author: e.target.value })}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Isi Kandungan Notis *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingAnn.content}
                    onChange={(e) => setEditingAnn({ ...editingAnn, content: e.target.value })}
                    className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black"
                  />
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border-2 border-black">
                  <input
                    type="checkbox"
                    id="pinned-edit"
                    checked={!!editingAnn.pinned}
                    onChange={(e) => setEditingAnn({ ...editingAnn, pinned: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="pinned-edit" className="text-xs font-black text-black cursor-pointer select-none">
                    📌 Sematkan di Bahagian Atas (Pinned Notice)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
                  <button
                    type="button"
                    onClick={() => setEditingAnn(null)}
                    className="neo-btn bg-slate-200 hover:bg-slate-300 text-black text-xs font-bold px-4 py-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="neo-btn bg-[#4ade80] hover:bg-emerald-400 text-black text-xs font-black px-6 py-2 shadow-[3px_3px_0px_#000] cursor-pointer"
                  >
                    Simpan Perubahan ➔
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
