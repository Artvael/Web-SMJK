import { 
  petinamTeam as defaultPetinamTeam, 
  weeklyActivities as defaultWeeklyActivities, 
  announcements as defaultAnnouncements,
  calendarEvents as defaultCalendarEvents,
  academicSubjects as defaultAcademicSubjects
} from '../data/initialData.js';
import { supabase, isSupabaseConfigured } from './supabase.js';

/**
 * Centralized Content Store for SMJK Chung Hwa Form 6 Portal
 * Manages reactive data for:
 * 1. Photo Gallery (Polaroid Scrapbook)
 * 2. PETINAM Committee (High Committee & Exco)
 * 3. What's Happening This Week (Weekly Ticker)
 * 4. Announcements & Notices
 * 5. STPM Countdown Config
 * 6. Calendar Events
 * 7. Academic Hub Subject Binders
 */

const GALLERY_STORAGE_KEY = 'chung_hwa_gallery';
const PETINAM_STORAGE_KEY = 'chung_hwa_petinam';
const WEEKLY_STORAGE_KEY = 'chung_hwa_weekly';
const ANNOUNCEMENTS_STORAGE_KEY = 'chung_hwa_announcements';
const COUNTDOWN_STORAGE_KEY = 'chung_hwa_stpm_countdown';
const CALENDAR_STORAGE_KEY = 'chung_hwa_custom_events';
const ACADEMIC_STORAGE_KEY = 'chung_hwa_academic_subjects';

/**
 * Push updated module data to Supabase cloud table `site_content`
 */
export async function syncToCloud(key, data) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('site_content')
        .upsert({ key, data, updated_at: new Date().toISOString() });
    } catch (err) {
      console.warn(`Failed to sync ${key} to Supabase:`, err);
    }
  }
}

/**
 * Fetch all content modules from Supabase on application load
 */
export async function fetchRemoteSiteContent() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');

    if (!error && Array.isArray(data) && data.length > 0) {
      data.forEach((row) => {
        if (!row.key || !row.data) return;
        try {
          if (row.key === 'gallery') {
            localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'petinam') {
            localStorage.setItem(PETINAM_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'weekly') {
            localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'announcements') {
            localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'countdown') {
            localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'calendar') {
            localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(row.data));
          } else if (row.key === 'academic') {
            localStorage.setItem(ACADEMIC_STORAGE_KEY, JSON.stringify(row.data));
          }
        } catch {}
      });
      emitContentUpdate();
      return data;
    }
  } catch (err) {
    console.warn('Failed to fetch site_content from Supabase:', err);
  }
  return null;
}

/**
 * Seed initial default content to Supabase if table is empty
 */
export async function seedDefaultSiteContentIfEmpty() {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    const { data, error } = await supabase.from('site_content').select('key');
    if (error) return;
    const existingKeys = new Set((data || []).map((r) => r.key));

    const seeds = [
      { key: 'gallery', data: DEFAULT_GALLERY_ITEMS },
      { key: 'petinam', data: defaultPetinamTeam },
      { key: 'weekly', data: defaultWeeklyActivities },
      { key: 'announcements', data: defaultAnnouncements },
      { key: 'countdown', data: DEFAULT_COUNTDOWN_CONFIG },
      { key: 'calendar', data: defaultCalendarEvents },
      { key: 'academic', data: defaultAcademicSubjects },
    ];

    for (const item of seeds) {
      if (!existingKeys.has(item.key)) {
        await syncToCloud(item.key, item.data);
      }
    }
  } catch (err) {
    console.warn('Seed default site content skipped:', err);
  }
}

