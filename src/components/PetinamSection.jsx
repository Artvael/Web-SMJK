import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Users, 
  CheckCircle2, 
  FileText, 
  Mail, 
  Sparkles, 
  Award, 
  Flame, 
  Star 
} from 'lucide-react';
import { getPetinamTeam } from '../lib/contentStore';

export default function PetinamSection() {
  const [activeTab, setActiveTab] = useState('manifesto');
  const [team, setTeam] = useState(() => getPetinamTeam());

  useEffect(() => {
    const handleSync = () => {
      setTeam(getPetinamTeam());
    };
    window.addEventListener('content_updated', handleSync);
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    return () => {
      window.removeEventListener('content_updated', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  const cardColors = [
    'bg-[#fef08a]', // President Yellow
    'bg-[#bae6fd]', // VP Blue
    'bg-[#bbf7d0]', // Secretary Mint
    'bg-[#fed7aa]', // Treasurer Peach
  ];

  return (
    <section id="petinam" className="py-16 px-4 sm:px-6 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4ade80] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
            <Crown className="w-3.5 h-3.5" />
            <span>OFFICIAL STUDENT COUNCIL PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            Persatuan Tingkatan Enam (PETINAM)
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-black text-black">
            <span className="marker-highlight">“{team.mission || 'Your Voice. Your Future. Our Journey.'}”</span>
          </p>

          <p className="mt-3 text-slate-700 font-bold text-xs sm:text-sm leading-relaxed">
            {team.description}
          </p>
        </div>

        {/* Committee Section with View Toggles */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-black" />
              <h3 className="text-lg sm:text-xl font-black text-black uppercase">
                Barisan Kepimpinan PETINAM (2026/2027)
              </h3>
            </div>
            
            {/* View Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#f1f5f9] p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <button
                onClick={() => setActiveTab('high')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'high' || activeTab === 'manifesto' || activeTab === 'projects'
                    ? 'bg-[#fef08a] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                👑 Majlis Tertinggi (6)
              </button>
              <button
                onClick={() => setActiveTab('exco')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'exco'
                    ? 'bg-[#38bdf8] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                ⚡ Barisan Exco (8)
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#4ade80] text-black border border-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                📋 Semua (14)
              </button>
            </div>
          </div>

          {/* High Committee Cards (6 Executive Roles) */}
          {(activeTab === 'high' || activeTab === 'manifesto' || activeTab === 'projects' || activeTab === 'all') && (
            <div className="mb-8">
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black/20">
                  <span className="text-xs font-mono-clean font-black bg-[#fef08a] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                    BAHAGIAN 1
                  </span>
                  <h4 className="font-black text-sm uppercase text-black">Majlis Tertinggi Eksekutif</h4>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(team.highCommittee || []).map((member, index) => (
                  <motion.div
                    key={member.role + index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, x: -2 }}
                    className={`neo-card relative p-5 border-3 border-black flex flex-col justify-between group ${member.color || cardColors[index % cardColors.length]}`}
                  >
                    {/* Visual Paper Clip on President Card */}
                    {member.isPresident && (
                      <div className="absolute -top-3.5 right-4 bg-red-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_#000] border border-black rotate-2 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-300" />
                        <span>PRESIDEN • COUNCIL HEAD</span>
                      </div>
                    )}

                    <div>
                      {/* Avatar & Class */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0px_#000000] group-hover:rotate-6 transition-transform">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="text-base font-black text-black leading-tight">
                            {member.name}
                          </h4>
                          <p className="text-xs font-black text-blue-900 uppercase mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <span className="inline-block text-[11px] font-mono-clean font-extrabold text-black bg-white border-2 border-black px-2 py-0.5 rounded mb-3 shadow-[1.5px_1.5px_0px_#000]">
                        {member.class}
                      </span>

                      {/* Quote in handwriting */}
                      <p className="text-xs sm:text-sm text-black font-semibold leading-relaxed pt-2 border-t-2 border-black/30 font-sans">
                        “{member.quote}”
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-[11px] font-mono-clean font-bold text-black">
                      <span>Peranan: {member.badge}</span>
                      <a
                        href="#voice"
                        className="font-black underline hover:text-blue-900"
                      >
                        Aspirasi ➔
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Barisan Exco Portfolios (8 Biro Roles) */}
          {(activeTab === 'exco' || activeTab === 'all') && (
            <div>
              {activeTab === 'all' && (
                <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-black/20">
                  <span className="text-xs font-mono-clean font-black bg-[#38bdf8] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                    BAHAGIAN 2
                  </span>
                  <h4 className="font-black text-sm uppercase text-black">Barisan Ketua Exco & Biro</h4>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(team.excoList || []).map((exco, idx) => (
                  <motion.div
                    key={exco.role + idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    whileHover={{ y: -3, x: -2 }}
                    className={`p-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between ${exco.color}`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-2xl bg-white p-1.5 rounded-xl border border-black shadow-[1.5px_1.5px_0px_#000]">
                          {exco.icon}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono-clean font-black text-slate-700 uppercase block">
                            {exco.role}
                          </span>
                          <h4 className="font-black text-sm text-black leading-tight">
                            {exco.name}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed mt-2 pt-2 border-t border-black/20">
                        {exco.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-black/20 flex items-center justify-between text-[10px] font-mono-clean font-black text-black">
                      <span>SMJK CHUNG HWA</span>
                      <span>2026/2027</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Manifestos, Projects & Council Info Tabs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#fcfaf5] border-3 border-black shadow-[5px_5px_0px_#000]">
          <div className="flex flex-wrap items-center gap-3 pb-5 border-b-2 border-black mb-6">
            <button
              onClick={() => setActiveTab('manifesto')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                activeTab === 'manifesto'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#fde047]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              📜 Our 4 Key Manifestos
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#fde047]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              🚀 Upcoming Programmes & Projects
            </button>
            <button
              onClick={() => setActiveTab('minutes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                activeTab === 'minutes'
                  ? 'bg-black text-white shadow-[3px_3px_0px_#fde047]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              📂 Meeting Minutes Archive
            </button>
          </div>

          {/* Tab 1: Manifestos */}
          {activeTab === 'manifesto' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {petinamTeam.manifestos.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-white border-2.5 border-black shadow-[3px_3px_0px_#000] flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                  <div>
                    <span className="text-xs font-black text-black font-mono-clean bg-[#fef08a] px-2 py-0.5 rounded border border-black">
                      PLEDGE 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-black leading-snug mt-2">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 2: Projects */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              <div className="p-5 rounded-2xl bg-white border-2.5 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black px-2 py-0.5 bg-[#67e8f9] text-black border border-black rounded">IN PROGRESS</span>
                <h4 className="mt-2.5 text-base font-black text-black">Form 6 Buddy Mentorship</h4>
                <p className="mt-1 text-xs font-bold text-slate-700">Pairing Upper 6 seniors with Lower 6 juniors for study guidance and MUET tips.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2.5 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black px-2 py-0.5 bg-[#fde047] text-black border border-black rounded">PLANNING</span>
                <h4 className="mt-2.5 text-base font-black text-black">STPM Intensive Drill Week</h4>
                <p className="mt-1 text-xs font-bold text-slate-700">Peer study groups covering difficult questions in Pengajian Am and Chemistry.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2.5 border-black shadow-[3px_3px_0px_#000]">
                <span className="text-[10px] font-black px-2 py-0.5 bg-[#f472b6] text-black border border-black rounded">UPCOMING</span>
                <h4 className="mt-2.5 text-base font-black text-black">PETINAM Senior Farewell Night</h4>
                <p className="mt-1 text-xs font-bold text-slate-700">Annual celebration and dinner honoring graduating Upper 6 students.</p>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Minutes */}
          {activeTab === 'minutes' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3.5"
            >
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-black" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-black">PETINAM Meeting Minutes #04 (Aug 2026)</h5>
                    <p className="text-[11px] font-bold text-slate-500">Discussion on library extended hours & debate selection</p>
                  </div>
                </div>
                <span className="neo-btn bg-[#fef08a] text-black text-xs px-3 py-1">View PDF</span>
              </div>

              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-black" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-black">PETINAM Meeting Minutes #03 (July 2026)</h5>
                    <p className="text-[11px] font-bold text-slate-500">Orientation week review & budget allocations</p>
                  </div>
                </div>
                <span className="neo-btn bg-[#fef08a] text-black text-xs px-3 py-1">View PDF</span>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
