import React from 'react';
import { 
  HeartHandshake, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ShieldAlert, 
  BookOpen, 
  GraduationCap,
  Sparkles,
  School,
  Building
} from 'lucide-react';
import { contactsList, schoolInfo } from '../data/initialData';

export default function Footer() {
  const cardColors = ['bg-[#fef08a]', 'bg-[#bae6fd]', 'bg-[#fecdd3]', 'bg-[#bbf7d0]'];

  return (
    <footer id="contacts" className="bg-[#121212] text-white border-t-4 border-black pt-16 pb-12 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Important Contacts Section */}
        <div className="mb-14 pb-12 border-b-2 border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#facc15] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000000]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>STUDENT SUPPORT DIRECTORY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Need Help? Reach Out Anytime
              </h3>
              <p className="text-zinc-400 font-bold text-xs sm:text-sm mt-1">
                From academic struggles to mental health support, our teachers and PETINAM are here for you.
              </p>
            </div>

            {/* School Office Hotline Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-mono-clean font-black text-black bg-[#f87171] border-2 border-black px-4 py-2.5 rounded-xl shadow-[3px_3px_0px_#000000] self-start md:self-auto">
              <ShieldAlert className="w-4 h-4 text-black shrink-0" />
              <span>OFFICE HOTLINE: {schoolInfo.phone}</span>
            </div>
          </div>

          {/* 4 Support Contact Cards (Neobrutalist Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactsList.map((contact, idx) => {
              const bg = cardColors[idx % cardColors.length];
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl ${bg} text-black border-2.5 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000000] transition-all duration-150 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono-clean font-black px-2 py-0.5 rounded bg-black text-white border border-black">
                        {contact.type}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                    </div>

                    <h4 className="text-sm font-black text-black leading-snug">
                      {contact.title}
                    </h4>

                    <p className="text-xs text-zinc-800 mt-1 font-extrabold">
                      {contact.person}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-black/30 space-y-1.5 text-xs font-mono-clean">
                    <div className="flex items-center gap-1.5 text-black font-bold">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <a href={`mailto:${contact.contact}`} className="hover:underline truncate">
                        {contact.contact}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-800 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-black" />
                      <span className="truncate">{contact.office}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* School Branding & Meta info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b-2 border-zinc-800 text-xs">
          
          {/* Brand & Crest Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-14 shrink-0 bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#facc15] flex items-center justify-center">
                <img 
                  src="/smjk-chung-hwa-kelantan-logo.png" 
                  alt="SMJK Chung Hwa Kelantan Official Crest" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-black text-white text-base tracking-wide uppercase font-mono-clean">
                  SMJK CHUNG HWA KELANTAN
                </h4>
                <p className="text-zinc-400 text-xs font-bold">{schoolInfo.chineseName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#facc15] text-black text-[10px] font-mono-clean font-black px-1.5 py-0.2 rounded border border-black">
                    KOD: {schoolInfo.schoolCode}
                  </span>
                  <span className="bg-[#67e8f9] text-black text-[10px] font-mono-clean font-black px-1.5 py-0.2 rounded border border-black">
                    EST. {schoolInfo.establishedYear}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">
              Official online portal for Form 6 students & PETINAM Student Council. Located at {schoolInfo.address}.
            </p>
            <div className="text-zinc-300 font-mono-clean text-[11px] space-y-0.5">
              <div>📞 Tel: <span className="font-bold text-white">{schoolInfo.phone}</span></div>
              <div>📠 Fax: <span className="font-bold text-white">{schoolInfo.fax}</span></div>
            </div>
          </div>

          {/* Quick Jump Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-black text-[#facc15] text-xs uppercase tracking-wider font-mono-clean flex items-center gap-1.5">
              <span>⚡ FAST NAVIGATION</span>
            </h5>
            <ul className="space-y-2 font-bold text-zinc-400">
              <li>
                <a href="#academic" className="hover:text-white hover:underline transition-colors">
                  📚 Academic Hub & Past Papers
                </a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-white hover:underline transition-colors">
                  📅 Form 6 Master Calendar
                </a>
              </li>
              <li>
                <a href="#announcements" className="hover:text-white hover:underline transition-colors">
                  📢 Official Announcement Board
                </a>
              </li>
              <li>
                <a href="#petinam" className="hover:text-white hover:underline transition-colors">
                  👑 PETINAM Committee & Misi
                </a>
              </li>
              <li>
                <a href="#voice" className="hover:text-white hover:underline transition-colors">
                  💬 Voice Matters (Feedback)
                </a>
              </li>
            </ul>
          </div>

          {/* External STPM & Higher Education Portals */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-black text-[#67e8f9] text-xs uppercase tracking-wider font-mono-clean flex items-center gap-1.5">
              <span>🏛️ STPM & HIGHER ED PORTALS</span>
            </h5>
            <ul className="space-y-2 font-bold text-zinc-400">
              <li>
                <a 
                  href="https://www.mpm.edu.my" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Majlis Peperiksaan Malaysia (MPM)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://online.mohe.gov.my/upu5/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>UPU Online MOHE Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://biasiswa.mohe.gov.my" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Kementerian Pendidikan Tinggi (KPT)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Neobrutalist Tag */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-clean text-zinc-400">
          <div className="font-bold">
            © {new Date().getFullYear()} FORM 6 @ SMJK CHUNG HWA, KELANTAN. All rights reserved.
          </div>
          <div className="inline-flex items-center gap-2 bg-zinc-900 border-2 border-black px-3 py-1 rounded-lg text-white shadow-[2px_2px_0px_#facc15]">
            <span>Crafted with</span>
            <span className="text-[#f472b6]">❤️</span>
            <span>for PETINAM & Chung Hwa Scholars</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