// Seed authentic Form 6 photo memories
export const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'gal-01',
    title: 'Minggu Orientasi Siswa Tingkatan 6 (Batch 2026/2027)',
    category: 'Orientasi',
    date: 'Julai 2026',
    caption: 'Majlis suai kenal dan penyerahan lencana persatuan kepada barisan junior Semester 1 di Dewan Sekolah SMJK Chung Hwa.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    likes: 42,
    batch: 'Sem 1 & Sem 3',
    uploadedBy: 'Biro Media PETINAM',
  },
  {
    id: 'gal-02',
    title: 'Kejohanan Sukan Tahunan & Merentas Desa Form 6',
    category: 'Hari Sukan',
    date: 'Ogos 2026',
    caption: 'Semangat kesukanan membara kontinjen Tingkatan 6 di padang sekolah. Rumah Biru merangkul gelaran Juara Keseluruhan!',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
    likes: 56,
    batch: 'Seluruh Warga T6',
    uploadedBy: 'Exco Kebajikan & Sukan',
  },
  {
    id: 'gal-03',
    title: 'Majlis Graduasi & Pelepasan Calon STPM Pra-Universiti',
    category: 'Graduasi',
    date: 'Jun 2026',
    caption: 'Meraikan kejayaan senior STPM dengan keputusan cemerlang PNGK 4.00 dan tawaran kemasukan ke IPTA terkemuka.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    likes: 78,
    batch: 'Alumni SMCH 2025/26',
    uploadedBy: 'Presiden Vannie Liew',
  },
  {
    id: 'gal-04',
    title: 'Bengkel Intensif Menjawab Pengajian Am & Kimia',
    category: 'Kelas & Ulangkaji',
    date: 'Ogos 2026',
    caption: 'Sesi bimbingan rakan sebaya dan bedah soalan ramalan past-year STPM Semester 1 di Bilik Gerakan Tingkatan 6.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    likes: 35,
    batch: 'Upper 6 Science & Arts',
    uploadedBy: 'Exco Akademik',
  },
  {
    id: 'gal-05',
    title: 'Pasukan Debat & Robotik SMJK Chung Hwa ke Peringkat Negeri',
    category: 'Pertandingan',
    date: 'Sep 2026',
    caption: 'Tahniah kepada wakil Tingkatan 6 yang mengharumkan nama sekolah di Pertandingan Debat Parlimen dan STEM Inovasi Kelantan.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    likes: 49,
    batch: 'Kelab Debat & Robotik',
    uploadedBy: 'Exco Kokurikulum',
  },
  {
    id: 'gal-06',
    title: 'Sesi Dialog Terbuka Townhall Pelajar Bersama PETINAM',
    category: 'Orientasi',
    date: 'Sep 2026',
    caption: 'Ruang perkongsian aspirasi siswa, semakan kemudahan bilik belajar, dan pelancaran inisiatif peti suara digital Form 6.',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80',
    likes: 31,
    batch: 'Majlis PETINAM',
    uploadedBy: 'Setiausaha Tan Yon Jian',
  },
];

// Helper to notify all listening components across the window
function emitContentUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('content_updated'));
  }
}

// -------------------------------------------------------------
// 1. GALLERY CRUD
// -------------------------------------------------------------
export function getGalleryItems() {
  if (typeof window === 'undefined') return DEFAULT_GALLERY_ITEMS;
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY_ITEMS));
      return DEFAULT_GALLERY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_GALLERY_ITEMS;
  } catch {
    return DEFAULT_GALLERY_ITEMS;
  }
}

export function saveGalleryItems(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    syncToCloud('gallery', items);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save gallery items:', err);
  }
}

export function addGalleryItem(item) {
  const items = getGalleryItems();
  const newItem = {
    id: 'gal-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    likes: 0,
    ...item,
  };
  items.unshift(newItem);
  saveGalleryItems(items);
  return newItem;
}

export function updateGalleryItem(updatedItem) {
  const items = getGalleryItems().map((it) => (it.id === updatedItem.id ? { ...it, ...updatedItem } : it));
  saveGalleryItems(items);
}

export function deleteGalleryItem(id) {
  const items = getGalleryItems().filter((it) => it.id !== id);
  saveGalleryItems(items);
}

export function toggleGalleryLike(id) {
  const items = getGalleryItems();
  const found = items.find((it) => it.id === id);
  if (found) {
    const likedKey = `chung_hwa_gal_like_${id}`;
    const alreadyLiked = localStorage.getItem(likedKey) === 'true';
    if (alreadyLiked) {
      found.likes = Math.max(0, (found.likes || 1) - 1);
      localStorage.removeItem(likedKey);
    } else {
      found.likes = (found.likes || 0) + 1;
      localStorage.setItem(likedKey, 'true');
    }
    saveGalleryItems(items);
    return { likes: found.likes, isLiked: !alreadyLiked };
  }
  return { likes: 0, isLiked: false };
}

