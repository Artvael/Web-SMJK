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
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import { getCurrentUser, trackPageView, logoutUser } from './lib/authStore';
import { ArrowUp, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  useEffect(() => {
    // Record page view analytics
    trackPageView();

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '#login') {
        setIsAuthModalOpen(true);
      } else if (window.location.hash === '' || window.location.hash === '#home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToAdmin = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (currentUser.role !== 'admin') {
      setIsAuthModalOpen(true);
      return;
    }
    window.location.hash = '#admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    if (currentView === 'admin') {
      window.location.hash = '';
      setCurrentView('home');
    }
  };

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to Home page', link: '#' },
    { label: 'Academic Hub', ariaLabel: 'View STPM past-year notes & papers', link: '#academic' },
    { label: 'Calendar', ariaLabel: 'View Form 6 Master Calendar', link: '#calendar' },
    { label: 'Announcements', ariaLabel: 'View official bulletin notices', link: '#announcements' },
    { label: 'PETINAM Council', ariaLabel: 'Meet the PETINAM committee & manifesto', link: '#petinam' },
    { label: 'Student Voice', ariaLabel: 'Drop confidential feedback or appreciation', link: '#voice' },
    { label: 'University Corner', ariaLabel: 'University guide & senior hub', link: '#university' },
    ...(currentUser?.role === 'admin'
      ? [{ label: '👑 Admin Panel', ariaLabel: 'Control Center & Analytics', link: '#admin' }]
      : [{ label: '🔑 Login / Daftar', ariaLabel: 'Log masuk atau daftar akaun', link: '#login' }])
  ];

  if (currentView === 'admin') {
    if (currentUser && currentUser.role === 'admin') {
      return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans selection:bg-[#fde047] selection:text-black relative">
          <AdminDashboard
            currentUser={currentUser}
            onBackToSite={handleBackToSite}
            onLogout={handleLogout}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 selection:bg-[#fde047] selection:text-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neo-card bg-[#fffbeb] border-4 border-black p-8 sm:p-10 max-w-lg w-full text-center shadow-[8px_8px_0px_#000000] relative"
        >
          <div className="w-16 h-16 bg-[#fde047] border-3 border-black rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-[4px_4px_0px_#000]">
            🔒
          </div>
          <span className="text-xs font-mono-clean font-black bg-black text-[#fde047] px-3 py-1 rounded border border-black uppercase tracking-wider">
            KAWASAN TERHAD • PENTADBIR SAHAJA
          </span>
          <h2 className="text-2xl font-black text-black mt-3 mb-2 uppercase">
            Panel Admin PETINAM
          </h2>
          <p className="text-sm text-slate-700 font-semibold mb-6">
            Bahagian ini dikhaskan untuk pentadbir portal & Majlis Tertinggi Tingkatan 6 SMJK Chung Hwa. Sila log masuk dengan akaun pentadbir atau Google rasmi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="neo-btn bg-[#fde047] hover:bg-[#facc15] text-black text-xs sm:text-sm px-6 py-3 w-full sm:w-auto font-black shadow-[3px_3px_0px_#000]"
            >
              🔑 Log Masuk Pentadbir
            </button>
            <button
              type="button"
              onClick={handleBackToSite}
              className="neo-btn bg-white hover:bg-slate-100 text-black text-xs sm:text-sm px-6 py-3 w-full sm:w-auto font-bold shadow-[3px_3px_0px_#000]"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Kembali ke Web</span>
            </button>
          </div>
        </motion.div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            if (user.role === 'admin') {
              setCurrentView('admin');
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800 font-sans selection:bg-[#fde047] selection:text-black relative">
      {/* Top Navbar */}
      <Navbar 
        isMenuOpen={isMenuOpen} 
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onNavigateToAdmin={handleNavigateToAdmin}
        onLogout={handleLogout}
      />

      {/* Staggered Animated Menu (React Bits, Left Position) */}
      <StaggeredMenu
        position="left"
        isFixed={true}
        items={menuItems}
        colors={['#fde047', '#38bdf8', '#f472b6']}
        accentColor="#e11d48"
        logoUrl="/smjk-chung-hwa-kelantan-logo.png"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* Main Content Sections with Neobrutalist Scroll Triggers */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section (with 6 Quick Navigation Buttons & Figma Cursors) */}
        <Hero 
          currentUser={currentUser}
          onNavigateToAdmin={handleNavigateToAdmin}
        />

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

      {/* Authentication Modal (Google Sign-In & Email/Password) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            window.location.hash = '#admin';
            setCurrentView('admin');
          }
        }}
      />
    </div>
  );
}
