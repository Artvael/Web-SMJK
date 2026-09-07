import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import WeeklyTicker from './components/WeeklyTicker';
import Announcements from './components/Announcements';
import AcademicHub from './components/AcademicHub';
import CalendarSection from './components/CalendarSection';
import PetinamSection from './components/PetinamSection';
import StudentVoice from './components/StudentVoice';
import UniversityCorner from './components/UniversityCorner';
import Footer from './components/Footer';
import UserCursor from './components/UserCursor';
import CursorCustomizer from './components/CursorCustomizer';
import StaggeredMenu from './components/StaggeredMenu';
import ScrollReveal from './components/ScrollReveal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorConfig, setCursorConfig] = useState({
    enabled: true,
    name: 'Sophie',
    color: '#f97316',
    textColor: '#ffffff',
    directionTilt: true,
    badge: '',
  });

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
      setShowScrollTop(latest > 0.12);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800 font-sans selection:bg-[#fde047] selection:text-black relative">
      {/* Top Navbar (renders portal destination #staggered-menu-portal directly below Drop a Note) */}
      <Navbar isMenuOpen={isMenuOpen} />

      {/* Staggered Animated Menu (React Bits, Left Position) */}
      <StaggeredMenu
        position="left"
        isFixed={true}
        colors={['#fde047', '#38bdf8', '#f472b6']}
        accentColor="#e11d48"
        logoUrl="/smjk-chung-hwa-kelantan-logo.png"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* Main Content Sections with Neobrutalist Scroll Triggers */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section (with 6 Quick Navigation Buttons & Figma Cursors) */}
        <Hero />

        {/* High-Energy Neobrutalist Infinite Running Marquee */}
        <InfiniteMarquee />

        {/* 2. "What's happening this week?" Clipboard Ticker */}
        <ScrollReveal direction="up" delay={0.05}>
          <WeeklyTicker />
        </ScrollReveal>

        {/* 3. Announcements Board (The Corkboard Notice) */}
        <ScrollReveal direction="up" delay={0.06}>
          <Announcements />
        </ScrollReveal>

        {/* 4. Academic Hub (Subject Binders: PA, Bio, Chem, Math, MUET) */}
        <ScrollReveal direction="up" delay={0.06}>
          <AcademicHub />
        </ScrollReveal>

        {/* 5. Form 6 Calendar (Desk Planner with Color-Coded Categories) */}
        <ScrollReveal direction="up" delay={0.06}>
          <CalendarSection />
        </ScrollReveal>

        {/* 6. PETINAM Student Council (Committee Notebook & Manifesto) */}
        <ScrollReveal direction="up" delay={0.06}>
          <PetinamSection />
        </ScrollReveal>

        {/* 7. "Your Voice Matters" (Interactive Digital Feedback Form) */}
        <ScrollReveal direction="up" delay={0.06}>
          <StudentVoice />
        </ScrollReveal>

        {/* 8. University & Senior-Junior Corner (UM, USM, UKM, UPM, Scholarships) */}
        <ScrollReveal direction="up" delay={0.06}>
          <UniversityCorner />
        </ScrollReveal>
      </main>

      {/* 9. Footer & Important Contacts Directory */}
      <Footer />

      {/* Floating Back to Top Button with Circular Scroll Progress Ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 25 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.92, y: 1 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-40 p-2 sm:p-2.5 rounded-2xl bg-[#facc15] hover:bg-[#fde047] text-black font-black shadow-[4px_4px_0px_#000000] border-2.5 border-black transition-colors cursor-pointer flex items-center gap-2 group"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Radial SVG Scroll Progress Ring */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="rgba(0,0,0,0.15)"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeDasharray="81.68"
                  strokeDashoffset={81.68 - (81.68 * scrollPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-100"
                />
              </svg>
              <ArrowUp className="w-4 h-4 stroke-[3] absolute inset-0 m-auto text-black group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[11px] font-mono-clean font-black pr-1 hidden sm:inline">
              {scrollPercent}%
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Customizer Dock for User Cursor */}
      <CursorCustomizer
        cursorConfig={cursorConfig}
        setCursorConfig={setCursorConfig}
      />

      {/* React Bits Pro User Cursor Component (Follows pointer with name tag & direction tilt) */}
      {cursorConfig.enabled && (
        <UserCursor
          name={cursorConfig.name}
          color={cursorConfig.color}
          textColor={cursorConfig.textColor}
          directionTilt={cursorConfig.directionTilt}
          badge={cursorConfig.badge}
          fullScreen={true}
        />
      )}
    </div>
  );
}
