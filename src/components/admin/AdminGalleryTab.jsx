import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Check, 
  Tag, 
  Heart, 
  Calendar 
} from 'lucide-react';
import { 
  getGalleryItems, 
  addGalleryItem, 
  updateGalleryItem, 
  deleteGalleryItem 
} from '../../lib/contentStore';

const CATEGORIES = [
  'Orientasi',
  'Hari Sukan',
  'Graduasi',
  'Kelas & Ulangkaji',
  'Pertandingan',
];

export default function AdminGalleryTab() {
  const [photos, setPhotos] = useState(() => getGalleryItems());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);

  // New photo form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Orientasi');
  const [date, setDate] = useState('Sep 2026');
  const [batch, setBatch] = useState('Tingkatan 6 Atas (Batch 2026/27)');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadMode, setUploadMode] = useState('url'); // 'url' | 'file'
  const [statusMsg, setStatusMsg] = useState('');

  const refreshPhotos = () => {
    setPhotos(getGalleryItems());
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (under 4MB recommended for localStorage)
    if (file.size > 4 * 1024 * 1024) {
      alert('Fail terlalu besar (maksimum 4MB). Sila pilih fail yang lebih kecil atau gunakan pautan URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setPreviewUrl(dataUrl);
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Sila masukkan tajuk foto kenangan.');
      return;
    }

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80';

    addGalleryItem({
      title: title.trim(),
      category,
      date: date.trim() || 'Sep 2026',
      batch: batch.trim() || 'Warga Tingkatan 6',
      caption: caption.trim() || 'Kenangan manis pelajar Tingkatan 6 SMJK Chung Hwa Kelantan.',
      imageUrl: finalImage,
      uploadedBy: 'Pentadbir PETINAM',
    });

    refreshPhotos();
    setShowAddForm(false);
    setTitle('');
    setCaption('');
    setImageUrl('');
    setPreviewUrl('');
    setStatusMsg('✅ Foto kenangan berjaya dimuat naik ke galeri!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    updateGalleryItem(editingPhoto);
    refreshPhotos();
    setEditingPhoto(null);
    setStatusMsg('✅ Foto berjaya dikemas kini!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleDelete = (id, photoTitle) => {
    if (window.confirm(`Adakah anda pasti ingin memadam foto "${photoTitle}" daripada galeri?`)) {
      deleteGalleryItem(id);
      refreshPhotos();
      setStatusMsg('🗑️ Foto berjaya dipadamkan daripada galeri.');
      setTimeout(() => setStatusMsg(''), 4000);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-[#fde047] border border-black rounded-lg shadow-[1px_1px_0px_#000]">
              <Camera className="w-4 h-4 text-black" />
            </span>
            <h2 className="font-mono-clean font-black text-lg sm:text-xl text-black uppercase">
              Pengurusan Galeri Kenangan
            </h2>
          </div>
          <p className="text-xs text-slate-600 font-bold">
            Muat naik foto aktiviti baharu, kemas kini keterangan kenangan, dan urus paparan scrapbook Polaroid di web utama.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="neo-btn bg-[#4ade80] hover:bg-emerald-400 text-black text-xs sm:text-sm font-black px-4 py-2.5 shadow-[3px_3px_0px_#000] shrink-0"
        >
          {showAddForm ? <X className="w-4 h-4 mr-1.5" /> : <Plus className="w-4 h-4 mr-1.5" />}
          <span>{showAddForm ? 'Tutup Borang' : '+ Muat Naik Foto Baru'}</span>
        </button>
      </div>

      {/* Status notification */}
      {statusMsg && (
        <div className="p-3.5 bg-[#fef08a] border-2.5 border-black rounded-xl text-black font-black text-xs shadow-[3px_3px_0px_#000] flex items-center gap-2 animate-bounce">
          <span>🔔</span>
          <span>{statusMsg}</span>
        </div>
      )}

      {/* ADD PHOTO FORM */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="neo-card bg-[#fffbeb] p-6 border-3 border-black shadow-[6px_6px_0px_#000]"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
              <h3 className="font-mono-clean font-black text-base uppercase text-black flex items-center gap-2">
                <span>📸 Borang Muat Naik Foto Scrapbook Baharu</span>
              </h3>
              <span className="text-[11px] font-mono-clean font-bold text-slate-600">
                Format: Polaroid Interaktif
              </span>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Tajuk Foto / Aktiviti *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Majlis Graduasi Pra-Universiti 2026"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Kategori Kenangan *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Tarikh / Bulan Acara
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: Ogos 2026"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

                {/* Batch / Kumpulan */}
                <div>
                  <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                    Kumpulan Pelajar / Batch
                  </label>
                  <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Contoh: Lower 6 Science Biology (L6SB)"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                </div>

              </div>

              {/* Upload Mode Selector: URL vs File Upload */}
              <div className="pt-2">
                <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1.5">
                  Kaedah Imej:
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-black cursor-pointer ${
                      uploadMode === 'url' ? 'bg-[#fde047] text-black shadow-[1.5px_1.5px_0px_#000]' : 'bg-white text-slate-600'
                    }`}
                  >
                    🔗 Guna URL Gambar
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 border-black cursor-pointer ${
                      uploadMode === 'file' ? 'bg-[#38bdf8] text-black shadow-[1.5px_1.5px_0px_#000]' : 'bg-white text-slate-600'
                    }`}
                  >
                    📁 Muat Naik Fail Tempatan
                  </button>
                </div>

                {uploadMode === 'url' ? (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/... atau pautan terus imej anda"
                    className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                  />
                ) : (
                  <div className="border-2 border-dashed border-black rounded-xl p-4 bg-white text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="text-xs font-mono-clean cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                      Menyokong fail JPG, PNG, WEBP (di bawah 4MB).
                    </p>
                  </div>
                )}
              </div>

              {/* Image Live Preview */}
              {previewUrl && (
                <div className="p-3 bg-white border-2 border-black rounded-xl flex items-center gap-3">
                  <div className="w-16 h-14 rounded-lg border-2 border-black overflow-hidden bg-black shrink-0">
                    <img src={previewUrl} alt="Pratonton" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-clean font-black text-emerald-700 block uppercase">
                      ✓ Pratonton Imej Sedia
                    </span>
                    <span className="text-xs font-bold text-slate-700 truncate block max-w-sm">
                      {title || 'Foto Baharu'}
                    </span>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div>
                <label className="block text-xs font-mono-clean font-black text-black uppercase mb-1">
                  Keterangan / Cerita Kenangan
                </label>
                <textarea
                  rows="3"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ceritakan serba sedikit tentang peristiwa yang berlaku dalam foto ini..."
                  className="w-full bg-white text-black font-bold text-xs p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="neo-btn bg-[#fde047] hover:bg-yellow-400 text-black text-xs font-black px-6 py-2.5 shadow-[2px_2px_0px_#000]"
                >
                  <Upload className="w-3.5 h-3.5 mr-1.5" />
                  <span>Simpan ke Galeri</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="neo-btn bg-white hover:bg-slate-100 text-black text-xs font-bold px-4 py-2.5 shadow-[2px_2px_0px_#000]"
                >
                  Batal
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHOTOS LIST GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] flex flex-col justify-between relative group"
          >
            <div>
              {/* Photo Thumbnail */}
              <div className="relative aspect-16/10 rounded-xl border-2 border-black overflow-hidden bg-zinc-900 mb-3">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black text-[#fde047] font-mono-clean font-black text-[9px] px-2 py-0.5 rounded border border-black uppercase">
                  {photo.category}
                </span>
                <span className="absolute bottom-2 right-2 bg-white/90 text-black font-mono-clean font-bold text-[9px] px-1.5 py-0.5 rounded border border-black">
                  ❤️ {photo.likes || 0}
                </span>
              </div>

              <h4 className="font-mono-clean font-black text-sm text-black uppercase leading-tight line-clamp-1">
                {photo.title}
              </h4>
              <span className="text-[10px] font-mono-clean text-slate-500 font-bold block mt-0.5">
                📅 {photo.date} • {photo.batch || 'Tingkatan 6'}
              </span>

              <p className="text-xs text-slate-700 font-medium line-clamp-2 mt-2 leading-relaxed bg-[#fcfaf5] p-2 rounded-lg border border-black/10">
                “{photo.caption}”
              </p>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 mt-3 border-t-2 border-black/15 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setEditingPhoto({ ...photo })}
                className="neo-btn bg-[#bae6fd] hover:bg-sky-200 text-black text-[11px] font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(photo.id, photo.title)}
                className="neo-btn bg-[#fca5a5] hover:bg-red-300 text-red-900 text-[11px] font-black px-3 py-1.5 shadow-[1.5px_1.5px_0px_#000]"
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
        {editingPhoto && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => setEditingPhoto(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full bg-white border-4 border-black p-6 rounded-2xl shadow-[8px_8px_0px_#000] z-20"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black">
                <h3 className="font-mono-clean font-black text-base uppercase text-black">
                  ✏️ Edit Foto Kenangan
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="p-1 bg-white border border-black rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Tajuk
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPhoto.title}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Kategori
                    </label>
                    <select
                      value={editingPhoto.category}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                      Tarikh
                    </label>
                    <input
                      type="text"
                      value={editingPhoto.date}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                      className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Pautan Imej URL
                  </label>
                  <input
                    type="url"
                    value={editingPhoto.imageUrl}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, imageUrl: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-clean font-black text-black uppercase mb-1">
                    Keterangan
                  </label>
                  <textarea
                    rows="3"
                    value={editingPhoto.caption}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                    className="w-full bg-white text-black font-bold text-xs p-2 rounded-lg border-2 border-black"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10">
                  <button
                    type="button"
                    onClick={() => setEditingPhoto(null)}
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
