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
  GraduationCap,
  UploadCloud,
  FileCheck
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
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfData, setPdfData] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);

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

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Sila pilih fail berformat PDF sahaja.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('Saiz fail melebihi had 8MB. Untuk fail bersaiz besar, disyorkan menggunakan pautan Google Drive.');
      return;
    }

    setFileLoading(true);
    setPdfFileName(file.name);

    if (!newTitle) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setNewTitle(cleanName);
    }

    const formattedSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB PDF';
    setNewPages(formattedSize);

    const reader = new FileReader();
    reader.onload = () => {
      setPdfData(reader.result);
      setFileLoading(false);
    };
    reader.onerror = () => {
      alert('Gagal membaca fail PDF.');
      setFileLoading(false);
    };
    reader.readAsDataURL(file);
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
      pdfData: pdfData || null,
      fileName: pdfFileName || null,
    });

    setNewTitle('');
    setNewPages('15 Pages');
    setNewLink('');
    setPdfData(null);
    setPdfFileName('');
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
    pp: 'bg-[#fed7aa] text-black',
    sej: 'bg-[#fbcfe8] text-black',
    eko: 'bg-[#c4b5fd] text-black',
    matht: 'bg-[#67e8f9] text-black',
    mathm: 'bg-[#bae6fd] text-black',
    bm: 'bg-[#fef08a] text-black',
    bc: 'bg-[#fecdd3] text-black',
    kimia: 'bg-[#67e8f9] text-black',
    fizik: 'bg-[#a5f3fc] text-black',
    bio: 'bg-[#4ade80] text-black',
    muet: 'bg-[#f472b6] text-black',
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-[#fde047] border-4 border-black rounded-3xl shadow-[8px_8px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-black text-white text-xs font-mono-clean font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#fff]">
            <BookOpen className="w-3.5 h-3.5 text-[#fde047]" />
            <span>CLOUD MODUL AKADEMIK • 12 MATA PELAJARAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Pengurusan Modul & Nota STPM
          </h2>
          <p className="mt-1 text-slate-800 font-bold text-xs sm:text-sm max-w-2xl">
            Admin boleh memuat naik fail PDF terus atau memasukkan pautan Google Drive bagi setiap 12 subjek STPM SMJK Chung Hwa.
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

      {/* Select Subject Tabs (12 Subjects) */}
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
        
        {/* Left: Add Resource Form with PDF Upload */}
        <div className="neo-card p-6 bg-white border-3 border-black rounded-3xl shadow-[6px_6px_0px_#000] lg:col-span-1 h-fit">
          <h3 className="font-mono-clean font-black text-base uppercase text-black mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-black" />
            <span>Muat Naik Bahan Baharu</span>
          </h3>

          <div className="mb-4 p-3 bg-amber-50 border-2 border-black rounded-xl text-xs font-bold text-amber-900">
            Subjek Semasa: <strong className="text-black uppercase">{activeSubject.name} ({activeSubject.code})</strong>
          </div>

          <form onSubmit={handleAddResource} className="space-y-4">
            {/* PDF Direct Upload Box */}
            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1 flex items-center justify-between">
                <span>1. Muat Naik Fail PDF Terus</span>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded border border-black">Disyorkan</span>
              </label>
              <div className="relative border-2 border-dashed border-black rounded-xl p-3 bg-amber-50/60 hover:bg-amber-100/60 transition-colors text-center cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {fileLoading ? (
                  <div className="text-xs font-bold text-black py-2 animate-pulse">
                    Membaca fail PDF... Sila tunggu sebentar.
                  </div>
                ) : pdfFileName ? (
                  <div className="flex items-center justify-between text-xs font-black text-black">
                    <span className="truncate pr-2 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{pdfFileName}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setPdfFileName(''); 
                        setPdfData(null); 
                      }}
                      className="text-rose-600 hover:underline text-[10px] font-black shrink-0"
                    >
                      Batal Fail
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 py-1">
                    <UploadCloud className="w-6 h-6 mx-auto text-black" />
                    <p className="text-xs font-black text-black">Pilih fail PDF dari komputer/telefon anda</p>
                    <p className="text-[10px] text-slate-500 font-bold">Maksimum 8MB • Auto-jana saiz & tajuk</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                2. Tajuk Modul / Dokumen *
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
                3. Kategori Bahan
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
                <option value="Case Study">Case Study (Kajian Kes)</option>
                <option value="Statistics">Statistics / Isu Semasa</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                4. Bilangan Muka Surat / Saiz Fail
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
                5. Atau Pautan Luar (Google Drive / URL)
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/... (pilihan jika tiada fail terus)"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full bg-slate-50 px-3 py-2.5 rounded-xl border-2 border-black text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000]"
              />
            </div>

            <button
              type="submit"
              disabled={fileLoading}
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
                      {res.pdfData && (
                        <span className="text-[10px] font-mono-clean font-black bg-emerald-100 text-emerald-800 border border-black px-2 py-0.2 rounded shadow-[1px_1px_0px_#000]">
                          ✓ PDF TERSEDIA
                        </span>
                      )}
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
                    {res.pdfData && (
                      <button
                        type="button"
                        onClick={() => {
                          const a = document.createElement('a');
                          a.href = res.pdfData;
                          a.download = res.fileName || `${res.title}.pdf`;
                          a.target = '_blank';
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                        title="Muat turun atau semak fail PDF ini"
                        className="p-2.5 bg-[#bae6fd] hover:bg-[#7dd3fc] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}

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
                  Belum ada bahan rujukan untuk subjek ini. Gunakan borang di sebelah untuk memuat naik fail PDF atau pautan.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
