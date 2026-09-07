import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FigmaCursors() {
  const [enabled, setEnabled] = useState(true);

  // Simulated student cursors hovering on the collaborative canvas
  const cursors = [
    {
      id: 'c1',
      name: 'Vannie Liew • Pres',
      color: '#ef4444', // red
      textColor: '#ffffff',
      initial: { x: '18vw', y: '260px' },
      animate: {
        x: ['18vw', '22vw', '15vw', '18vw'],
        y: ['260px', '320px', '290px', '260px'],
      },
      duration: 12,
    },
    {
      id: 'c2',
      name: 'Jerry See • VP',
      color: '#0284c7', // blue
      textColor: '#ffffff',
      initial: { x: '72vw', y: '220px' },
      animate: {
        x: ['72vw', '65vw', '76vw', '72vw'],
        y: ['220px', '180px', '250px', '220px'],
      },
      duration: 14,
    },
    {
      id: 'c3',
      name: 'Tan Yon Jian • SU',
      color: '#10b981', // green
      textColor: '#ffffff',
      initial: { x: '45vw', y: '520px' },
      animate: {
        x: ['45vw', '52vw', '40vw', '45vw'],
        y: ['520px', '480px', '550px', '520px'],
      },
      duration: 16,
    },
    {
      id: 'c4',
      name: 'Kor Lewis • Bendahari',
      color: '#f59e0b', // amber
      textColor: '#ffffff',
      initial: { x: '80vw', y: '580px' },
      animate: {
        x: ['80vw', '74vw', '84vw', '80vw'],
        y: ['580px', '520px', '610px', '580px'],
      },
      duration: 15,
    },
  ];

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 hidden md:block">
      {cursors.map((cursor) => (
        <motion.div
          key={cursor.id}
          initial={cursor.initial}
          animate={cursor.animate}
          transition={{
            duration: cursor.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute flex items-start gap-1 select-none"
        >
          {/* Classic Figma Cursor Arrow */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill={cursor.color} 
            stroke="#000000" 
            strokeWidth="1.5" 
            className="drop-shadow-[2px_2px_0px_#000000]"
          >
            <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" />
          </svg>

          {/* User Name Tag Badge (Neobrutalist) */}
          <div
            style={{ backgroundColor: cursor.color, color: cursor.textColor }}
            className="px-2 py-0.5 rounded-md text-[11px] font-extrabold tracking-tight border border-black shadow-[2px_2px_0px_#000000] font-mono-clean whitespace-nowrap"
          >
            {cursor.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
