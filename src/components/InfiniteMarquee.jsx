import React from 'react';
import { Sparkles, Zap, Flame, Star } from 'lucide-react';

export default function InfiniteMarquee() {
  const items = [
    "🎓 FORM 6 @ SMJK CHUNG HWA KELANTAN",
    "⚡ STPM SEMESTER 1 EXAMINATION COUNTDOWN",
    "🏛️ S.M.C.H. ESTABLISHED 1918 (108 YEARS)",
    "📚 FREE PAST YEAR QUESTIONS & TOPICAL NOTES",
    "👑 PETINAM STUDENT COUNCIL OFFICIAL PORTAL",
    "💡 YOUR VOICE MATTERS — DROP A NOTE TODAY",
    "🔥 100% STUDENT-LED PRE-U COMMUNITY",
  ];

  return (
    <div className="bg-[#facc15] border-y-[2.5px] border-black py-2.5 overflow-hidden select-none font-mono-clean font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_4px_0_0_#000000]">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-4 text-black">
            <span>{text}</span>
            <Star className="w-3.5 h-3.5 fill-black text-black" />
          </div>
        ))}
      </div>
    </div>
  );
}
