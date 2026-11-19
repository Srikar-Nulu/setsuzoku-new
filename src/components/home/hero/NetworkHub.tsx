"use client";

import React from "react";
import Image from "next/image";

export const NetworkHub: React.FC = () => {
  return (
    <div className="relative group select-none flex items-center justify-center">
      {/* Subtle Ambient Breathing Halo */}
      <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-brand-blue/15 via-blue-400/15 to-brand-green/15 dark:from-blue-500/25 dark:via-blue-400/15 dark:to-emerald-500/25 blur-2xl opacity-70 animate-hub-breathing pointer-events-none" />

      {/* Central Stationary Hub Plate (Clean white interior preserves official dark-ink logo in both themes) */}
      <div className="relative w-[132px] h-[132px] sm:w-[144px] sm:h-[144px] rounded-full bg-white border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-900/5 dark:shadow-black/50 flex items-center justify-center p-4 transition-transform duration-300 hover:scale-[1.02]">
        <div className="absolute inset-2 rounded-full border border-slate-100 pointer-events-none" />

        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/brand/setsuzoku-logo.png"
            alt="Setsuzoku LLP Logo"
            width={140}
            height={55}
            priority
            className="w-auto h-11 sm:h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
};
