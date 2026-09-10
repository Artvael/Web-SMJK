import { createClient } from '@supabase/supabase-js';

// If Supabase environment variables are provided, initialize client.
// Otherwise, smoothly fallback so the app works immediately out-of-the-box!
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  'https://ubwmlexomazhgpkclgtx.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const INITIAL_STUDENT_NOTES = [
  {
    id: 'note_junaedi_01',
    category: 'Suggestion',
    name: 'Junaedi',
    isAnonymous: false,
    studentClass: 'Upper 6 Science 1 (6S1)',
    title: 'Penambahan Pendingin Hawa / Kipas di Bilik Belajar T6',
    message: 'Mohon dipertimbangkan penambahan pendingin hawa atau kipas angin tambahan di Bilik Belajar Tingkatan 6. Waktu tengah hari agak panas dan suasana ulangkaji sebelum peperiksaan STPM Semester 1 akan jauh lebih kondusif dan selesa untuk semua pelajar.',
    status: '✅ Selesai & Dibalas',
    adminReply: 'Terima kasih atas cadangan bernas Junaedi! Majlis PETINAM telah berbincang dengan Penolong Kanan Tingkatan 6 dan pihak pengurusan sekolah. Dua unit kipas berdiri tambahan telah diluluskan dan akan dipasang di bilik ulangkaji sebelum minggu peperiksaan bermula.',
    adminRepliedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    likes: 19,
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
  },
  {
    id: 'note_seed_02',
    category: 'Problem',
    name: 'Tan Jia Wei',
    isAnonymous: false,
    studentClass: 'Upper 6 Science 2 (6S2)',
    title: 'Lampu Koridor Blok Tingkatan 6 Berkelip',
    message: 'Lampu kalimantang di laluan tangga Blok Tingkatan 6 berhampiran Makmal Fizik kerap berkelip dan agak malap ketika kelas tamat sesi petang. Mohon pihak PETINAM maklumkan kepada bahagian penyelenggaraan sekolah.',
    status: '✅ Telah Dimaklumkan ke Pihak Sekolah',
    likes: 12,
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 'note_seed_03',
    category: 'Appreciation',
    name: 'Siti Nurhaliza',
    isAnonymous: false,
    studentClass: 'Upper 6 Arts 1 (6A1)',
    title: 'Tahniah & Terima Kasih Majlis PETINAM atas Bengkel PA!',
    message: 'Terima kasih banyak kepada Presiden Vannie Liew dan seluruh Exco Akademik atas penganjuran bengkel teknik menjawab Pengajian Am STPM minggu lepas. Nota dan tips struktur esei sangat padat dan membuka minda!',
    status: '❤️ Dihargai oleh Presiden',
    likes: 27,
    created_at: new Date(Date.now() - 3600000 * 42).toISOString(),
  },
  {
    id: 'note_seed_04',
    category: 'Request',
    name: 'Lim Guan Yu',
    isAnonymous: false,
    studentClass: 'Lower 6 Science 1',
    title: 'Sesi Perkongsian Bersama Senior Universiti (UM, USM, UKM)',
    message: 'Bolehkah PETINAM anjurkan sesi perkongsian santai bersama senior alumni SMJK Chung Hwa yang kini menuntut di IPTA terkemuka? Kami pelajar Semester 1 ingin tahu persediaan portfolio dan sistem merit kemasukan UPU.',
    status: '📌 Dimasukkan ke Takwim PETINAM',
    likes: 16,
    created_at: new Date(Date.now() - 3600000 * 65).toISOString(),
  },
  {
    id: 'note_seed_05',
    category: 'Suggestion',
    name: 'Pelajar 6S1',
    isAnonymous: true,
    studentClass: 'Upper 6 Science 1 (6S1)',
    title: 'Sediakan Sudut Book-Swap / Nota Terpakai STPM',
    message: 'Cadangan untuk sediakan satu rak buku khas di foyer Tingkatan 6 di mana senior boleh mewakafkan buku rujukan Pelangi / Sasbadi dan nota ringkas kepada junior Semester 1 yang baru masuk.',
    status: '✅ Diluluskan',
    likes: 22,
    created_at: new Date(Date.now() - 3600000 * 80).toISOString(),
  },
  {
    id: 'note_seed_06',
    category: 'Problem',
    name: 'Chloe Wong',
    isAnonymous: false,
    studentClass: 'Upper 6 Arts 2 (6A2)',
    title: 'Jadual Pusingan Komputer di Makmal Siber Tingkatan 6',
    message: 'Sebahagian pelajar mengambil kerja kursus Kerja Projek Geografi memerlukan akses internet serentak pada hari Rabu. Boleh selaraskan slot masa penggunaan makmal komputer bersama guru penyelaras?',
    status: '💬 Sedang Diselaraskan',
    likes: 8,
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
  {
    id: 'note_seed_07',
    category: 'Appreciation',
    name: 'Marcus Teo',
    isAnonymous: false,
    studentClass: 'Upper 6 Science 1 (6S1)',
    title: 'Bilik Rehat Tingkatan 6 Kini Jauh Lebih Kemas',
    message: 'Tahniah kepada Biro Kebajikan PETINAM kerana berjaya menyusun semula almari simpanan fail dan papan kenyataan. Suasana bilik rehat kini nampak sangat profesional!',
    status: '❤️ Dihargai oleh Exco',
    likes: 14,
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
  },
  {
    id: 'note_seed_08',
    category: 'Request',
    name: 'Nur Aisyah',
    isAnonymous: false,
    studentClass: 'Upper 6 Arts 1 (6A1)',
    title: 'Penganjuran Pertandingan Bola Keranjang Antara Kelas T6',
    message: 'Memandangkan minggu ulangkaji semakin hampir, mohon PETINAM adakan petang riadah sukan bola keranjang atau badminton 1 hari untuk merehatkan minda pelajar Form 6.',
    status: '📌 Dalam Perancangan Sukan',
    likes: 31,
    created_at: new Date(Date.now() - 3600000 * 140).toISOString(),
  },
];

