import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  FileText, 
  Download, 
  CheckCircle2, 
  UploadCloud, 
  Layers, 
  Sparkles,
  Flame,
  Star,
  FileCheck
} from 'lucide-react';
import { getAcademicSubjects } from '../lib/contentStore';

export default function AcademicHub() {
  const [subjects, setSubjects] = useState(() => getAcademicSubjects());
  const [activeSubjectId, setActiveSubjectId] = useState(() => (getAcademicSubjects()[0]?.id || 'pa'));
  const [downloadingTitle, setDownloadingTitle] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      const fresh = getAcademicSubjects();
      setSubjects(fresh);
    };
    window.addEventListener('content_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('content_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const activeSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0] || {
    id: 'pa',
    name: 'Subject',
    code: '000',
    badge: 'General',
    description: '',
    resources: []
  };

  const subjectColors = {
    pa: 'bg-[#fde047]', // Yellow
    pp: 'bg-[#fed7aa]', // Peach
    sej: 'bg-[#fbcfe8]', // Pink
    eko: 'bg-[#c4b5fd]', // Lavender
    matht: 'bg-[#67e8f9]', // Cyan
    mathm: 'bg-[#bae6fd]', // Sky Blue
    bm: 'bg-[#fef08a]', // Yellow
    bc: 'bg-[#fecdd3]', // Rose
    kimia: 'bg-[#67e8f9]', // Cyan
    fizik: 'bg-[#a5f3fc]', // Electric Cyan
    bio: 'bg-[#4ade80]', // Green
    muet: 'bg-[#f472b6]', // Hot Pink
    chem: 'bg-[#67e8f9]',
    math: 'bg-[#67e8f9]',
  };

  const handleDownload = (res) => {
    setDownloadingTitle(res.title);
    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#facc15', '#38bdf8', '#4ade80', '#f472b6'],
      });
    } catch (e) {}

    if (res.pdfData) {
      const link = document.createElement('a');
      link.href = res.pdfData;
      link.download = res.fileName || `${res.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (res.link && res.link !== '#') {
      window.open(res.link, '_blank');
    }

    setTimeout(() => {
      setDownloadingTitle(null);
    }, 2000);
  };

  return (
    <section id="academic" className="py-16 px-4 sm:px-6 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#fde047] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>STPM ACADEMIC HUB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Subject Binders & Revision Notes
            </h2>
            <p className="mt-1 text-slate-700 font-bold text-xs sm:text-sm">
              Comprehensive notes, formula booklets, past-year drills, and essay formats curated for SMJK Chung Hwa students.
            </p>
          </div>

          <a
            href="#voice"
            className="neo-btn bg-[#a7f3d0] hover:bg-[#86efac] text-black text-xs px-4 py-2.5 gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Contribute Notes / Resources</span>
          </a>
        </div>

        {/* Interactive Chunky Binder Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {subjects.map((sub) => {
            const isActive = sub.id === activeSubjectId;
            const color = subjectColors[sub.id] || 'bg-[#fef08a]';
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubjectId(sub.id)}
                className={`px-4 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 flex items-center gap-2.5 border-2 border-black cursor-pointer ${
                  isActive
                    ? `${color} text-black shadow-[4px_4px_0px_#000000] translate-x-[-2px] translate-y-[-2px]`
                    : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <span>{sub.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-black text-white font-mono-clean font-bold">
                  {sub.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Subject Description Card (Neobrutalist Banner) */}
        <div className={`p-6 rounded-2xl border-3 border-black ${subjectColors[activeSubject.id]} shadow-[4px_4px_0px_#000] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase">{activeSubject.name}</h3>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-md border-2 border-black bg-white text-black">
                {activeSubject.badge}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-black font-bold max-w-2xl">
              {activeSubject.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-clean font-black text-black bg-white px-3.5 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>{activeSubject.resources.length} Modules Available</span>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {activeSubject.resources.map((res, index) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                whileHover={{ y: -4, x: -3 }}
                className="neo-card p-5 bg-white border-2.5 border-black flex flex-col justify-between"
              >
                <div>
                  {/* Top file type badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono-clean font-black px-2 py-0.5 rounded border border-black bg-[#fef08a] text-black">
                      <FileText className="w-3 h-3" />
                      {res.type}
                    </span>
                    <span className="text-[11px] font-mono-clean font-bold text-slate-500">
                      {res.pages}
                    </span>
                  </div>

                  {/* Resource Title */}
                  <h4 className="text-sm sm:text-base font-black text-black leading-snug hover:text-blue-600 transition-colors">
                    {res.title}
                  </h4>

                  {res.pdfData && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono-clean font-bold bg-[#bbf7d0] text-emerald-950 px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                      <FileCheck className="w-3 h-3 text-emerald-700" />
                      <span>PDF Tersemat Siap Muat Turun</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
                  <span className="text-[11px] text-black font-mono-clean font-bold">
                    {res.downloads || 0} downloads
                  </span>

                  <button
                    onClick={() => handleDownload(res)}
                    className="neo-btn bg-[#67e8f9] hover:bg-[#38bdf8] text-black text-xs px-3 py-1.5 gap-1.5"
                  >
                    {downloadingTitle === res.title ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                        <span className="font-black">Ready!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>{res.pdfData ? 'Muat Turun PDF' : 'Get PDF'}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Student Contribution Callout Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[#fed7aa] border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border-2 border-black text-black flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_#000] shrink-0">
              💡
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-black">
                Have good revision notes or past-year trial questions?
              </h4>
              <p className="text-xs sm:text-sm text-black font-bold mt-0.5">
                Share your materials with the Chung Hwa Form 6 community. Verified submissions will earn academic badges from PETINAM!
              </p>
            </div>
          </div>

          <a
            href="#voice"
            className="neo-btn bg-black text-white hover:bg-slate-800 text-xs font-black px-5 py-3 shrink-0"
          >
            Submit Material via Form
          </a>
        </div>

      </div>
    </section>
  );
}
