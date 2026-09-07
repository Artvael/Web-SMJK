import React from 'react';
import { motion } from 'framer-motion';

/**
 * Neobrutalist ScrollReveal component
 * Provides tactile spring-based reveal animations when elements scroll into the viewport.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'pop'
  rotate = 0,
  className = '',
}) {
  const directionOffset = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    pop: { scale: 0.92, y: 20 },
  };

  const initial = {
    opacity: 0,
    rotate: rotate !== 0 ? rotate : 0,
    ...(directionOffset[direction] || directionOffset.up),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: 'spring',
        damping: 18,
        stiffness: 140,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
