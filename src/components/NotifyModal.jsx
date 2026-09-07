import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Mail
} from 'lucide-react';
import { getGoogleCalendarUrl, downloadIcsFile, triggerBrowserReminder } from '../lib/calendarUtils';

export default function NotifyModal({ isOpen, onClose, eventData }) {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [notifState, setNotifState] = useState({ active: false, msg: '' });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Default to STPM Sem 1 if no specific eventData provided
  const event = eventData || {
    id: 'stpm-sem-1',
    title: 'STPM 2026 Semester 1 Examination Begins',
    date: 'Nov 16, 2026',
    startDate: '2026-11-16T08:00:00',
    endDate: '2026-11-16T17:00:00',
    category: 'STPM Exam',
    description: 'Peperiksaan bertulis Semester 1 STPM yang dikelolakan secara rasmi oleh Majlis Peperiksaan Malaysia (MPM) di SMJK Chung Hwa Kelantan.',
    location: 'Dewan Peperiksaan SMJK Chung Hwa Kelantan',
  };

  // Live countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const targetDate = new Date(event.startDate || '2026-11-16T08:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, event.startDate]);

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    downloadIcsFile({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      filename: `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`,
    });
  };

  const handleBrowserNotification = async () => {
    const res = await triggerBrowserReminder(event.title, `Peringatan: ${event.title} dijadualkan pada ${event.date}.`);
    if (res.granted) {
      setNotifState({ active: true, msg: 'Notifikasi pelayar telah diaktifkan!' });
      // Save to localStorage
      try {
        const key = `notify_${event.id}`;
        localStorage.setItem(key, 'true');
      } catch {}
    } else {
      setNotifState({ active: false, msg: 'Sila benarkan notifikasi pada pelayar anda.' });
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('chung_hwa_notif_emails') || '[]');
      existing.push({ email: email.trim(), eventId: event.id, title: event.title, date: new Date().toISOString() });
      localStorage.setItem('chung_hwa_notif_emails', JSON.stringify(existing));
    } catch {}

    setEmailSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        
        {/* Backdrop click dismiss */}
        <div 
          className="absolute inset-0 cursor-pointer" 
          onClick={onClose} 
          aria-hidden="true" 
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative w-full max-w-lg bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000000] p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Top Washi Tape */}
          <div className="washi-tape left-1/2 -translate-x-1/2 w-32 h-6 bg-[#fde047] border border-black shadow-[1.5px_1.5px_0px_#000] rotate-[-1.5deg] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono-clean font-black text-black tracking-widest uppercase">
              EXAM REMINDER
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-rose-200 border-2 border-black rounded-xl text-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-3 mt-1">
            <div className="inline-flex items-center gap-1.5 bg-[#f87171] text-white border-2 border-black px-3 py-0.8 rounded-full text-xs font-black shadow-[2px_2px_0px_#000]">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>NOTIFY ME • PERINGATAN</span>
            </div>
            <span className="text-[11px] font-mono-clean font-black px-2 py-0.5 bg-[#fef08a] border border-black rounded shadow-[1px_1px_0px_#000]">
              {event.category || 'STPM'}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight leading-snug">
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 font-bold mt-1.5 leading-relaxed">
            {event.description}
          </p>

          {/* Countdown Clock Grid */}
          <div className="my-5 p-4 bg-[#fefce8] border-2.5 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between text-xs font-mono-clean font-black text-slate-700 mb-2 border-b border-black/20 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <span>Hitung Mundur Tarikh Acara:</span>
              </span>
              <span className="text-red-600 underline font-black">{event.date}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000]">
                <span className="text-xl sm:text-2xl font-black text-black font-mono-clean block">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 uppercase">Hari</span>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000]">
                <span className="text-xl sm:text-2xl font-black text-black font-mono-clean block">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 uppercase">Jam</span>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000]">
                <span className="text-xl sm:text-2xl font-black text-black font-mono-clean block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 uppercase">Minit</span>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[2px_2px_0px_#000]">
                <span className="text-xl sm:text-2xl font-black text-red-600 font-mono-clean block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 uppercase">Saat</span>
              </div>
            </div>
          </div>

          {/* Quick Actions for Notification */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-mono-clean font-black text-black uppercase tracking-wider">
              Pilihan Peringatan / Notification Options:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option 1: Google Calendar */}
              <button
                onClick={handleGoogleCalendar}
                className="neo-btn bg-[#67e8f9] hover:bg-[#38bdf8] text-black text-xs font-black py-2.5 px-3.5 gap-2 w-full justify-center shadow-[2.5px_2.5px_0px_#000]"
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span>Google Calendar</span>
              </button>

              {/* Option 2: Download .ics (Apple Calendar / Outlook) */}
              <button
                onClick={handleDownloadIcs}
                className="neo-btn bg-[#fde047] hover:bg-[#facc15] text-black text-xs font-black py-2.5 px-3.5 gap-2 w-full justify-center shadow-[2.5px_2.5px_0px_#000]"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Apple / iCal (.ics)</span>
              </button>
            </div>

            {/* Option 3: Browser Notification */}
            <button
              onClick={handleBrowserNotification}
              className={`neo-btn w-full text-xs font-black py-2.5 px-3.5 gap-2 justify-center shadow-[2.5px_2.5px_0px_#000] ${
                notifState.active ? 'bg-emerald-300 text-black' : 'bg-slate-100 hover:bg-slate-200 text-black'
              }`}
            >
              <Bell className="w-3.5 h-3.5 shrink-0 text-red-600" />
              <span>{notifState.msg || '🔔 Aktifkan Notifikasi Pelayar (Web Push)'}</span>
            </button>
          </div>

          {/* Option 4: Email Reminder Form */}
          <div className="mt-4 pt-3.5 border-t-2 border-black">
            {emailSubmitted ? (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-100 border-2 border-black rounded-xl text-xs font-bold text-emerald-900 shadow-[2px_2px_0px_#000]">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Peringatan telah didaftarkan ke <strong>{email}</strong>. Kami akan mengingatkan anda menjelang tarikh peperiksaan!</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Masukkan emel anda untuk peringatan..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 pl-8 pr-3 py-2 border-2 border-black rounded-xl text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>
                <button
                  type="submit"
                  className="neo-btn bg-black text-white text-xs font-black px-4 py-2 shrink-0 shadow-[2px_2px_0px_#fde047]"
                >
                  Daftar
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-4 text-center">
            <p className="text-[10px] font-mono-clean font-bold text-slate-500">
              SMJK Chung Hwa Kelantan • PETINAM Portal Pelajar Tingkatan 6
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
