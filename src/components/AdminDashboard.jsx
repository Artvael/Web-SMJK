import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  Trash2, 
  LogOut, 
  ArrowLeft, 
  Sparkles, 
  Search, 
  Filter, 
  Plus, 
  Send,
  Camera,
  Crown,
  Clock,
  BellRing
} from 'lucide-react';
import { 
  getTrafficStats, 
  getUserActivityLogs, 
  getRegisteredUsers, 
  logoutUser 
} from '../lib/authStore';
import { getStudentFeedback } from '../lib/supabase';
import { calendarEvents as initialEvents } from '../data/initialData';
import AdminGalleryTab from './admin/AdminGalleryTab';
import AdminPetinamTab from './admin/AdminPetinamTab';
import AdminWeeklyTab from './admin/AdminWeeklyTab';
import AdminAnnouncementsTab from './admin/AdminAnnouncementsTab';

export default function AdminDashboard({ currentUser, onBackToSite, onLogout }) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'users' | 'feedback' | 'calendar'
  const [trafficStats, setTrafficStats] = useState(() => getTrafficStats());
  const [userLogs, setUserLogs] = useState(() => getUserActivityLogs());
  const [registeredUsers, setRegisteredUsers] = useState(() => getRegisteredUsers());
  const [notes, setNotes] = useState(() => getStudentFeedback());
  const [calendarList, setCalendarList] = useState(() => {
    try {
      const saved = localStorage.getItem('chung_hwa_custom_events');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  // Moderation state
  const [searchNotes, setSearchNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [replyTextMap, setReplyTextMap] = useState({});

  // New Event Form State
  const [newEvTitle, setNewEvTitle] = useState('');
  const [newEvDate, setNewEvDate] = useState('');
  const [newEvCategory, setNewEvCategory] = useState('STPM Exam');
  const [newEvDesc, setNewEvDesc] = useState('');
  const [eventSuccessMsg, setEventSuccessMsg] = useState('');

  // Refresh data periodically or on focus
  useEffect(() => {
    setTrafficStats(getTrafficStats());
    setUserLogs(getUserActivityLogs());
    setRegisteredUsers(getRegisteredUsers());
    setNotes(getStudentFeedback());
  }, []);

  // Update Feedback Status
  const handleUpdateStatus = (noteId, newStatus) => {
    try {
      const updated = notes.map((n) => (n.id === noteId ? { ...n, status: newStatus } : n));
      setNotes(updated);
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(updated));
      window.dispatchEvent(new Event('feedback_updated'));
    } catch (e) {
      console.warn('Failed to update status:', e);
    }
  };

  // Add Official PETINAM Reply to Note
  const handleAddReply = (noteId) => {
    const text = (replyTextMap[noteId] || '').trim();
    if (!text) return;

    try {
      const updated = notes.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            adminReply: text,
            adminRepliedAt: new Date().toISOString(),
            status: '✅ Selesai & Dibalas',
          };
        }
        return n;
      });
      setNotes(updated);
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(updated));
      window.dispatchEvent(new Event('feedback_updated'));
      setReplyTextMap((prev) => ({ ...prev, [noteId]: '' }));
    } catch (e) {
      console.warn('Failed to save reply:', e);
    }
  };

  // Delete Feedback Note
  const handleDeleteNote = (noteId) => {
    if (!window.confirm('Adakah anda pasti ingin memadamkan nota ini daripada papan tulis?')) return;
    try {
      const updated = notes.filter((n) => n.id !== noteId);
      setNotes(updated);
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(updated));
      window.dispatchEvent(new Event('feedback_updated'));
    } catch (e) {
      console.warn('Failed to delete note:', e);
    }
  };

  // Add New Calendar Event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvTitle.trim() || !newEvDate.trim()) return;

    const newEv = {
      id: 'ev_' + Date.now(),
      title: newEvTitle.trim(),
      date: newEvDate.trim(),
      category: newEvCategory,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      dotColor: 'bg-amber-500',
      description: newEvDesc.trim() || 'Aktiviti rasmi yang dijadualkan oleh pengurusan SMJK Chung Hwa.',
    };

    const updated = [newEv, ...calendarList];
    setCalendarList(updated);
    try {
      localStorage.setItem('chung_hwa_custom_events', JSON.stringify(updated));
    } catch {}

    setNewEvTitle('');
    setNewEvDate('');
    setNewEvDesc('');
    setEventSuccessMsg('Acara baharu berjaya ditambahkan ke Takwim!');
    setTimeout(() => setEventSuccessMsg(''), 3000);
  };

  // Delete Calendar Event
  const handleDeleteEvent = (id) => {
    if (!window.confirm('Padamkan acara ini daripada takwim?')) return;
    const updated = calendarList.filter((ev) => ev.id !== id);
    setCalendarList(updated);
    try {
      localStorage.setItem('chung_hwa_custom_events', JSON.stringify(updated));
    } catch {}
  };

  const handleLogoutClick = () => {
    logoutUser();
    onLogout?.();
  };

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      !searchNotes ||
      n.name?.toLowerCase().includes(searchNotes.toLowerCase()) ||
      n.title?.toLowerCase().includes(searchNotes.toLowerCase()) ||
      n.message?.toLowerCase().includes(searchNotes.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || n.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-slate-900 font-sans pb-16">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-[#18181b] border-b-4 border-black text-white px-4 sm:px-8 py-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Branding & Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="neo-btn bg-white hover:bg-slate-100 text-black text-xs font-mono-clean font-black px-3 py-1.5 gap-1.5 shadow-[2px_2px_0px_#fde047]"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Ke Laman Utama</span>
            </button>

            <div className="hidden sm:block h-6 w-0.5 bg-zinc-700" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-ping" />
              <h1 className="font-mono-clean font-black text-sm sm:text-base uppercase tracking-tight text-white flex items-center gap-2">
                <span>PETINAM ADMIN CONTROL</span>
                <span className="text-[10px] bg-[#f472b6] text-black px-2 py-0.5 rounded border border-black font-extrabold shadow-[1.5px_1.5px_0px_#fff]">
                  LIVE CMS
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Admin Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-xl">
              <span className="text-sm">{currentUser?.avatar || '👑'}</span>
              <div className="text-left">
                <span className="text-xs font-black text-white block leading-tight">
                  {currentUser?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-yellow-400 font-mono-clean block font-bold">
                  {currentUser?.email || 'admin@smjkchunghwa.edu.my'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              title="Log keluar sesi"
              className="neo-btn bg-[#f87171] hover:bg-rose-500 text-white text-xs font-mono-clean font-black px-3 py-1.5 gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Log Keluar</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8 border-b-2 border-black/20">
          {[
            { id: 'analytics', label: 'Ringkasan & Trafik', icon: Eye, bg: 'bg-[#fde047]' },
            { id: 'gallery', label: '📸 Galeri Foto', icon: Camera, bg: 'bg-[#fef08a]' },
            { id: 'petinam', label: '👑 Ahli PETINAM', icon: Crown, bg: 'bg-[#c4b5fd]' },
            { id: 'weekly', label: '⚡ Jadual Mingguan', icon: Clock, bg: 'bg-[#fed7aa]' },
            { id: 'announcements', label: '📢 Pengumuman', icon: BellRing, bg: 'bg-[#fbcfe8]' },
            { id: 'feedback', label: 'Pengurusan Suara Pelajar', icon: MessageSquare, bg: 'bg-[#f472b6]' },
            { id: 'calendar', label: 'Pengurusan Takwim', icon: Calendar, bg: 'bg-[#4ade80]' },
            { id: 'users', label: 'Log Pengguna & Aktiviti', icon: Users, bg: 'bg-[#67e8f9]' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono-clean font-black text-xs sm:text-sm border-2.5 border-black transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? `${tab.bg} text-black shadow-[4px_4px_0px_#000] translate-y-[-2px]`
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS & TRAFFIC OVERVIEW */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Total Pageviews */}
              <div className="neo-card p-5 bg-[#fefce8] border-3 border-black shadow-[5px_5px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-clean font-black uppercase text-slate-700">
                    Jumlah Tayangan Halaman
                  </span>
                  <div className="p-2 bg-[#fde047] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
                    <Eye className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black font-mono-clean">
                  {trafficStats.pageviews}
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-1">
                  <span>▲ +14% lawatan berbanding minggu lalu</span>
                </span>
              </div>

              {/* Unique Visitors */}
              <div className="neo-card p-5 bg-[#e0f2fe] border-3 border-black shadow-[5px_5px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-clean font-black uppercase text-slate-700">
                    Pelawat Unik (Visitors)
                  </span>
                  <div className="p-2 bg-[#38bdf8] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
                    <Users className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black font-mono-clean">
                  {trafficStats.visitors}
                </h3>
                <span className="text-[11px] font-bold text-slate-600 mt-1 block">
                  Komuniti Tingkatan 6 SMJK Chung Hwa
                </span>
              </div>

              {/* Registered Users */}
              <div className="neo-card p-5 bg-[#fce7f3] border-3 border-black shadow-[5px_5px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-clean font-black uppercase text-slate-700">
                    Akaun Berdaftar
                  </span>
                  <div className="p-2 bg-[#f472b6] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black font-mono-clean">
                  {registeredUsers.length}
                </h3>
                <span className="text-[11px] font-bold text-slate-600 mt-1 block">
                  Termasuk Google & Emel Sekolah
                </span>
              </div>

              {/* Total Feedback Notes */}
              <div className="neo-card p-5 bg-[#dcfce7] border-3 border-black shadow-[5px_5px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-clean font-black uppercase text-slate-700">
                    Nota di Papan Tulis
                  </span>
                  <div className="p-2 bg-[#4ade80] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
                    <MessageSquare className="w-4 h-4 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-black font-mono-clean">
                  {notes.length}
                </h3>
                <span className="text-[11px] font-bold text-slate-600 mt-1 block">
                  Cadangan, Isu, & Penghargaan
                </span>
              </div>

            </div>

            {/* Quick Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Category Breakdown */}
              <div className="neo-card p-6 bg-white border-3 border-black shadow-[5px_5px_0px_#000]">
                <h4 className="font-mono-clean font-black text-base uppercase text-black mb-4 flex items-center gap-2">
                  <span>Pecahan Kategori Suara Pelajar</span>
                </h4>
                <div className="space-y-3 font-mono-clean text-xs font-bold">
                  {[
                    { label: '💡 Suggestion (Cadangan)', color: 'bg-[#fde047]', count: notes.filter(n => n.category === 'Suggestion').length },
                    { label: '🆘 Problem (Aduan & Isu)', color: 'bg-[#fca5a5]', count: notes.filter(n => n.category === 'Problem').length },
                    { label: '❤️ Appreciation (Penghargaan)', color: 'bg-[#fbcfe8]', count: notes.filter(n => n.category === 'Appreciation').length },
                    { label: '📢 Request (Permintaan)', color: 'bg-[#bae6fd]', count: notes.filter(n => n.category === 'Request').length },
                  ].map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-slate-50">
                      <span className="text-black">{cat.label}</span>
                      <span className={`px-2.5 py-0.5 rounded-md border border-black font-black text-black ${cat.color}`}>
                        {cat.count} Nota
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Council Announcement Note */}
              <div className="neo-card p-6 bg-[#fef08a] border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono-clean font-black px-2.5 py-1 rounded-md bg-black text-white mb-3">
                    <ShieldAlert className="w-3.5 h-3.5 text-yellow-300" />
                    <span>PENTADBIRAN PETINAM</span>
                  </div>
                  <h4 className="text-xl font-black text-black uppercase tracking-tight">
                    Sistem Pemantauan & Keselamatan Aktif
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                    Setiap aktiviti pendaftaran akaun, log masuk melalui Google atau Emel, serta pengemukaan borang nota dipantau untuk menjamin ketelusan komuniti Form 6 SMJK Chung Hwa.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono-clean font-black">
                  <span>Server Status: Vercel Ready</span>
                  <span className="text-emerald-700">● 100% Operational</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: USER LOG & REGISTRATIONS (SIAPA YANG MASUK KE WEB) */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Header Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#bae6fd] border-3 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
              <div>
                <h4 className="font-mono-clean font-black text-base text-black uppercase">
                  Log Aktiviti Pengguna & Rekod Log Masuk
                </h4>
                <p className="text-xs text-slate-800 font-bold mt-0.5">
                  Memaparkan rekod sesiapa sahaja yang mendaftar dan log masuk ke portal (Google OAuth vs Emel).
                </p>
              </div>
              <span className="text-xs font-mono-clean font-black bg-white px-3 py-1.5 rounded-xl border-2 border-black self-start sm:self-auto shadow-[2px_2px_0px_#000]">
                {userLogs.length} Rekod Tercatat
              </span>
            </div>

            {/* Table of Activity Logs */}
            <div className="neo-card bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono-clean text-xs">
                <thead>
                  <tr className="bg-black text-white border-b-3 border-black text-[11px] uppercase tracking-wider">
                    <th className="p-3.5">Pengguna / Nama</th>
                    <th className="p-3.5">Emel</th>
                    <th className="p-3.5">Kaedah Masuk</th>
                    <th className="p-3.5">Tindakan</th>
                    <th className="p-3.5">Peranti</th>
                    <th className="p-3.5">Waktu Akses</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-200">
                  {userLogs.map((log) => {
                    const isGoogle = log.method?.toLowerCase().includes('google');
                    return (
                      <tr key={log.id} className="hover:bg-amber-50/60 transition-colors">
                        <td className="p-3.5 font-black text-black flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-slate-100 border border-black flex items-center justify-center font-extrabold text-xs shadow-[1px_1px_0px_#000]">
                            {log.role === 'admin' ? '👑' : '👨‍🎓'}
                          </span>
                          <span>{log.userName}</span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-700">{log.userEmail}</td>
                        <td className="p-3.5">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] ${
                            isGoogle ? 'bg-white text-blue-700' : 'bg-[#fef08a] text-black'
                          }`}>
                            {isGoogle ? '🌐 Google OAuth' : '🔑 Email & Password'}
                          </span>
                        </td>
                        <td className="p-3.5 font-black">
                          <span className="px-2 py-0.5 bg-slate-100 border border-black rounded text-[10px]">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-600">{log.device || 'Web Browser'}</td>
                        <td className="p-3.5 font-bold text-slate-500">
                          {new Date(log.timestamp).toLocaleString('ms-MY', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Registered Users Summary List */}
            <div className="neo-card p-6 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000]">
              <h4 className="font-mono-clean font-black text-base uppercase text-black mb-4">
                Senarai Akaun Pengguna Berdaftar ({registeredUsers.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registeredUsers.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl border-2 border-black bg-[#fefce8] shadow-[2.5px_2.5px_0px_#000] flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs text-black block truncate">{u.name}</span>
                      <span className="text-[11px] text-slate-600 font-bold block truncate">{u.email}</span>
                      <span className="text-[10px] text-slate-500 font-mono-clean block mt-1">
                        {u.studentClass || 'Tingkatan 6'}
                      </span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.8 rounded border border-black shadow-[1px_1px_0px_#000] ${
                      u.role === 'admin' ? 'bg-[#f472b6] text-black' : 'bg-[#67e8f9] text-black'
                    }`}>
                      {u.role === 'admin' ? 'ADMIN' : 'STUDENT'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 3: PENGURUSAN SUARA PELAJAR (FEEDBACK MODERATION) */}
        {activeTab === 'feedback' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Filter & Search Bar */}
            <div className="neo-card p-4 bg-white border-3 border-black rounded-2xl shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchNotes}
                  onChange={(e) => setSearchNotes(e.target.value)}
                  placeholder="Cari nota, nama siswa (contoh: Junaedi), atau kata kunci..."
                  className="w-full bg-slate-50 pl-10 pr-4 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600 shrink-0" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-mono-clean font-black text-black shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="📌 Diterima oleh PETINAM">📌 Diterima</option>
                  <option value="💬 Dalam Tindakan Exco">💬 Dalam Tindakan</option>
                  <option value="✅ Selesai & Dibalas">✅ Selesai & Dibalas</option>
                  <option value="❌ Ditolak">❌ Ditolak</option>
                </select>
              </div>
            </div>

            {/* List of Notes */}
            <div className="space-y-4">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-12 bg-white border-3 border-black rounded-2xl p-6 shadow-[4px_4px_0px_#000]">
                  <p className="text-sm font-black text-slate-700">Tiada nota yang sepadan dengan tapisan ini.</p>
                </div>
              ) : (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="neo-card p-5 sm:p-6 bg-white border-3 border-black rounded-2xl shadow-[5px_5px_0px_#000] flex flex-col gap-4"
                  >
                    {/* Top Row: Category, Author, Current Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/15 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono-clean px-2.5 py-0.5 rounded-md border-2 border-black bg-[#fef08a] text-black shadow-[1.5px_1.5px_0px_#000]">
                          {note.category}
                        </span>
                        <h4 className="font-mono-clean font-black text-sm text-black">
                          {note.title}
                        </h4>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-mono-clean font-black text-slate-500 uppercase">
                          Tukar Status:
                        </label>
                        <select
                          value={note.status || '📌 Diterima oleh PETINAM'}
                          onChange={(e) => handleUpdateStatus(note.id, e.target.value)}
                          className="px-2.5 py-1 bg-white rounded-lg border-2 border-black text-xs font-bold text-black shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                        >
                          <option value="📌 Diterima oleh PETINAM">📌 Diterima</option>
                          <option value="💬 Dalam Tindakan Exco">💬 Dalam Tindakan</option>
                          <option value="✅ Telah Dimaklumkan ke Pihak Sekolah">✅ Dimaklumkan ke Sekolah</option>
                          <option value="✅ Selesai & Dibalas">✅ Selesai</option>
                          <option value="❌ Ditolak">❌ Ditolak</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note.id)}
                          title="Padam nota ini"
                          className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-black rounded-lg shadow-[1.5px_1.5px_0px_#000] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed bg-[#fefce8] p-3.5 rounded-xl border border-black/30">
                      “{note.message}”
                    </p>

                    {/* Author & Timestamp */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-clean font-bold text-slate-600">
                      <span>
                        Pengirim: <strong className="text-black">{note.name}</strong> ({note.studentClass || 'Tingkatan 6'})
                      </span>
                      <span>
                        Dihantar: {note.created_at ? new Date(note.created_at).toLocaleDateString('ms-MY') : 'Hari ini'}
                      </span>
                    </div>

                    {/* Admin Reply Box */}
                    <div className="pt-2 border-t border-black/10">
                      {note.adminReply ? (
                        <div className="p-3 bg-emerald-50 border-2 border-black rounded-xl text-xs font-bold text-emerald-900 shadow-[2px_2px_0px_#000]">
                          <span className="block text-[10px] font-mono-clean font-black text-emerald-700 uppercase mb-1">
                            💬 Balasan Rasmi Majlis PETINAM:
                          </span>
                          <span>{note.adminReply}</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Tulis balasan rasmi PETINAM untuk nota ini..."
                            value={replyTextMap[note.id] || ''}
                            onChange={(e) => setReplyTextMap((prev) => ({ ...prev, [note.id]: e.target.value }))}
                            className="flex-1 bg-slate-50 px-3 py-1.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddReply(note.id)}
                            className="neo-btn bg-[#4ade80] hover:bg-emerald-400 text-black text-xs font-black px-3 py-1.5 gap-1.5 shadow-[2px_2px_0px_#000]"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Balas</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>

          </motion.div>
        )}

        {/* TAB 4: PENGURUSAN TAKWIM & ACARA */}
        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Form Tambah Acara Baharu */}
            <div className="neo-card p-6 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000] lg:col-span-1">
              <h4 className="font-mono-clean font-black text-base uppercase text-black mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-black" />
                <span>Tambah Acara Baharu</span>
              </h4>

              {eventSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-100 border-2 border-black rounded-xl text-xs font-bold text-emerald-800 shadow-[2px_2px_0px_#000]">
                  {eventSuccessMsg}
                </div>
              )}

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Nama Acara / Ujian
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: STPM Sem 2 Registration"
                    value={newEvTitle}
                    onChange={(e) => setNewEvTitle(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Tarikh Paparan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Dec 01, 2026"
                    value={newEvDate}
                    onChange={(e) => setNewEvDate(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={newEvCategory}
                    onChange={(e) => setNewEvCategory(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  >
                    <option value="STPM Exam">STPM Exam</option>
                    <option value="School Exam">School Exam</option>
                    <option value="Deadline">Deadline PBS</option>
                    <option value="PETINAM">PETINAM Meets</option>
                    <option value="Holidays">Cuti Sekolah</option>
                    <option value="Competition">Pertandingan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Keterangan Ringkas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Huraian acara atau arahan untuk pelajar..."
                    value={newEvDesc}
                    onChange={(e) => setNewEvDesc(e.target.value)}
                    className="w-full bg-slate-50 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full neo-btn bg-[#4ade80] hover:bg-emerald-400 text-black text-xs font-black py-3 px-4 shadow-[3px_3px_0px_#000] cursor-pointer"
                >
                  Terbitkan ke Kalendar ➔
                </button>
              </form>
            </div>

            {/* Senarai Acara Sedia Ada */}
            <div className="neo-card p-6 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000] lg:col-span-2">
              <h4 className="font-mono-clean font-black text-base uppercase text-black mb-4">
                Acara Aktif di Kalendar ({calendarList.length})
              </h4>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {calendarList.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-xl border-2 border-black bg-[#fefce8] shadow-[2.5px_2.5px_0px_#000] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono-clean font-black px-2 py-0.5 rounded bg-black text-white">
                          {ev.category}
                        </span>
                        <span className="text-xs font-mono-clean font-bold text-red-600">
                          {ev.date}
                        </span>
                      </div>
                      <h5 className="font-black text-xs sm:text-sm text-black truncate">{ev.title}</h5>
                      <p className="text-[11px] text-slate-700 font-medium truncate mt-0.5">{ev.description}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(ev.id)}
                      title="Padam acara"
                      className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-black rounded-lg shadow-[1.5px_1.5px_0px_#000] shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminGalleryTab />
          </motion.div>
        )}

        {/* TAB: PETINAM COMMITTEE MANAGEMENT */}
        {activeTab === 'petinam' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminPetinamTab />
          </motion.div>
        )}

        {/* TAB: WHAT'S HAPPENING THIS WEEK MANAGEMENT */}
        {activeTab === 'weekly' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminWeeklyTab />
          </motion.div>
        )}

        {/* TAB: ANNOUNCEMENTS MANAGEMENT */}
        {activeTab === 'announcements' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminAnnouncementsTab />
          </motion.div>
        )}

      </main>
    </div>
  );
}