/**
 * Retrieve all student feedback from localStorage (or seed with authentic defaults if empty)
 */
export function getStudentFeedback() {
  if (typeof window === 'undefined') return INITIAL_STUDENT_NOTES;

  try {
    const raw = localStorage.getItem('chung_hwa_feedback');
    if (!raw) {
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(INITIAL_STUDENT_NOTES));
      return INITIAL_STUDENT_NOTES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(INITIAL_STUDENT_NOTES));
      return INITIAL_STUDENT_NOTES;
    }

    // Ensure Junaedi's note is always present and has the sample admin reply
    const junaediIdx = parsed.findIndex(n => n.name && n.name.toLowerCase().includes('junaedi'));
    if (junaediIdx === -1) {
      parsed.unshift(INITIAL_STUDENT_NOTES[0]);
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(parsed));
    } else if (!parsed[junaediIdx].adminReply) {
      parsed[junaediIdx].adminReply = INITIAL_STUDENT_NOTES[0].adminReply;
      parsed[junaediIdx].adminRepliedAt = INITIAL_STUDENT_NOTES[0].adminRepliedAt;
      parsed[junaediIdx].status = '✅ Selesai & Dibalas';
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(parsed));
    }

    return parsed;
  } catch (err) {
    console.warn('Error reading feedback from localStorage:', err);
    return INITIAL_STUDENT_NOTES;
  }
}

/**
 * Fetch remote feedback from Supabase cloud database
 */
