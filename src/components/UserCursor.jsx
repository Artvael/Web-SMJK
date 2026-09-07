import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Enhanced UserCursor Component (React Bits Pro Spec)
 * 
 * Features:
 * - Direction-aware tilt with resting angle (-14deg)
 * - Ultra-flexible jointed trailing name tag with inertial pendulum swing
 * - Secondary spring lag: the tag trails behind and flexibly sways left & right
 * - Squash & stretch physics based on movement velocity
 * - Pixel-perfect pointer tip alignment at (3, 3)
 * - Click squash & ripple effect
 * - Auto-detects touch devices to prevent mobile tapping conflicts
 */
export default function UserCursor({
  name = 'Sophie',
  color = '#f97316', // React Bits Pro signature orange
  textColor = '#ffffff',
  directionTilt = true,
  fullScreen = true,
  showName = true,
  badge = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Raw pointer coordinates
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // 1. Primary Spring for the Cursor Arrow (Crisp, nimble, fast)
  const arrowX = useSpring(rawMouseX, { stiffness: 850, damping: 48, mass: 0.2 });
  const arrowY = useSpring(rawMouseY, { stiffness: 850, damping: 48, mass: 0.2 });

  // 2. Secondary Spring for the Name Tag Pill (Flexible, elastic trailing lag)
  const tagX = useSpring(rawMouseX, { stiffness: 260, damping: 20, mass: 0.7 });
  const tagY = useSpring(rawMouseY, { stiffness: 260, damping: 20, mass: 0.7 });

  // 3. Direction-aware tilt for Arrow & Swing for the Name Tag
  const rawArrowTilt = useMotionValue(-14); // Default resting tilt
  const smoothArrowTilt = useSpring(rawArrowTilt, { stiffness: 400, damping: 24 });

  const rawTagSwing = useMotionValue(0);
  const smoothTagSwing = useSpring(rawTagSwing, { stiffness: 300, damping: 18 });

  // 4. Squash & stretch based on velocity
  const rawStretch = useMotionValue(1);
  const smoothStretch = useSpring(rawStretch, { stiffness: 350, damping: 20 });

  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const stopTimer = useRef(null);

  useEffect(() => {
    // Detect mobile touch screen
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsTouch(true);
        return;
      }
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      rawMouseX.set(clientX);
      rawMouseY.set(clientY);
      setIsVisible(true);

      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const speed = Math.hypot(dx, dy);

      if (directionTilt && speed > 1.5) {
        // Expressive tilt: swings left when moving left, swings right when moving right
        // Resting tilt is -14deg, smoothly flexing between -55deg and +40deg
        const tilt = -14 + Math.max(-45, Math.min(50, dx * 1.8));
        rawArrowTilt.set(tilt);

        // Highly flexible swing for the tail name tag (sways opposite to motion momentum)
        const swing = Math.max(-38, Math.min(38, -dx * 1.4));
        rawTagSwing.set(swing);

        // Slight stretch along movement axis
        const stretchFactor = 1 + Math.min(speed * 0.0012, 0.22);
        rawStretch.set(stretchFactor);

        lastPos.current = { x: clientX, y: clientY, time: Date.now() };

        // Reset to resting position when pointer stops moving
        if (stopTimer.current) clearTimeout(stopTimer.current);
        stopTimer.current = setTimeout(() => {
          rawArrowTilt.set(-14);
          rawTagSwing.set(0);
          rawStretch.set(1);
        }, 80);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, [directionTilt, rawMouseX, rawMouseY, rawArrowTilt, rawTagSwing, rawStretch]);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isTouch) return null;

  return (
    <>
      {/* Click Ripples Effect */}
      <div className="fixed inset-0 pointer-events-none z-999997 overflow-hidden">
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onAnimationComplete={() => removeRipple(r.id)}
            style={{
              position: 'absolute',
              left: r.x - 18,
              top: r.y - 18,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: `2.5px solid ${color}`,
              boxShadow: `0 0 12px ${color}66`,
            }}
          />
        ))}
      </div>

      {/* Main Cursor Layer */}
      <AnimatePresence>
        {isVisible && (
          <div
            style={{
              position: fullScreen ? 'fixed' : 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 999999,
              overflow: 'hidden',
            }}
          >
            {/* 1. Fast Primary Pointer Arrow */}
            <motion.div
              style={{
                position: 'absolute',
                left: arrowX,
                top: arrowY,
                rotate: smoothArrowTilt,
                scaleX: smoothStretch,
                transformOrigin: '3px 3px', // Locks the click tip directly on the mouse pointer!
              }}
              animate={{
                scale: isClicking ? 0.8 : 1,
              }}
              transition={{ duration: 0.12 }}
              className="select-none"
            >
              {/* React Bits Pro Signature Arrow Glyph */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="drop-shadow-[2px_2px_3px_rgba(0,0,0,0.35)]"
              >
                <path d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z" />
              </svg>
            </motion.div>

            {/* 2. Flexible Trailing Name Tag Pill (Sways dynamically left-right with spring inertia) */}
            {showName && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: tagX,
                  top: tagY,
                  rotate: smoothTagSwing,
                  transformOrigin: 'left center',
                }}
                animate={{
                  scale: isClicking ? 0.9 : 1,
                  y: isClicking ? 2 : 0,
                }}
                className="select-none"
              >
                {/* Offset container with gentle floating bounce */}
                <motion.div
                  animate={{
                    y: [0, -2.5, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    marginLeft: '18px',
                    marginTop: '10px',
                    backgroundColor: color,
                    color: textColor,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0,0,0,0.2)',
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-tight border border-black/20 backdrop-blur-sm whitespace-nowrap cursor-default shadow-lg"
                >
                  {badge && <span className="text-[13px] leading-none">{badge}</span>}
                  <span className="font-sans font-semibold drop-shadow-sm">{name}</span>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
