import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, MapPin, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { weeklyActivities } from '../data/initialData';

export default function WeeklyTicker() {
  return (
    <section className="py-12 px-4 sm:px-6 bg-[#fcfaf5] border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: Neobrutalist Planner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#67e8f9] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000] rotate-[-2deg]">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase">
                  What’s Happening This Week?
                </h2>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-[#4ade80] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
                  LIVE DESK
                </span>
              </div>
              <p className="text-xs font-bold text-slate-600">Upcoming extra classes, MUET drills, and PETINAM meets</p>
            </div>
          </div>

          <div className="text-xs font-mono-clean font-black text-black bg-[#fde047] border-2 border-black px-3.5 py-1.5 rounded-xl shadow-[3px_3px_0px_#000000] self-start sm:self-auto">
            📅 WEEK 36 • TERM 2 (2026/27)
          </div>
        </div>

        {/* 4 Weekly Activity Neobrutalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {weeklyActivities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.07 }}
              whileHover={{ y: -4, x: -3 }}
              className="neo-card bg-white p-5 flex flex-col justify-between border-2.5 border-black relative"
            >
              {/* URGENT Badge */}
              {act.isUrgent && (
                <div className="absolute -top-3 -right-2 bg-[#f87171] text-white border-2 border-black font-extrabold text-[10px] px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_#000] rotate-6">
                  🔥 URGENT
                </div>
              )}

              <div>
                {/* Date & Day Header */}
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-black">
                  <span className="text-xs font-black text-black uppercase tracking-wider font-mono-clean bg-[#fef08a] px-2 py-0.5 rounded border border-black">
                    {act.day}
                  </span>
                  <span className="text-xs font-extrabold text-black font-mono-clean">
                    {act.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3.5 text-sm sm:text-base font-black text-black leading-snug hover:text-blue-700 transition-colors">
                  {act.title}
                </h3>

                {/* Meta: Time & Venue */}
                <div className="mt-3.5 space-y-1.5 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>{act.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                    <span className="truncate">{act.venue}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md border-2 border-black bg-[#e9d5ff] text-black shadow-[1.5px_1.5px_0px_#000]">
                  {act.category}
                </span>

                {act.isUrgent ? (
                  <span className="text-[10px] font-extrabold text-red-600 flex items-center gap-1 font-mono-clean">
                    <AlertCircle className="w-3 h-3" /> Mandatory
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-500 font-mono-clean">
                    Reminder
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
