import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  MessageSquareHeart, 
  Send, 
  CheckCircle2, 
  Lock,
  ArrowDown
} from 'lucide-react';
import { submitStudentFeedback, getStudentFeedback, fetchRemoteStudentFeedback } from '../lib/supabase';
import { recordActivityLog } from '../lib/authStore';
import { FORM_6_CLASSES } from '../data/initialData';
import VoiceBoard from './VoiceBoard';

export default function StudentVoice() {
  const [category, setCategory] = useState('Suggestion');
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [studentClass, setStudentClass] = useState(FORM_6_CLASSES[0]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Notes state initialized from localStorage/seed
  const [notes, setNotes] = useState(() => getStudentFeedback());
  const [highlightedNoteId, setHighlightedNoteId] = useState(null);

  const refreshNotes = () => {
    setNotes(getStudentFeedback());
  };

  // Automatically re-sync notes if admin replies or changes status in Admin Dashboard
  useEffect(() => {
    // Initial sync with remote Supabase database
    fetchRemoteStudentFeedback().then((remoteNotes) => {
      if (remoteNotes) setNotes(remoteNotes);
    });

    const handleSync = () => {
      setNotes(getStudentFeedback());
    };

    window.addEventListener('feedback_updated', handleSync);
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    return () => {
      window.removeEventListener('feedback_updated', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  const categories = [
    {
      id: 'Suggestion',
      label: 'Suggestion',
      emoji: '💡',
      prompt: 'I think we should have…',
      bg: 'bg-[#fef08a]',
      activeBg: 'bg-[#fde047]',
    },
    {
      id: 'Problem',
      label: 'Problem',
      emoji: '🆘',
      prompt: 'I am having an issue with…',
      bg: 'bg-[#fca5a5]',
      activeBg: 'bg-[#f87171]',
    },
    {
      id: 'Appreciation',
      label: 'Appreciation',
      emoji: '❤️',
      prompt: 'I want to thank…',
      bg: 'bg-[#fbcfe8]',
      activeBg: 'bg-[#f472b6]',
    },
    {
      id: 'Request',
      label: 'Request',
      emoji: '📢',
      prompt: 'Can PETINAM help with…',
      bg: 'bg-[#bae6fd]',
      activeBg: 'bg-[#38bdf8]',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);

    const payload = {
      category,
      name: isAnonymous ? 'Anonymous Student' : (name.trim() || 'Anonymous Student'),
      isAnonymous,
      studentClass,
      title: title.trim() || `${category} regarding Form 6`,
      message: message.trim(),
    };

    const res = await submitStudentFeedback(payload);

    try {
      recordActivityLog({
        userName: payload.name,
        userEmail: isAnonymous ? 'Anonymous' : (name.trim() ? `${name.toLowerCase().replace(/\s+/g, '')}@student.smjkchunghwa.edu.my` : 'Pelajar'),
        role: 'student',
        action: 'SUBMIT_FEEDBACK',
        method: payload.category,
      });
    } catch {
      // Ignore logging error
    }

    setSubmitting(false);
    setSubmitted(true);

    if (res?.data) {
      const newNote = res.data;
      setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== newNote.id)]);
      setHighlightedNoteId(newNote.id);
    } else {
      refreshNotes();
    }

    // Giant Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#fde047', '#f472b6', '#38bdf8', '#4ade80', '#000000'],
      });
    } catch {
      // Ignore confetti errors
    }
  };

  const handleReset = () => {
    setMessage('');
    setTitle('');
    setName('');
    setSubmitted(false);
  };

  return (
    <section id="voice" className="py-16 px-4 sm:px-6 figma-neo-canvas border-b-4 border-black">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#67e8f9] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>DIGITAL LEADERSHIP & FEEDBACK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            “Your Voice Matters”
          </h2>

          <p className="mt-2 text-slate-800 font-bold text-xs sm:text-sm max-w-xl mx-auto">
            Hubungkan terus idea & aduan anda kepada Presiden dan Majlis Tertinggi PETINAM. Setiap nota akan dipaparkan secara telus di papan tulis di bawah!
          </p>

          <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono-clean font-extrabold text-black bg-[#fef08a] border-2 border-black px-3 py-1 rounded-md shadow-[2px_2px_0px_#000]">
            <Lock className="w-3.5 h-3.5 text-black" />
            <span>100% PRIVATE • ANONYMOUS OPTION AVAILABLE</span>
          </div>
        </div>

        {/* Paper Form Container */}
        <div className="neo-card relative p-6 sm:p-10 bg-white border-3 border-black shadow-[6px_6px_0px_#000000]">
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-[#4ade80] text-black rounded-2xl flex items-center justify-center mx-auto mb-4 border-3 border-black shadow-[4px_4px_0px_#000] rotate-3">
                <CheckCircle2 className="w-10 h-10 stroke-[3]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
                Nota Berjaya Dihantar!
              </h3>
              <p className="mt-2 text-sm text-slate-700 font-bold max-w-md mx-auto leading-relaxed">
                Terima kasih! Nota anda telah direkodkan dan kini <strong>langsung tertempel pada Papan Tulis Suara Pelajar</strong> di bawah.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleReset}
                  className="neo-btn bg-[#fde047] text-black text-xs font-black px-6 py-3"
                >
                  Tulis Nota Lain ➔
                </button>
                <a
                  href="#voice-board"
                  className="neo-btn bg-white text-black text-xs font-black px-5 py-3 gap-1.5"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Lihat di Papan Tulis</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Selector (Neobrutalist buttons) */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-2.5 font-mono-clean">
                  1. What kind of note would you like to drop?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-3.5 rounded-2xl border-2.5 border-black text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected 
                            ? `${cat.activeBg} text-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]` 
                            : `${cat.bg} text-black hover:opacity-90 shadow-[1.5px_1.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5`
                        }`}
                      >
                        <span className="text-2xl mb-1">{cat.emoji}</span>
                        <div>
                          <span className="text-xs font-black block uppercase">{cat.label}</span>
                          <span className="text-[10px] font-bold opacity-80 block truncate">{cat.prompt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Student Identity: Anonymous toggle & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-black text-black uppercase tracking-wider font-mono-clean">
                      2. Your Name (Optional)
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-black cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-2 border-black text-blue-600 focus:ring-0 cursor-pointer"
                      />
                      <span>Stay Anonymous</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder={isAnonymous ? "Anonymous Form 6 Student" : "e.g. Junaedi / Jason Tan"}
                    value={isAnonymous ? "" : name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 disabled:bg-slate-100 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5 font-mono-clean">
                    3. Form 6 Class
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000] cursor-pointer"
                  >
                    {FORM_6_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Topic / Subject Line */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5 font-mono-clean">
                  4. Topic / Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Air conditioning in study room, revision timetable, library books..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
                />
              </div>

              {/* Message Details */}
              <div>
                <label className="block text-xs font-black text-black uppercase tracking-wider mb-1.5 font-mono-clean">
                  5. Your Message & Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={
                    category === 'Suggestion'
                      ? 'Tell us your idea and how it can help Chung Hwa Form 6 students...'
                      : category === 'Problem'
                      ? 'Explain the issue you are facing so PETINAM can assist or bring it to teachers...'
                      : category === 'Appreciation'
                      ? 'Who would you like to appreciate and what did they do?'
                      : 'What request or assistance do you need from the student council?'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border-2 border-black text-xs sm:text-sm font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000] leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] font-bold text-slate-500 font-mono-clean">
                  Nota anda akan dipaparkan secara langsung di Papan Tulis Suara Pelajar di bawah.
                </p>

                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  className="w-full sm:w-auto neo-btn bg-[#fde047] hover:bg-[#facc15] disabled:bg-slate-200 text-black text-xs font-black px-6 py-3.5 gap-2"
                >
                  {submitting ? (
                    <span>Submitting Note...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Drop Note to PETINAM ➔</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

        {/* 2. PAPAN TULIS BESAR INTERAKTIF (STUDENT VOICE STICKY BOARD) */}
        <div id="voice-board">
          <VoiceBoard 
            notes={notes} 
            onLikeChange={refreshNotes} 
            highlightedNoteId={highlightedNoteId} 
          />
        </div>

      </div>
    </section>
  );
}