// -------------------------------------------------------------
// 2. PETINAM COMMITTEE CRUD
// -------------------------------------------------------------
export function getPetinamTeam() {
  if (typeof window === 'undefined') return defaultPetinamTeam;
  try {
    const raw = localStorage.getItem(PETINAM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PETINAM_STORAGE_KEY, JSON.stringify(defaultPetinamTeam));
      return defaultPetinamTeam;
    }
    const parsed = JSON.parse(raw);
    return parsed?.highCommittee ? parsed : defaultPetinamTeam;
  } catch {
    return defaultPetinamTeam;
  }
}

export function savePetinamTeam(team) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PETINAM_STORAGE_KEY, JSON.stringify(team));
    syncToCloud('petinam', team);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save petinam team:', err);
  }
}

export function addPetinamMember(type, memberData) {
  const team = getPetinamTeam();
  const newMember = {
    id: 'mem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    ...memberData,
  };
  if (type === 'high') {
    team.highCommittee.push(newMember);
  } else {
    team.excoList.push(newMember);
  }
  savePetinamTeam(team);
  return newMember;
}

export function updatePetinamMember(type, updatedMember) {
  const team = getPetinamTeam();
  if (type === 'high') {
    team.highCommittee = team.highCommittee.map((m) => 
      (m.id === updatedMember.id || m.name === updatedMember.originalName || m.name === updatedMember.name)
        ? { ...m, ...updatedMember }
        : m
    );
  } else {
    team.excoList = team.excoList.map((m) => 
      (m.id === updatedMember.id || m.name === updatedMember.originalName || m.name === updatedMember.name)
        ? { ...m, ...updatedMember }
        : m
    );
  }
  savePetinamTeam(team);
}

export function deletePetinamMember(type, identifier) {
  const team = getPetinamTeam();
  if (type === 'high') {
    team.highCommittee = team.highCommittee.filter((m) => m.id !== identifier && m.name !== identifier);
  } else {
    team.excoList = team.excoList.filter((m) => m.id !== identifier && m.name !== identifier);
  }
  savePetinamTeam(team);
}

// -------------------------------------------------------------
// 3. WHAT'S HAPPENING THIS WEEK CRUD
// -------------------------------------------------------------
export function getWeeklyActivities() {
  if (typeof window === 'undefined') return defaultWeeklyActivities;
  try {
    const raw = localStorage.getItem(WEEKLY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(defaultWeeklyActivities));
      return defaultWeeklyActivities;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultWeeklyActivities;
  } catch {
    return defaultWeeklyActivities;
  }
}

export function saveWeeklyActivities(activities) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(activities));
    syncToCloud('weekly', activities);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save weekly activities:', err);
  }
}

export function addWeeklyActivity(actData) {
  const activities = getWeeklyActivities();
  const newAct = {
    id: 'w-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    ...actData,
  };
  activities.push(newAct);
  saveWeeklyActivities(activities);
  return newAct;
}

export function updateWeeklyActivity(updatedAct) {
  const activities = getWeeklyActivities().map((act) => (act.id === updatedAct.id ? { ...act, ...updatedAct } : act));
  saveWeeklyActivities(activities);
}

export function deleteWeeklyActivity(id) {
  const activities = getWeeklyActivities().filter((act) => act.id !== id);
  saveWeeklyActivities(activities);
}

// -------------------------------------------------------------
// 4. ANNOUNCEMENTS CRUD
// -------------------------------------------------------------
export function getAnnouncements() {
  if (typeof window === 'undefined') return defaultAnnouncements;
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(defaultAnnouncements));
      return defaultAnnouncements;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAnnouncements;
  } catch {
    return defaultAnnouncements;
  }
}

export function saveAnnouncements(annList) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(annList));
    syncToCloud('announcements', annList);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save announcements:', err);
  }
}

export function addAnnouncement(annData) {
  const announcements = getAnnouncements();
  const newAnn = {
    id: 'ann-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
    date: 'Hari ini',
    ...annData,
  };
  announcements.unshift(newAnn);
  saveAnnouncements(announcements);
  return newAnn;
}

