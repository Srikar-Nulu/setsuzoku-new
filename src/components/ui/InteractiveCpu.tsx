"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cpu, LucideProps } from "lucide-react";

interface InteractiveCpuProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractiveCpu: React.FC<InteractiveCpuProps> = ({
  className = "w-6 h-6",
  icon: IconComponent = Cpu,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    const parentGroup = container.closest(".group") || container.parentElement;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    if (parentGroup && parentGroup !== container) {
      parentGroup.addEventListener("mouseenter", handleMouseEnter);
      parentGroup.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (parentGroup && parentGroup !== container) {
        parentGroup.removeEventListener("mouseenter", handleMouseEnter);
        parentGroup.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer select-none text-current ${className}`}
      style={style}
      {...props}
    >
      {!isHovered ? (
        /* Static State: Exact Original Lucide Cpu Icon */
        <IconComponent className="w-full h-full shrink-0" />
      ) : (
        /* Hover State: 5-Phase Processor Activation Sequence (Connect -> Initialize -> Signal -> Process -> Ready) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full shrink-0 overflow-visible"
        >
          {/* Phase 1: Connect — Pins displace outward by 2px */}
          <g className="cpu-pins-top">
            <path d="M9 2v2" />
            <path d="M15 2v2" />
          </g>

          <g className="cpu-pins-right">
            <path d="M20 9h2" />
            <path d="M20 15h2" />
          </g>

          <g className="cpu-pins-bottom">
            <path d="M15 20v2" />
            <path d="M9 20v2" />
          </g>

          <g className="cpu-pins-left">
            <path d="M2 15h2" />
            <path d="M2 9h2" />
          </g>

          {/* Outer Casing Frame */}
          <rect width="16" height="16" x="4" y="4" rx="2" className="cpu-casing-frame" />

          {/* Phase 2: Initialize — Inner core die mechanical snap/settle */}
          <rect width="6" height="6" x="9" y="9" rx="1" className="cpu-core-die" />

          {/* Phase 3: Signal — Signal dot travels along circuit trace */}
          <circle r="1" className="cpu-signal-dot" />

          {/* Phase 4: Process — Sequential processing indicators • → • → • */}
          <circle cx="10.2" cy="12" r="0.8" className="cpu-proc-dot-1" />
          <circle cx="12" cy="12" r="0.8" className="cpu-proc-dot-2" />
          <circle cx="13.8" cy="12" r="0.8" className="cpu-proc-dot-3" />
        </svg>
      )}
    </span>
  );
};
