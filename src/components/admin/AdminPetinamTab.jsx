import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Check, 
  Sparkles, 
  Smile, 
  Palette 
} from 'lucide-react';
import { 
  getPetinamTeam, 
  addPetinamMember, 
  updatePetinamMember, 
  deletePetinamMember 
} from '../../lib/contentStore';
import { SHORT_CLASSES } from '../../data/initialData';

const COLOR_OPTIONS = [
  { label: 'Kuning (President)', value: 'bg-[#fef08a]' },
  { label: 'Biru Cerah (VP)', value: 'bg-[#bae6fd]' },
  { label: 'Hijau Pudina (Setiausaha)', value: 'bg-[#bbf7d0]' },
  { label: 'Oren Pic (Bendahari)', value: 'bg-[#fed7aa]' },
  { label: 'Ungu Lilac', value: 'bg-[#e9d5ff]' },
  { label: 'Merah Jambu', value: 'bg-[#fecdd3]' },
];

const EMOJI_OPTIONS = ['👩‍💼', '👨‍💼', '🧑‍💻', '📝', '💰', '📊', '📚', '🤝', '📣', '🌱', '⚡', '🏆', '🎯', '🎓'];

export default function AdminPetinamTab() {
  const [team, setTeam] = useState(() => getPetinamTeam());
  const [activeGroup, setActiveGroup] = useState('high'); // 'high' | 'exco'
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [memberClass, setMemberClass] = useState('Tingkatan 6 Atas');
  const [quote, setQuote] = useState('');
  const [avatar, setAvatar] = useState('👨‍💼');
  const [color, setColor] = useState('bg-[#fef08a]');
  const [isPresident, setIsPresident] = useState(false);

  const refreshTeam = () => {
    setTeam(getPetinamTeam());
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      alert('Sila lengkapkan nama dan jawatan ahli.');
      return;
    }

    if (activeGroup === 'high') {
      addPetinamMember('high', {
        name: name.trim(),
        role: role.trim(),
        roleEn: role.trim(),
        class: memberClass.trim() || 'Tingkatan 6 Atas',
        badge: isPresident ? 'Council Head' : 'Executive Role',
        quote: quote.trim() || 'Berkhidmat dengan penuh komitmen demi warga Tingkatan 6.',
        avatar,
        isPresident,
        color,
      });
    } else {
      addPetinamMember('exco', {
        name: name.trim(),
        role: role.trim(),
        class: memberClass.trim() || 'L6',
        icon: avatar,
        color,
        desc: quote.trim() || 'Memimpin inisiatif biro bagi memperkasa pelajar Form 6.',
      });
    }

    refreshTeam();
    setShowAddForm(false);
    setName('');
    setRole('');
    setQuote('');
    setIsPresident(false);
    setStatusMsg(`✅ Ahli baharu berjaya ditambahkan ke ${activeGroup === 'high' ? 'Majlis Tertinggi' : 'Barisan Exco'}!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingMember) return;

    updatePetinamMember(editingMember.group, editingMember);
    refreshTeam();
    setEditingMember(null);
    setStatusMsg('✅ Maklumat ahli berjaya dikemas kini!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleDelete = (group, memberIdOrName, memberName) => {
    if (window.confirm(`Adakah anda pasti ingin memadam ahli "${memberName}" daripada ${group === 'high' ? 'Majlis Tertinggi' : 'Barisan Exco'}?`)) {
      deletePetinamMember(group, memberIdOrName);
      refreshTeam();
      setStatusMsg(`🗑️ Ahli "${memberName}" telah dipadamkan.`);
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  const highList = team.highCommittee || [];
  const excoList = team.excoList || [];

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-[#4ade80] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
              <Crown className="w-4 h-4 text-black" />
            </span>
            <h2 className="font-mono-clean font-black text-lg sm:text-xl text-black uppercase">
              Pengurusan Barisan Kepimpinan PETINAM
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-bold">
            Urus keahlian Majlis Tertinggi (Presiden, Naib Presiden, dll.) serta barisan Exco & Ketua Biro Tingkatan 6.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="neo-btn bg-[#fde047] hover:bg-yellow-400 text-black text-xs sm:text-sm font-black px-4 py-2.5 shadow-[3px_3px_0px_#000] shrink-0"
        >
          {showAddForm ? <X className="w-4 h-4 mr-1.5" /> : <Plus className="w-4 h-4 mr-1.5" />}
          <span>{showAddForm ? 'Tutup Borang' : '+ Tambah Ahli Baharu'}</span>
        </button>
      </div>

      {/* Status Msg */}
      {statusMsg && (
        <div className="p-3.5 bg-[#fef08a] border-2.5 border-black rounded-xl text-black font-black text-xs shadow-[3px_3px_0px_#000] flex items-center gap-2">
          <span>👑</span>
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Group Toggle Pills */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => { setActiveGroup('high'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono-clean font-black border-2.5 border-black cursor-pointer transition-all ${
            activeGroup === 'high' 
              ? 'bg-[#fef08a] text-black shadow-[3px_3px_0px_#000] translate-y-[-2px]' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>👑 Majlis Tertinggi ({highList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveGroup('exco'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono-clean font-black border-2.5 border-black cursor-pointer transition-all ${
            activeGroup === 'exco' 
              ? 'bg-[#38bdf8] text-black shadow-[3px_3px_0px_#000] translate-y-[-2px]' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>⚡ Barisan Exco ({excoList.length})</span>
        </button>
      </div>

      {/* ADD MEMBER FORM */}
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
                ➕ Tambah Ahli ke {activeGroup === 'high' ? 'Majlis Tertinggi' : 'Barisan Exco'}
              </h3>
              <span className="text-[11px] font-mono-clean font-bold text-slate-600">
                Sesi 2026/2027
              </span>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Nama Penuh *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Vannie Liew"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Jawatan / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder={activeGroup === 'high' ? 'Contoh: Presiden, Naib Presiden' : 'Contoh: Exco Akademik, Exco Sukan'}
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

                {/* Class */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono-clean font-black text-black uppercase">
                      Kelas Tingkatan 6
                    </label>
                    <span className="text-[10px] text-slate-500 font-bold">Pilih pantas:</span>
                  </div>
                  <input
                    type="text"
                    list="petinam-class-options"
                    value={memberClass}
                    onChange={(e) => setMemberClass(e.target.value)}
                    placeholder="Contoh: L6SB, L6SP, L6A1, L6A2, L6A3, U6SB..."
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                  <datalist id="petinam-class-options">
                    {SHORT_CLASSES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {SHORT_CLASSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setMemberClass(c)}
                        className={`text-[10px] font-mono-clean font-black px-2 py-0.5 rounded border border-black cursor-pointer transition-colors ${
                          memberClass === c ? 'bg-black text-white' : 'bg-slate-100 hover:bg-slate-200 text-black'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Color */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Warna Kad
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Avatar Emoji Picker */}
              <div>
                <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1.5">
                  Pilih Avatar Ikon: ({avatar})
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatar(emoji)}
                      className={`text-xl p-2 rounded-xl border-2 border-black cursor-pointer transition-transform ${
                        avatar === emoji 
                          ? 'bg-[#fde047] scale-110 shadow-[2px_2px_0px_#000]' 
                          : 'bg-white hover:bg-slate-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Is President Switch (High Committee only) */}
              {activeGroup === 'high' && (
                <div className="p-3 bg-white border-2 border-black rounded-xl flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="presidentToggle"
                    checked={isPresident}
                    onChange={(e) => setIsPresident(e.target.checked)}
                    className="w-4 h-4 text-yellow-500 border-2 border-black rounded"
                  />
                  <label htmlFor="presidentToggle" className="text-xs font-mono-clean font-black text-black cursor-pointer">
                    👑 Tandakan sebagai Presiden Persatuan (Council Head)
                  </label>
                </div>
              )}

              {/* Quote / Description */}
              <div>
                <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                  {activeGroup === 'high' ? 'Kutipan / Motto Aspirasi' : 'Deskripsi Tugas & Tanggungjawab Biro'}
                </label>
                <textarea
                  rows="2"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder={activeGroup === 'high' ? 'Menerajui persatuan dengan integriti...' : 'Bertanggungjawab mengurus bengkel akademik STPM...'}
                  className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="neo-btn bg-[#4ade80] text-black text-xs font-black px-6 py-2.5 shadow-[2px_2px_0px_#000]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span>Simpan Ahli</span>
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

      {/* MEMBERS LIST DISPLAY */}
      {activeGroup === 'high' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highList.map((member, index) => (
            <div
              key={member.id || member.name + index}
              className={`p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between relative ${member.color || 'bg-white'}`}
            >
              {member.isPresident && (
                <div className="absolute -top-3.5 right-3 bg-red-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded border border-black shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-300" />
                  <span>PRESIDEN</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
                    {member.avatar || '👨‍💼'}
                  </div>
                  <div>
                    <h4 className="font-mono-clean font-black text-base text-black leading-tight">
                      {member.name}
                    </h4>
                    <span className="text-xs font-black text-blue-900 uppercase">
                      {member.role}
                    </span>
                  </div>
                </div>

                <span className="inline-block text-[10px] font-mono-clean font-black bg-white border border-black px-2 py-0.5 rounded mb-2">
                  {member.class || 'Tingkatan 6 Atas'}
                </span>

                <p className="text-xs text-slate-800 font-medium italic bg-white/70 p-2.5 rounded-xl border border-black/20 leading-relaxed">
                  “{member.quote}”
                </p>
              </div>

              <div className="pt-3 mt-3 border-t-2 border-black/20 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember({ ...member, group: 'high', originalName: member.name })}
                  className="neo-btn bg-white hover:bg-slate-100 text-black text-xs font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete('high', member.id || member.name, member.name)}
                  className="neo-btn bg-[#fca5a5] hover:bg-rose-300 text-red-950 text-xs font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  <span>Padam</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {excoList.map((exco, index) => (
            <div
              key={exco.id || exco.name + index}
              className={`p-4 rounded-2xl border-2.5 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between ${exco.color || 'bg-white'}`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl bg-white p-1.5 rounded-xl border border-black shadow-[1px_1px_0px_#000]">
                    {exco.icon || '⚡'}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono-clean font-black text-slate-700 uppercase block">
                      {exco.role}
                    </span>
                    <h4 className="font-mono-clean font-black text-sm text-black leading-tight">
                      {exco.name}
                    </h4>
                    {exco.class && (
                      <span className="text-[10px] font-mono-clean font-black text-black bg-white px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] inline-block mt-1">
                        Kelas: {exco.class}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white/60 p-2 rounded-lg border border-black/15">
                  {exco.desc}
                </p>
              </div>

              <div className="pt-2 mt-3 border-t border-black/20 flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditingMember({ ...exco, group: 'exco', originalName: exco.name })}
                  className="neo-btn bg-white hover:bg-slate-100 text-black text-[11px] font-black px-2.5 py-1 shadow-[1px_1px_0px_#000]"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete('exco', exco.id || exco.name, exco.name)}
                  className="neo-btn bg-[#fca5a5] hover:bg-rose-300 text-red-950 text-[11px] font-black px-2.5 py-1 shadow-[1px_1px_0px_#000]"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  <span>Padam</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setEditingMember(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_#000] z-20"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                <h3 className="font-mono-clean font-black text-base uppercase text-black">
                  ✏️ Edit Ahli PETINAM ({editingMember.name})
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="p-1 bg-white border border-black rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Nama Penuh
                  </label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Jawatan
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMember.role}
                      onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Warna Kad
                    </label>
                    <select
                      value={editingMember.color || 'bg-white'}
                      onChange={(e) => setEditingMember({ ...editingMember, color: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    >
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Class */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase">
                      Kelas Tingkatan 6
                    </label>
                    <span className="text-[10px] text-slate-500 font-bold">Pilih pantas:</span>
                  </div>
                  <input
                    type="text"
                    list="petinam-edit-class-options"
                    value={editingMember.class || ''}
                    placeholder="Contoh: L6SB, L6SP, L6A1, L6A2, L6A3, U6SB..."
                    onChange={(e) => setEditingMember({ ...editingMember, class: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                  <datalist id="petinam-edit-class-options">
                    {SHORT_CLASSES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {SHORT_CLASSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setEditingMember({ ...editingMember, class: c })}
                        className={`text-[10px] font-mono-clean font-black px-2 py-0.5 rounded border border-black cursor-pointer transition-colors ${
                          editingMember.class === c ? 'bg-black text-white' : 'bg-slate-100 hover:bg-slate-200 text-black'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Avatar Icon */}
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Avatar Emoji
                  </label>
                  <input
                    type="text"
                    value={editingMember.avatar || editingMember.icon || '👨‍💼'}
                    onChange={(e) => setEditingMember({ 
                      ...editingMember, 
                      avatar: e.target.value,
                      icon: e.target.value 
                    })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    {editingMember.group === 'high' ? 'Kutipan Aspirasi' : 'Deskripsi Tugas'}
                  </label>
                  <textarea
                    rows="3"
                    value={editingMember.quote || editingMember.desc || ''}
                    onChange={(e) => setEditingMember({ 
                      ...editingMember, 
                      quote: e.target.value,
                      desc: e.target.value 
                    })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
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
