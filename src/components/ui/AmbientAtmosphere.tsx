"use client";

import React from "react";

/**
 * AmbientAtmosphere
 *
 * Subtle architectural paper depth across both Light and Dark themes.
 * Keeps canvas crisp and distraction-free while echoing Setsuzoku blue and emerald restraint.
 */
export const AmbientAtmosphere: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-white dark:bg-[#080C14] select-none transition-colors duration-200"
    >
      {/* Light mode refined daylight wash */}
      <div
        className="absolute inset-0 w-full h-full dark:hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 45% at 50% -10%, rgba(0, 102, 255, 0.045) 0%, transparent 65%),
            radial-gradient(ellipse 55% 40% at 95% 20%, rgba(0, 200, 83, 0.03) 0%, transparent 60%)
          `,
        }}
      />

      {/* Dark mode obsidian atmospheric depth */}
      <div
        className="absolute inset-0 w-full h-full hidden dark:block"
        style={{
          background: `
            radial-gradient(ellipse 85% 45% at 50% -15%, rgba(0, 102, 255, 0.14) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 92% 18%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
};
