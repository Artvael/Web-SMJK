import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import { calendarEvents } from '../data/initialData';

export default function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'All Events', bg: 'bg-black text-white' },
    { id: 'STPM Exam', label: '🔴 STPM Exams', bg: 'bg-[#f87171] text-white' },
    { id: 'School Exam', label: '🔵 School Exams', bg: 'bg-[#67e8f9] text-black' },
    { id: 'Deadline', label: '🟡 Deadlines', bg: 'bg-[#fde047] text-black' },
    { id: 'PETINAM', label: '🟢 PETINAM Meets', bg: 'bg-[#4ade80] text-black' },
    { id: 'Holidays', label: '🟣 Holidays', bg: 'bg-[#c084fc] text-black' },
    { id: 'Competition', label: '🟠 Competitions', bg: 'bg-[#fb923c] text-black' },
  ];

  const filteredEvents = calendarEvents.filter((ev) => {
    if (selectedCategory === 'ALL') return true;
    return ev.category === selectedCategory;
  });

  return (
    <section id="calendar" className="py-16 px-4 sm:px-6 figma-neo-canvas border-b-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#bae6fd] border-2 border-black text-black text-xs font-black px-3 py-1 rounded-full mb-3 shadow-[2px_2px_0px_#000]">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>SHARED MASTER CALENDAR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Form 6 Desk Planner
            </h2>
            <p className="mt-1 text-slate-700 font-bold text-xs sm:text-sm">
              Color-coded master schedule covering STPM examinations, coursework submission dates, council meetings, and holidays.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-clean font-black text-black bg-[#fef08a] px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
            <span>ACADEMIC CALENDAR 2026/2027</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 border-black transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-[3px_3px_0px_#fde047] translate-x-[-1px] translate-y-[-1px]'
                    : `${cat.bg} hover:opacity-90 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5`
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Calendar Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredEvents.map((ev) => (
              <motion.div
                key={ev.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4, x: -3 }}
                className="neo-card p-6 bg-white border-3 border-black flex flex-col justify-between"
              >
                <div>
                  {/* Category Tag & Date */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md border-2 border-black bg-[#fef08a] text-black shadow-[1.5px_1.5px_0px_#000]">
                      {ev.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono-clean font-black text-black bg-slate-100 px-2.5 py-1 rounded-md border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{ev.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-black leading-snug hover:text-blue-700 transition-colors">
                    {ev.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {/* Footer status */}
                <div className="mt-6 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-mono-clean font-bold">
                  <span className="text-slate-500">
                    Registry: SMCH Kelantan
                  </span>
                  <span className="text-black font-extrabold flex items-center gap-0.5 hover:underline cursor-pointer">
                    Details ➔
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
