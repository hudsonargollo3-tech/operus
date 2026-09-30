'use client';

import React from 'react';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Operus Surgical Suite',
  submessage = 'Carregando agenda cirúrgica e prontuários...'
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090D16] text-white select-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-operus-800/30 via-operus-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      
      {/* Central Animated Surgical Ring & Icon */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Dashed Ring */}
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-operus-500/40 animate-spin-slow" />
        
        {/* Middle Pulsing Ring */}
        <div className="absolute w-20 h-20 rounded-full border-2 border-operus-400/60 animate-ping opacity-25" />
        
        {/* Inner Solid Bezel */}
        <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-operus-500/50 shadow-[0_0_25px_rgba(0,105,72,0.4)] flex items-center justify-center">
          {/* Medical Cross Vector Mark */}
          <svg className="w-8 h-8 text-lime-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v16m-8-8h16" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Brand & Loading Status */}
      <div className="text-center z-10 space-y-2">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-operus-100 to-lime-300 bg-clip-text text-transparent">
          {message}
        </h2>
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          {submessage}
        </p>
      </div>

      {/* Bottom Progress Bar Indicator */}
      <div className="mt-8 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-operus-500 via-lime-400 to-cyan-500 w-1/2 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};