export async function fetchRemoteStudentFeedback() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('student_feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      if (data.length > 0) {
        const mapped = data.map((item) => ({
          id: item.id,
          category: item.category || 'Suggestion',
          name: item.name || 'Anonymous Student',
          isAnonymous: item.isAnonymous !== undefined ? item.isAnonymous : item.is_anonymous,
          studentClass: item.studentClass || item.student_class || 'Tingkatan 6',
          title: item.title || 'Suara Pelajar',
          message: item.message || '',
          status: item.status || '📌 Diterima oleh PETINAM',
          adminReply: item.adminReply || item.admin_reply || null,
          adminRepliedAt: item.adminRepliedAt || item.admin_replied_at || null,
          likes: item.likes || 1,
          created_at: item.created_at,
        }));
        try {
          localStorage.setItem('chung_hwa_feedback', JSON.stringify(mapped));
          window.dispatchEvent(new Event('feedback_updated'));
        } catch {}
        return mapped;
      } else {
        // If remote table exists but has 0 rows, seed with initial notes
        for (const note of INITIAL_STUDENT_NOTES) {
          try {
            await supabase.from('student_feedback').insert([{
              id: note.id,
              name: note.name,
              student_class: note.studentClass,
              category: note.category,
              title: note.title,
              message: note.message,
              is_anonymous: note.isAnonymous,
              status: note.status,
              admin_reply: note.adminReply || null,
              admin_replied_at: note.adminRepliedAt || null,
              likes: note.likes,
              created_at: note.created_at,
            }]);
          } catch {}
        }
        return INITIAL_STUDENT_NOTES;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch notes error:', err);
  }
  return null;
}

/**
 * Submit feedback to Supabase or fallback to LocalStorage
 */
export async function submitStudentFeedback(feedbackData) {
  const newId = 'note_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const payload = {
    id: newId,
    ...feedbackData,
    status: '📌 Diterima oleh PETINAM',
    likes: 1,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const dbRow = {
        id: payload.id,
        name: payload.name,
        category: payload.category,
        title: payload.title,
        message: payload.message,
        status: payload.status,
        likes: payload.likes,
        created_at: payload.created_at,
        is_anonymous: Boolean(payload.isAnonymous),
        student_class: payload.studentClass || 'Tingkatan 6',
      };
      await supabase.from('student_feedback').insert([dbRow]);
    } catch (err) {
      console.warn('Supabase submission failed, falling back to localStorage:', err);
    }
  }

  // Persist to LocalStorage
  try {
    const existing = getStudentFeedback();
    const updated = [payload, ...existing.filter((item) => item.id !== payload.id)];
    localStorage.setItem('chung_hwa_feedback', JSON.stringify(updated));
    window.dispatchEvent(new Event('feedback_updated'));
    return { success: true, source: isSupabaseConfigured ? 'supabase' : 'local', data: payload };
  } catch (e) {
    return { success: true, source: 'memory', data: payload };
  }
}

/**
 * Update feedback note in Supabase (admin reply or status update)
 */
export async function updateFeedbackNote(noteId, updates) {
  if (isSupabaseConfigured && supabase) {
    try {
      const dbUpdates = {};
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.adminReply !== undefined) {
        dbUpdates.admin_reply = updates.adminReply;
        dbUpdates.admin_replied_at = updates.adminRepliedAt || new Date().toISOString();
      }
      if (updates.likes !== undefined) dbUpdates.likes = updates.likes;
      await supabase.from('student_feedback').update(dbUpdates).eq('id', noteId);
    } catch (err) {
      console.warn('Supabase update note error:', err);
    }
  }
}

/**
 * Delete feedback note from Supabase
 */
export async function deleteFeedbackNoteRemote(noteId) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('student_feedback').delete().eq('id', noteId);
    } catch (err) {
      console.warn('Supabase delete note error:', err);
    }
  }
}

/**
 * Toggle like reaction on a note and persist to localStorage + Supabase
 */
export function toggleLikeFeedback(noteId) {
  try {
    const notes = getStudentFeedback();
    const target = notes.find((n) => n.id === noteId);
    if (target) {
      const likedKey = `liked_${noteId}`;
      const isAlreadyLiked = localStorage.getItem(likedKey) === 'true';
      if (isAlreadyLiked) {
        target.likes = Math.max(0, (target.likes || 1) - 1);
        localStorage.removeItem(likedKey);
      } else {
        target.likes = (target.likes || 0) + 1;
        localStorage.setItem(likedKey, 'true');
      }
      localStorage.setItem('chung_hwa_feedback', JSON.stringify(notes));

      // Sync likes to Supabase
      if (isSupabaseConfigured && supabase) {
        supabase.from('student_feedback').update({ likes: target.likes }).eq('id', noteId).then();
      }
      return { success: true, likes: target.likes, isLiked: !isAlreadyLiked };
    }
  } catch (e) {
    console.warn('Error toggling like:', e);
  }
  return { success: false };
}
