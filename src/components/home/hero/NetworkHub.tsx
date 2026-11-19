"use client";

import React from "react";
import Image from "next/image";

export const NetworkHub: React.FC = () => {
  return (
    <div className="relative group select-none flex items-center justify-center pointer-events-auto">
      {/* Multi-layered Luminous Core Halo matching reference atmospheric bloom */}
      <div
        className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#0066FF]/25 via-[#0EA5E9]/20 to-[#00C853]/25 dark:from-[#3B82F6]/35 dark:via-[#38BDF8]/25 dark:to-[#10B981]/30 blur-2xl opacity-85 animate-hub-breathing pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#0066FF]/20 via-transparent to-[#00C853]/20 blur-md pointer-events-none"
        aria-hidden="true"
      />

      {/* Luminous Spherical Outer Rim Ring */}
      <div className="relative p-[3px] rounded-full bg-gradient-to-br from-[#0066FF] via-[#0EA5E9] to-[#00C853] shadow-[0_14px_40px_-8px_rgba(0,102,255,0.38)] dark:shadow-[0_14px_44px_-8px_rgba(59,130,246,0.45)] transition-transform duration-300 group-hover:scale-[1.03]">
        {/* Crisp Pure White Inner Sphere Core — ensures official dark-ink logo stays razor sharp in Light & Dark modes */}
        <div className="relative w-[112px] h-[112px] sm:w-[126px] sm:h-[126px] rounded-full bg-white flex items-center justify-center p-3.5 overflow-hidden">
          {/* Subtle top specular glass reflection arc */}
          <div
            className="absolute inset-x-3 top-1.5 h-10 rounded-full bg-gradient-to-b from-blue-50/90 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-1.5 rounded-full border border-slate-100/90 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/brand/setsuzoku-logo.png"
              alt="Setsuzoku LLP Logo"
              width={140}
              height={55}
              priority
              className="w-auto h-9 sm:h-11 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
