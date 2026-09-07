import React from 'react';

export default function SchoolLogo({ size = 'md', className = '', showMotto = false }) {
  const sizeMap = {
    sm: 'w-8 h-9',
    md: 'w-10 h-12',
    lg: 'w-16 h-20',
    xl: 'w-24 h-28',
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`relative ${selectedSize} shrink-0 drop-shadow-sm hover:scale-105 transition-transform duration-200`}>
        <img 
          src="/smjk-chung-hwa-kelantan-logo.png" 
          alt="SMJK Chung Hwa Kelantan Official Crest" 
          className="w-full h-full object-contain"
        />
      </div>

      {showMotto && (
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xs tracking-tight text-slate-900 uppercase">SMJK CHUNG HWA KELANTAN</span>
            <span className="text-[10px] bg-red-100 text-red-900 font-bold px-1.5 py-0.2 rounded border border-red-300">EST. 1918</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">吉蘭丹中華國民型中學 • S.M.C.H. KELANTAN</p>
        </div>
      )}
    </div>
  );
}
