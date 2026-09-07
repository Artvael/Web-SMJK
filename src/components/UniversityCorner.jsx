import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Building2, 
  Award, 
  ExternalLink, 
  Quote, 
  MapPin,
  Sparkles,
  Star
} from 'lucide-react';
import { universityCorner, seniorAdvice } from '../data/initialData';

export default function UniversityCorner() {
  const [activeTab, setActiveTab] = useState('unis');

  return (
    <section id="university" className="py-16 px-4 sm:px-6 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#c084fc] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>LIFE AFTER STPM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              University & Senior-Junior Hub
            </h2>
            <p className="mt-1 text-slate-700 font-bold text-xs sm:text-sm">
              Navigating public university entry requirements (UPU), prestigious scholarships, and survival advice from Form 6 alumni.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] self-start md:self-auto">
            <button
              onClick={() => setActiveTab('unis')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'unis' ? 'bg-[#fde047] text-black border-2 border-black shadow-[2px_2px_0px_#000]' : 'text-black hover:text-slate-600'
              }`}
            >
              🏛️ Public Universities
            </button>
            <button
              onClick={() => setActiveTab('senior')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'senior' ? 'bg-[#67e8f9] text-black border-2 border-black shadow-[2px_2px_0px_#000]' : 'text-black hover:text-slate-600'
              }`}
            >
              🧑‍🎓 Senior-Junior Hub
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'scholarships' ? 'bg-[#4ade80] text-black border-2 border-black shadow-[2px_2px_0px_#000]' : 'text-black hover:text-slate-600'
              }`}
            >
              💰 Scholarships & UPU
            </button>
          </div>
        </div>

        {/* Tab 1: Public Universities */}
        {activeTab === 'unis' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {universityCorner.map((uni, idx) => (
              <div
                key={uni.name}
                className="neo-card p-5 bg-white border-2.5 border-black flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono-clean font-black px-2.5 py-0.5 rounded border border-black bg-[#fef08a] text-black">
                      {uni.badge}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {uni.location}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-black leading-snug">
                    {uni.name}
                  </h3>

                  <div className="mt-4 pt-3 border-t-2 border-black/20 space-y-2.5 text-xs font-bold">
                    <div>
                      <span className="text-slate-500 block font-mono-clean text-[10px]">FLAGSHIP FACULTIES:</span>
                      <p className="text-black font-extrabold mt-0.5 leading-snug">{uni.notableCourses}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-mono-clean text-[10px]">STPM BENCHMARK:</span>
                      <p className="text-emerald-700 font-black mt-0.5 font-mono-clean">{uni.stpmRequirement}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-black">
                  <a
                    href="https://online.mohe.gov.my/upu5/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs text-black font-black hover:underline"
                  >
                    <span>View Faculty Criteria</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Senior-Junior Hub */}
        {activeTab === 'senior' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seniorAdvice.map((advice, idx) => (
              <div
                key={idx}
                className="neo-card p-6 bg-[#fffdf0] border-2.5 border-black flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-clean font-black px-2.5 py-0.5 rounded border border-black bg-[#fde047] text-black">
                      TAG: {advice.category}
                    </span>
                    <Quote className="w-5 h-5 text-black" />
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-black">
                    {advice.title}
                  </h4>

                  <p className="mt-3 text-black font-handwriting text-2xl sm:text-3xl leading-snug">
                    “{advice.snippet}”
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono-clean font-bold">
                  <span className="text-black font-black">{advice.author}</span>
                  <span className="underline cursor-pointer">Read Guide ➔</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Scholarships & UPU Timeline */}
        {activeTab === 'scholarships' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 bg-white border-2.5 border-black">
              <span className="text-[11px] font-mono-clean font-black px-2.5 py-0.5 rounded border border-black bg-[#bae6fd] text-black">GOVERNMENT SCHOLARSHIPS</span>
              <h4 className="mt-3 text-base font-black text-black">JPA Program Penajaan Ijazah Dalam Negara (PIDN)</h4>
              <p className="mt-2 text-xs font-bold text-slate-700 leading-relaxed">
                Full sponsorship and monthly allowance for STPM top achievers admitted to public universities (IPTA).
              </p>
              <div className="mt-5 pt-3 border-t-2 border-black text-xs font-black text-blue-700 font-mono-clean">
                Requirement: CGPA 3.75+
              </div>
            </div>

            <div className="neo-card p-6 bg-white border-2.5 border-black">
              <span className="text-[11px] font-mono-clean font-black px-2.5 py-0.5 rounded border border-black bg-[#fef08a] text-black">STATE FOUNDATIONS</span>
              <h4 className="mt-3 text-base font-black text-black">Yayasan Kelantan Darul Naim (YAKIN)</h4>
              <p className="mt-2 text-xs font-bold text-slate-700 leading-relaxed">
                State scholarship & study loans for Kelantan students pursuing higher education at local public and private universities.
              </p>
              <div className="mt-5 pt-3 border-t-2 border-black text-xs font-black text-amber-800 font-mono-clean">
                Kelantan Residents & STPM Graduates
              </div>
            </div>

            <div className="neo-card p-6 bg-white border-2.5 border-black">
              <span className="text-[11px] font-mono-clean font-black px-2.5 py-0.5 rounded border border-black bg-[#4ade80] text-black">CENTRAL PORTAL</span>
              <h4 className="mt-3 text-base font-black text-black">UPU Online Application Portal</h4>
              <p className="mt-2 text-xs font-bold text-slate-700 leading-relaxed">
                Single centralized gateway for admission into 20 public universities across Malaysia. Merit 90% Academic + 10% Co-Curriculum.
              </p>
              <div className="mt-5 pt-3 border-t-2 border-black">
                <a
                  href="https://online.mohe.gov.my/upu5/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-black text-black hover:underline flex items-center gap-1.5"
                >
                  Visit Portal ➔ <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
