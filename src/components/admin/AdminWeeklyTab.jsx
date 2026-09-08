import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  MapPin, 
  Flame, 
  X, 
  Check 
} from 'lucide-react';
import { 
  getWeeklyActivities, 
  addWeeklyActivity, 
  updateWeeklyActivity, 
  deleteWeeklyActivity 
} from '../../lib/contentStore';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['Academic', 'Important', 'Meeting', 'Competition'];

export default function AdminWeeklyTab() {
  const [activities, setActivities] = useState(() => getWeeklyActivities());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAct, setEditingAct] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  // Form states
  const [day, setDay] = useState('Monday');
  const [date, setDate] = useState('Sep 15');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('02:00 PM - 03:30 PM');
  const [venue, setVenue] = useState('Bilik Gerakan Tingkatan 6');
  const [category, setCategory] = useState('Academic');
  const [isUrgent, setIsUrgent] = useState(false);

  const refreshActivities = () => {
    setActivities(getWeeklyActivities());
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Sila masukkan tajuk aktiviti mingguan.');
      return;
    }

    addWeeklyActivity({
      day,
      date: date.trim() || 'Minggu Ini',
      title: title.trim(),
      time: time.trim() || 'Waktu persekolahan',
      venue: venue.trim() || 'Kawasan SMJK Chung Hwa',
      category,
      badgeColor: category === 'Important' 
        ? 'bg-amber-100 text-amber-800 border-amber-200' 
        : category === 'Competition' 
        ? 'bg-purple-100 text-purple-800 border-purple-200'
        : category === 'Meeting'
        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
        : 'bg-blue-100 text-blue-700 border-blue-200',
      isUrgent,
    });

    refreshActivities();
    setShowAddForm(false);
    setTitle('');
    setIsUrgent(false);
    setStatusMsg('✅ Aktiviti mingguan berjaya ditambah!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingAct) return;

    updateWeeklyActivity(editingAct);
    refreshActivities();
    setEditingAct(null);
    setStatusMsg('✅ Aktiviti berjaya dikemas kini!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleDelete = (id, actTitle) => {
    if (window.confirm(`Adakah anda pasti ingin memadam aktiviti "${actTitle}"?`)) {
      deleteWeeklyActivity(id);
      refreshActivities();
      setStatusMsg('🗑️ Aktiviti berjaya dipadamkan.');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-[#67e8f9] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
              <CalendarCheck className="w-4 h-4 text-black" />
            </span>
            <h2 className="font-mono-clean font-black text-lg sm:text-xl text-black uppercase">
              Pengurusan "What's Happening This Week?"
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-bold">
            Kemas kini jadual kelas tambahan, latih tubi MUET, dan mesyuarat penting yang terpapar pada tiket mingguan di laman utama.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="neo-btn bg-[#67e8f9] hover:bg-cyan-300 text-black text-xs sm:text-sm font-black px-4 py-2.5 shadow-[3px_3px_0px_#000] shrink-0"
        >
          {showAddForm ? <X className="w-4 h-4 mr-1.5" /> : <Plus className="w-4 h-4 mr-1.5" />}
          <span>{showAddForm ? 'Tutup Borang' : '+ Tambah Aktiviti Mingguan'}</span>
        </button>
      </div>

      {/* Status Msg */}
      {statusMsg && (
        <div className="p-3.5 bg-[#fef08a] border-2.5 border-black rounded-xl text-black font-black text-xs shadow-[3px_3px_0px_#000] flex items-center gap-2">
          <span>⚡</span>
          <span>{statusMsg}</span>
        </div>
      )}

      {/* ADD ACTIVITY FORM */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="neo-card bg-[#fffbeb] p-6 border-3 border-black shadow-[6px_6px_0px_#000]"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
              <h3 className="font-mono-clean font-black text-base uppercase text-black">
                ➕ Tambah Acara / Aktiviti Mingguan
              </h3>
              <span className="text-[11px] font-mono-clean font-bold text-slate-600">
                Tiket Mingguan
              </span>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Day */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Hari *
                  </label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Tarikh Ringkas *
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: Sep 15"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                  Tajuk Aktiviti / Kelas *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: MUET Speaking Intensive Workshop (Lower 6)"
                  className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Time */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Waktu / Masa
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Contoh: 02:00 PM - 03:30 PM"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

                {/* Venue */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Tempat / Bilik
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Contoh: Bilik Gerakan Tingkatan 6, SMJK Chung Hwa"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>
              </div>

              {/* Urgent Toggle */}
              <div className="p-3 bg-white border-2 border-black rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="urgentToggle"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-red-500 border-2 border-black rounded"
                />
                <label htmlFor="urgentToggle" className="text-xs font-mono-clean font-black text-red-600 flex items-center gap-1.5 cursor-pointer">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Tandakan sebagai Penting / Segera (URGENT Badge)</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="neo-btn bg-[#fde047] text-black text-xs font-black px-6 py-2.5 shadow-[2px_2px_0px_#000]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Simpan Aktiviti</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="neo-btn bg-white text-black text-xs font-bold px-4 py-2.5 shadow-[2px_2px_0px_#000]"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVITIES LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className="neo-card bg-white p-5 border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between relative"
          >
            {act.isUrgent && (
              <div className="absolute -top-3 -right-2 bg-[#f87171] text-white border-2 border-black font-extrabold text-[10px] px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000] rotate-3">
                🔥 URGENT
              </div>
            )}

            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
                <span className="text-xs font-mono-clean font-black bg-[#fef08a] px-2 py-0.5 rounded border border-black uppercase">
                  {act.day}
                </span>
                <span className="text-xs font-mono-clean font-black text-slate-800">
                  {act.date}
                </span>
              </div>

              <h4 className="font-black text-sm text-black uppercase leading-snug mb-3">
                {act.title}
              </h4>

              <div className="space-y-1.5 text-xs text-slate-700 font-bold">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{act.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{act.venue}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t-2 border-black/15 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setEditingAct({ ...act })}
                className="neo-btn bg-white hover:bg-slate-100 text-black text-xs font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(act.id, act.title)}
                className="neo-btn bg-[#fca5a5] hover:bg-rose-300 text-red-950 text-xs font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                <span>Padam</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingAct && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setEditingAct(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_#000] z-20"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                <h3 className="font-mono-clean font-black text-base uppercase text-black">
                  ✏️ Edit Aktiviti Mingguan
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingAct(null)}
                  className="p-1 bg-white border border-black rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Tajuk Aktiviti
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAct.title}
                    onChange={(e) => setEditingAct({ ...editingAct, title: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Hari
                    </label>
                    <select
                      value={editingAct.day}
                      onChange={(e) => setEditingAct({ ...editingAct, day: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    >
                      {DAYS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Tarikh
                    </label>
                    <input
                      type="text"
                      value={editingAct.date}
                      onChange={(e) => setEditingAct({ ...editingAct, date: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Waktu / Masa
                  </label>
                  <input
                    type="text"
                    value={editingAct.time}
                    onChange={(e) => setEditingAct({ ...editingAct, time: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Tempat / Bilik
                  </label>
                  <input
                    type="text"
                    value={editingAct.venue}
                    onChange={(e) => setEditingAct({ ...editingAct, venue: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 border-2 border-black rounded-xl flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editUrgent"
                    checked={editingAct.isUrgent || false}
                    onChange={(e) => setEditingAct({ ...editingAct, isUrgent: e.target.checked })}
                    className="w-4 h-4 text-red-500 border-2 border-black rounded"
                  />
                  <label htmlFor="editUrgent" className="text-xs font-mono-clean font-black text-red-600 cursor-pointer">
                    🔥 Tandakan sebagai URGENT
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => setEditingAct(null)}
                    className="neo-btn bg-white text-black text-xs px-3 py-1.5"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="neo-btn bg-[#4ade80] text-black text-xs font-black px-4 py-1.5"
                  >
                    Simpan Perubahan
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
