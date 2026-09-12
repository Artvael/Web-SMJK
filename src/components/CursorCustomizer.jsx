import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Sparkles, X, Check, Compass, Sliders, Zap } from 'lucide-react';

export default function CursorCustomizer({
  cursorConfig,
  setCursorConfig,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { id: 'orange', hex: '#f97316', label: 'Tangerine (React Bits)' },
    { id: 'yellow', hex: '#facc15', label: 'Canary Yellow' },
    { id: 'cyan', hex: '#38bdf8', label: 'Cyber Sky' },
    { id: 'pink', hex: '#f472b6', label: 'Coral Pink' },
    { id: 'green', hex: '#4ade80', label: 'Lime Mint' },
    { id: 'purple', hex: '#c084fc', label: 'Lilac Purple' },
  ];

  const presets = ['Sophie', 'You (L6SB)', 'PETINAM', 'Chung Hwa'];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2.5 bg-white hover:bg-zinc-50 text-black px-4 py-2.5 rounded-full border-2 border-black font-sans font-bold text-xs shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
        >
          <div
            style={{ backgroundColor: cursorConfig.color }}
            className="w-3.5 h-3.5 rounded-full border border-black shadow-inner"
          />
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>User Cursor: <span className="font-extrabold">{cursorConfig.name}</span></span>
        </button>
      )}

      {/* Popover Customizer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-80 bg-white rounded-3xl border-3 border-black p-5 shadow-[6px_6px_0px_#000000] text-black"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <span className="text-lg">🖱️</span>
                <div>
                  <h4 className="font-mono-clean font-black text-xs uppercase tracking-wider">
                    React Bits User Cursor
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-bold">Flexible Spring & Tilt Controller</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg border-2 border-black hover:bg-zinc-100 flex items-center justify-center cursor-pointer font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Name Presets */}
            <div className="mb-3">
              <label className="text-[10px] font-black uppercase font-mono-clean text-zinc-500 mb-1.5 block">
                Quick Presets
              </label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setCursorConfig((prev) => ({ ...prev, name: p }))}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                      cursorConfig.name === p
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-1 mb-3">
              <label className="text-[10px] font-black uppercase font-mono-clean text-zinc-500">
                Custom Tag Name
              </label>
              <input
                type="text"
                value={cursorConfig.name}
                onChange={(e) =>
                  setCursorConfig((prev) => ({ ...prev, name: e.target.value || 'Student' }))
                }
                maxLength={20}
                className="w-full px-3 py-1.5 text-xs font-bold border-2 border-black rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your name..."
              />
            </div>

            {/* Color Selector */}
            <div className="space-y-1.5 mb-4">
              <label className="text-[10px] font-black uppercase font-mono-clean text-zinc-500">
                Cursor & Pill Color
              </label>
              <div className="flex gap-2.5 items-center">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCursorConfig((prev) => ({ ...prev, color: c.hex }))}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 border-black cursor-pointer transition-transform ${
                      cursorConfig.color === c.hex
                        ? 'scale-120 shadow-[2px_2px_0px_#000]'
                        : 'opacity-85 hover:opacity-100 hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-3 border-t-2 border-black/20 space-y-2.5 text-xs font-bold">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Direction-Aware Tilt</span>
                </span>
                <input
                  type="checkbox"
                  checked={cursorConfig.directionTilt}
                  onChange={(e) =>
                    setCursorConfig((prev) => ({ ...prev, directionTilt: e.target.checked }))
                  }
                  className="accent-black w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span>Enable Custom Cursor</span>
                <input
                  type="checkbox"
                  checked={cursorConfig.enabled}
                  onChange={(e) =>
                    setCursorConfig((prev) => ({ ...prev, enabled: e.target.checked }))
                  }
                  className="accent-black w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Tip Banner */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-200 text-[11px] text-zinc-600 font-medium">
              💡 <em>Gerakkan mouse ke kiri & kanan dengan cepat untuk melihat ayunan fleksibel pada ekor nama!</em>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
