"use client";

import React from "react";

export const ConnectionGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-connection-grid opacity-60" />
      
      {/* Soft Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative SVG Connection Network */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="conn-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B64E5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="conn-line-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Diagonal Subtle Path 1 */}
        <path
          d="M -100,100 Q 300,200 800,50 T 1600,300"
          fill="none"
          stroke="url(#conn-line-1)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />

        {/* Diagonal Subtle Path 2 */}
        <path
          d="M 100,500 C 400,250 900,450 1400,200"
          fill="none"
          stroke="url(#conn-line-2)"
          strokeWidth="1.5"
        />

        {/* Pulse Connection Nodes */}
        <circle cx="300" cy="180" r="3" fill="#0B64E5" className="animate-pulse" />
        <circle cx="800" cy="50" r="4" fill="#10B981" className="animate-pulse" />
        <circle cx="400" cy="330" r="3" fill="#F59E0B" className="animate-pulse" />
      </svg>
    </div>
  );
};
