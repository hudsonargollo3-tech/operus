'use client';

import React from 'react';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Operus Surgical Suite',
  submessage = 'Carregando inteligência cirúrgica e protocolos...'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090D16] text-white select-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-[#1646BB]/35 via-[#2766E6]/20 to-sky-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      
      {/* Central Animated Operus Logo Mark */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Dashed Ring */}
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#2766E6]/50 animate-[spin_10s_linear_infinite]" />
        
        {/* Middle Pulsing Ring */}
        <div className="absolute w-20 h-20 rounded-full border border-sky-400/40 animate-ping opacity-30" />
        
        {/* Inner Solid Squircle Bezel with Authentic Operus Mark */}
        <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2766E6] to-[#1646BB] border border-blue-400/40 shadow-[0_0_30px_rgba(27,88,214,0.45)] flex items-center justify-center">
          <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(15 20 20)">
              <path d="M14.2 14.6 a8.6 8.6 0 1 0 11.6 0" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round"/>
              <g fill="#ffffff">
                <rect x="18.9" y="10.6" width="2.2" height="5.4" rx="0.5"/>
                <rect x="18.7" y="15.8" width="2.6" height="0.8"/>
                <path d="M18.7 16.6 L21.3 16.6 L21.3 19.4 Q21.3 21.2 20 21.2 Q18.7 21.0 18.7 19.4 Z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Brand & Loading Status */}
      <div className="text-center z-10 space-y-2 max-w-xs px-4">
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent font-heading">
          {message}
        </h2>
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          {submessage}
        </p>
      </div>

      {/* Bottom Progress Bar Indicator */}
      <div className="mt-8 w-44 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full bg-gradient-to-r from-[#1B58D6] via-[#2766E6] to-sky-400 w-1/2 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};
