import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X } from 'lucide-react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

const defaultMenuItems = [
  { label: 'Home', ariaLabel: 'Go to Home page', link: '#' },
  { label: 'Academic Hub', ariaLabel: 'View STPM past-year notes & papers', link: '#academic' },
  { label: 'Calendar', ariaLabel: 'View Form 6 Master Calendar', link: '#calendar' },
  { label: 'Announcements', ariaLabel: 'View official bulletin notices', link: '#announcements' },
  { label: 'PETINAM Council', ariaLabel: 'Meet the PETINAM committee & manifesto', link: '#petinam' },
  { label: 'Memories Gallery', ariaLabel: 'View student life Polaroid gallery', link: '#gallery' },
  { label: 'Student Voice', ariaLabel: 'Drop confidential feedback or appreciation', link: '#voice' },
  { label: 'University Corner', ariaLabel: 'University guide & senior hub', link: '#university' },
  { label: 'Support Contacts', ariaLabel: 'Support directory and hotline', link: '#contacts' }
];

const defaultSocialItems = [
  { label: 'MPM Portal', link: 'https://www.mpm.edu.my' },
  { label: 'UPU Online', link: 'https://online.mohe.gov.my/upu5/' },
  { label: 'KPT Biasiswa', link: 'https://biasiswa.mohe.gov.my' },
  { label: 'SMJK Chung Hwa FB', link: 'https://www.facebook.com' }
];

export const StaggeredMenu = ({
  position = 'left',
  colors = ['#fde047', '#38bdf8', '#f472b6'],
  items = defaultMenuItems,
  socialItems = defaultSocialItems,
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/smjk-chung-hwa-kelantan-logo.png',
  menuButtonColor = '#000000',
  openMenuButtonColor = '#000000',
  accentColor = '#e11d48',
  changeMenuColorOnOpen = true,
  isFixed = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);

  const [portalTarget, setPortalTarget] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.getElementById('staggered-menu-portal');
    }
    return null;
  });

  useEffect(() => {
    if (!portalTarget && typeof document !== 'undefined') {
      const el = document.getElementById('staggered-menu-portal');
      if (el) setPortalTarget(el);
    }
  }, [portalTarget]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    let layers = preLayerElsRef.current;
    if (!layers || layers.length === 0) {
      if (preLayersRef.current) {
        layers = Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer'));
        preLayerElsRef.current = layers;
      } else {
        layers = [];
      }
    }

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    gsap.set([panel, ...layers], { opacity: 1 });

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.45, ease: 'power4.out' }, i * 0.06);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.06 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.07 : 0);
    const panelDuration = 0.6;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: { each: 0.08, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.5,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.06, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            stagger: { each: 0.06, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    if (!panel) return;

    let layers = preLayerElsRef.current;
    if (!layers || layers.length === 0) {
      if (preLayersRef.current) {
        layers = Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer'));
        preLayerElsRef.current = layers;
      } else {
        layers = [];
      }
    }

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.3,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
  }, [playOpen, playClose, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
    }
  }, [playClose, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = event => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#fde047', '#38bdf8', '#f472b6'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      {/* Toggle Button: Render via Portal into Navbar (directly below Drop a Note) or fallback header */}
      {(() => {
        const toggleButtonMarkup = (
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="font-mono-clean font-black text-xs uppercase tracking-wider">
              {open ? 'Close' : 'Menu'}
            </span>
            <span 
              className="w-3.5 h-3.5 flex items-center justify-center shrink-0 transition-transform duration-200"
              style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {open ? (
                <X className="w-3.5 h-3.5 stroke-[3] text-black" />
              ) : (
                <Plus className="w-3.5 h-3.5 stroke-[3] text-black" />
              )}
            </span>
          </button>
        );

        if (portalTarget) {
          return createPortal(toggleButtonMarkup, portalTarget);
        }

        return (
          <header className="staggered-menu-header" aria-label="Main navigation header">
            {toggleButtonMarkup}
          </header>
        );
      })()}

      {/* Backdrop overlay for click-outside dismissal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-10 pointer-events-auto cursor-pointer"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          {/* Branded Drawer Top Header (Shown inside drawer when opened) */}
          <div className="flex items-center gap-3 pb-3 mb-2 border-b-2 border-black">
            <div className="w-10 h-12 shrink-0 bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#fde047] flex items-center justify-center">
              <img
                src={logoUrl || '/smjk-chung-hwa-kelantan-logo.png'}
                alt="SMJK Chung Hwa Kelantan Crest"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono-clean font-black px-2 py-0.5 rounded bg-[#fef08a] text-black border border-black shadow-[1.5px_1.5px_0px_#000]">
                TINGKATAN 6 • PETINAM
              </span>
              <h4 className="font-mono-clean font-black text-sm text-black uppercase tracking-tight mt-0.5">
                SMJK CHUNG HWA
              </h4>
            </div>
          </div>

          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={closeMenu}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">⚡ Official Channels</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