export function updateAnnouncement(updatedAnn) {
  const announcements = getAnnouncements().map((ann) => (ann.id === updatedAnn.id ? { ...ann, ...updatedAnn } : ann));
  saveAnnouncements(announcements);
}

export function deleteAnnouncement(id) {
  const announcements = getAnnouncements().filter((ann) => ann.id !== id);
  saveAnnouncements(announcements);
}

// -------------------------------------------------------------
// 5. STPM COUNTDOWN CONFIG (CENTRALIZED & ADMIN-CONTROLLED)
// -------------------------------------------------------------
export const DEFAULT_COUNTDOWN_CONFIG = {
  examName: 'STPM Sem 3 (Tingkatan 6 Atas)',
  shortLabel: 'STPM Sem 3',
  targetDate: '2026-11-16T08:00:00',
  description: 'Peperiksaan bertulis Semester 3 STPM (Kohort 2026) anjuran Majlis Peperiksaan Malaysia (MPM).',
};

export function getCountdownConfig() {
  if (typeof window === 'undefined') return DEFAULT_COUNTDOWN_CONFIG;
  try {
    const raw = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(DEFAULT_COUNTDOWN_CONFIG));
      return DEFAULT_COUNTDOWN_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return parsed?.targetDate ? parsed : DEFAULT_COUNTDOWN_CONFIG;
  } catch {
    return DEFAULT_COUNTDOWN_CONFIG;
  }
}

export function saveCountdownConfig(config) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, JSON.stringify(config));
    syncToCloud('countdown', config);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save countdown config:', err);
  }
}

// -------------------------------------------------------------
// 6. CALENDAR EVENTS CRUD
// -------------------------------------------------------------
export function getCalendarEvents() {
  if (typeof window === 'undefined') return defaultCalendarEvents;
  try {
    const raw = localStorage.getItem(CALENDAR_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(defaultCalendarEvents));
      return defaultCalendarEvents;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultCalendarEvents;
  } catch {
    return defaultCalendarEvents;
  }
}

export function saveCalendarEvents(events) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(events));
    syncToCloud('calendar', events);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save calendar events:', err);
  }
}

export function addCalendarEvent(eventData) {
  const events = getCalendarEvents();
  const newEv = {
    id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
    ...eventData,
  };
  events.unshift(newEv);
  saveCalendarEvents(events);
  return newEv;
}

export function deleteCalendarEvent(id) {
  const events = getCalendarEvents().filter((ev) => ev.id !== id);
  saveCalendarEvents(events);
}

// -------------------------------------------------------------
// 7. ACADEMIC HUB CRUD (SUBJECTS & RESOURCES)
// -------------------------------------------------------------
export function getAcademicSubjects() {
  if (typeof window === 'undefined') return defaultAcademicSubjects;
  try {
    const raw = localStorage.getItem(ACADEMIC_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACADEMIC_STORAGE_KEY, JSON.stringify(defaultAcademicSubjects));
      return defaultAcademicSubjects;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAcademicSubjects;
  } catch {
    return defaultAcademicSubjects;
  }
}

export function saveAcademicSubjects(subjects) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACADEMIC_STORAGE_KEY, JSON.stringify(subjects));
    syncToCloud('academic', subjects);
    emitContentUpdate();
  } catch (err) {
    console.warn('Failed to save academic subjects:', err);
  }
}

export function addAcademicResource(subjectId, resourceData) {
  const subjects = getAcademicSubjects();
  const updated = subjects.map((sub) => {
    if (sub.id === subjectId) {
      const resources = Array.isArray(sub.resources) ? [...sub.resources] : [];
      return {
        ...sub,
        resources: [
          {
            downloads: 0,
            link: '#',
            ...resourceData,
          },
          ...resources,
        ],
      };
    }
    return sub;
  });
  saveAcademicSubjects(updated);
}

export function deleteAcademicResource(subjectId, resourceIndex) {
  const subjects = getAcademicSubjects();
  const updated = subjects.map((sub) => {
    if (sub.id === subjectId && Array.isArray(sub.resources)) {
      const copy = [...sub.resources];
      copy.splice(resourceIndex, 1);
      return {
        ...sub,
        resources: copy,
      };
    }
    return sub;
  });
  saveAcademicSubjects(updated);
}


