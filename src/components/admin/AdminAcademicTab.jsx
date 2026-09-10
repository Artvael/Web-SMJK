import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  FolderPlus,
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { 
  getAcademicSubjects, 
  saveAcademicSubjects, 
  addAcademicResource, 
  deleteAcademicResource 
} from '../../lib/contentStore';

export default function AdminAcademicTab() {
  const [subjects, setSubjects] = useState(() => getAcademicSubjects());
  const [selectedSubjectId, setSelectedSubjectId] = useState(() => (getAcademicSubjects()[0]?.id || 'pa'));
  const [statusMsg, setStatusMsg] = useState('');

  // Add resource form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('PDF Note');
  const [newPages, setNewPages] = useState('15 Pages');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    const handleUpdate = () => setSubjects(getAcademicSubjects());
    window.addEventListener('content_updated', handleUpdate);
    return () => window.removeEventListener('content_updated', handleUpdate);
  }, []);

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0] || {
    id: 'pa',
    name: 'Pengajian Am',
    code: '900',
    badge: 'Compulsory',
    description: '',
    resources: []
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Sila masukkan tajuk modul / nota.');
      return;
    }

    addAcademicResource(selectedSubjectId, {
      title: newTitle.trim(),
      type: newType,
      pages: newPages.trim() || 'PDF Document',
      link: newLink.trim() || '#',
    });

    setNewTitle('');
    setNewPages('15 Pages');
    setNewLink('');
    setStatusMsg(`Modul baharu berjaya ditambahkan ke ${activeSubject.name}!`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteResource = (index, resourceTitle) => {
    if (!window.confirm(`Padamkan bahan "${resourceTitle}" daripada ${activeSubject.name}?`)) return;
    deleteAcademicResource(selectedSubjectId, index);
    setStatusMsg('Bahan berjaya dipadamkan.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const subjectBadgeColors = {
    pa: 'bg-[#fde047] text-black',
    chem: 'bg-[#67e8f9] text-black',
    bio: 'bg-[#4ade80] text-black',
    math: 'bg-[#c084fc] text-black',
    muet: 'bg-[#f472b6] text-black',
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-[#fde047] border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-mono-clean font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#fff]">
            <BookOpen className="w-3.5 h-3.5 text-[#fde047]" />
            <span>CLOUD MODUL AKADEMIK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Pengurusan Modul & Nota STPM
          </h2>
          <p className="mt-1 text-slate-800 font-bold text-xs sm:text-sm max-w-2xl">
            Urus bahan rujukan, himpunan soalan ramalan/past-year, dan formula booklet bagi setiap subjek STPM SMJK Chung Hwa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2.5 rounded-2xl border-2 border-black font-mono-clean font-bold text-xs shadow-[3px_3px_0px_#000]">
            <span className="text-slate-500">Jumlah Subjek: </span>
            <span className="font-black text-black">{subjects.length} Subjek</span>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-100 border-3 border-black rounded-2xl text-xs sm:text-sm font-black text-emerald-900 shadow-[4px_4px_0px_#000] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Select Subject Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 no-scrollbar">
        {subjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          const color = subjectBadgeColors[sub.id] || 'bg-[#fef08a] text-black';
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 flex items-center gap-2.5 border-3 border-black cursor-pointer ${
                isSelected
                  ? `${color} shadow-[5px_5px_0px_#000] translate-x-[-2px] translate-y-[-2px]`
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              <span>{sub.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black text-white font-mono-clean font-bold">
                {sub.code}
              </span>
              <span className="text-[10px] opacity-75">
                ({sub.resources?.length || 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Layout: Form (Left) & Existing Resources (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Add Resource Form */}
        <div className="neo-card p-6 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] lg:col-span-1 h-fit">
          <h3 className="font-mono-clean font-black text-base uppercase text-black mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-black" />
            <span>Muat Naik Bahan Baharu</span>
          </h3>

          <div className="mb-4 p-3 bg-amber-50 border-2 border-black rounded-xl text-xs font-bold text-amber-900">
            Subjek Semasa: <strong className="text-black uppercase">{activeSubject.name} ({activeSubject.code})</strong>
          </div>

          <form onSubmit={handleAddResource} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Tajuk Modul / Dokumen
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Koleksi Soalan Percubaan STPM 2026"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Kategori Bahan
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
              >
                <option value="PDF Note">PDF Note (Nota Lengkap)</option>
                <option value="Essay Guide">Essay Guide (Panduan Esei)</option>
                <option value="Past Papers">Past Papers (Soalan Percubaan/Sebenar)</option>
                <option value="Formula Sheet">Formula Sheet (Lembaran Rumus)</option>
                <option value="Practical">Practical (Panduan Amali)</option>
                <option value="Statistics">Statistics / Isu Semasa</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Bilangan Muka Surat / Saiz Fail
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: 32 Pages / 4.5 MB"
                value={newPages}
                onChange={(e) => setNewPages(e.target.value)}
                className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                Pautan Muat Turun (Google Drive / URL)
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/... (atau tinggalkan #)"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            <button
              type="submit"
              className="w-full neo-btn bg-[#4ade80] hover:bg-[#22c55e] text-black text-xs font-black py-3 px-4 shadow-[4px_4px_0px_#000] cursor-pointer gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Simpan & Segerak ke Cloud ➔</span>
            </button>
          </form>
        </div>

        {/* Right: Active Subject Resources List */}
        <div className="neo-card p-6 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-mono-clean font-black text-base uppercase text-black">
                Bahan Aktif: {activeSubject.name}
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-0.5">
                {activeSubject.description}
              </p>
            </div>

            <div className="text-xs font-mono-clean font-black bg-black text-white px-3 py-1 rounded-xl shadow-[2px_2px_0px_#000]">
              {activeSubject.resources?.length || 0} Fail
            </div>
          </div>

          <div className="space-y-3.5">
            {activeSubject.resources && activeSubject.resources.length > 0 ? (
              activeSubject.resources.map((res, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl border-2 border-black bg-slate-50 hover:bg-white transition-all shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono-clean font-black px-2 py-0.5 rounded bg-black text-white">
                        {res.type}
                      </span>
                      <span className="text-xs font-mono-clean font-bold text-slate-600">
                        {res.pages}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-black truncate">{res.title}</h4>
                    {res.link && res.link !== '#' && (
                      <a 
                        href={res.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline mt-0.5"
                      >
                        <span>Pautan Rujukan Luar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteResource(index, res.title)}
                      title="Padam dokumen"
                      className="p-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-2xl">
                <p className="text-xs font-bold text-slate-500">
                  Belum ada bahan rujukan untuk subjek ini. Gunakan borang di sebelah untuk memuat naik.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
