/**
 * Utility helpers for "Notify Me" and Calendar Integration
 * Supports Google Calendar web links, standard .ics iCal downloads, and browser notifications.
 */

// Convert Date or date string to iCal format: YYYYMMDDTHHmmssZ or YYYYMMDD
export function toIcsDate(dateInput, allDay = true) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '20261116';

  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());

  if (allDay) {
    return `${year}${month}${day}`;
  }

  const hours = pad(d.getUTCHours());
  const minutes = pad(d.getUTCMinutes());
  const seconds = pad(d.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarUrl({
  title,
  description = '',
  startDate = '2026-11-16T08:00:00',
  endDate = '2026-11-16T17:00:00',
  location = 'SMJK Chung Hwa, Kota Bharu, Kelantan',
}) {
  const startStr = toIcsDate(startDate, false);
  const endStr = toIcsDate(endDate, false);

  const base = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startStr}/${endStr}`,
    details: `${description}\n\nSMJK Chung Hwa Kelantan (PETINAM Form 6 Portal)`,
    location: location,
  });

  return `${base}?${params.toString()}`;
}

/**
 * Download a standard .ics iCalendar file (works on Apple Calendar, Outlook, Google Calendar)
 */
export function downloadIcsFile({
  title,
  description = '',
  startDate = '2026-11-16T08:00:00',
  endDate = '2026-11-16T17:00:00',
  location = 'SMJK Chung Hwa, Kota Bharu, Kelantan',
  filename = 'event.ics',
}) {
  const startStr = toIcsDate(startDate, false);
  const endStr = toIcsDate(endDate, false);
  const stampStr = toIcsDate(new Date(), false);
  const uid = 'smjk_' + Date.now() + '@smjkchunghwa.edu.my';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SMJK Chung Hwa Kelantan//PETINAM Form 6 Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stampStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Request Web Browser Notification Permission & Trigger Immediate Confirmation
 */
export async function triggerBrowserReminder(title, body) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return { supported: false, granted: false };
  }

  let perm = Notification.permission;
  if (perm !== 'granted') {
    perm = await Notification.requestPermission();
  }

  if (perm === 'granted') {
    try {
      new Notification(`🔔 ${title}`, {
        body: body || 'Peringatan kalendar SMJK Chung Hwa telah berjaya diaktifkan!',
        icon: '/smjk-chung-hwa-kelantan-logo.png',
      });
      return { supported: true, granted: true };
    } catch {
      return { supported: true, granted: true };
    }
  }

  return { supported: true, granted: false };
}

/**
 * Export all calendar events into a single .ics calendar feed file
 */
export function downloadAllEventsIcs(events = [], filename = 'SMJK_Chung_Hwa_Master_Calendar_2026.ics') {
  if (!events.length) return;

  const stampStr = toIcsDate(new Date(), false);
  const vEvents = events.map((ev, i) => {
    const startStr = toIcsDate(ev.startDate || '2026-11-16T08:00:00', false);
    const endStr = toIcsDate(ev.endDate || '2026-11-16T17:00:00', false);
    const uid = `smjk_ev_${ev.id || i}_${Date.now()}@smjkchunghwa.edu.my`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stampStr}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${(ev.description || '').replace(/\n/g, '\\n')}`,
      `LOCATION:${ev.location || 'SMJK Chung Hwa, Kota Bharu, Kelantan'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
    ].join('\r\n');
  }).join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SMJK Chung Hwa Kelantan//PETINAM Form 6 Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:SMJK Chung Hwa Form 6 Master Calendar',
    vEvents,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
