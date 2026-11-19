"use client";

import React, { useEffect, useRef, useState } from "react";
import { LucideProps } from "lucide-react";

interface InteractiveUiUxProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractiveUiUx: React.FC<InteractiveUiUxProps> = ({
  className = "w-6 h-6",
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleMotionChange);

      const container = containerRef.current;
      if (!container) return;

      const parentGroup = container.closest(".group") || container.parentElement;

      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      if (parentGroup && parentGroup !== container) {
        parentGroup.addEventListener("mouseenter", handleMouseEnter);
        parentGroup.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        if (parentGroup && parentGroup !== container) {
          parentGroup.removeEventListener("mouseenter", handleMouseEnter);
          parentGroup.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
  }, []);

  const active = isHovered && !reducedMotion;

  const easeCurve = "cubic-bezier(0.16, 1, 0.3, 1)";
  const transitionEnter = `transform 550ms ${easeCurve}, stroke 500ms ${easeCurve} 60ms, opacity 550ms ${easeCurve}`;
  const transitionLeave = `transform 450ms ${easeCurve}, stroke 450ms ${easeCurve}, opacity 450ms ${easeCurve}`;
  const transitionStyle = active ? transitionEnter : transitionLeave;

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer select-none ${className}`}
      style={style}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full shrink-0 overflow-visible"
      >
        {/* Top Layer — Lifts UP vertically & transitions to Royal Blue (#2563EB) */}
        <path
          d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
          style={{
            transform: active ? "translateY(-4.5px)" : "translateY(0px)",
            stroke: active ? "#2563EB" : "currentColor",
            opacity: active ? 1 : 1,
            transition: transitionStyle,
          }}
        />

        {/* Middle Layer — Stays centered & transitions to Teal/Green (#10B981) */}
        <path
          d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L3.18 12.5"
          style={{
            transform: active ? "translateY(0px)" : "translateY(0px)",
            stroke: active ? "#10B981" : "currentColor",
            opacity: active ? 0.9 : 1,
            transition: transitionStyle,
          }}
        />

        {/* Bottom Layer — Moves DOWN vertically & transitions to Sky Blue/Teal (#0EA5E9) */}
        <path
          d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L3.18 17.5"
          style={{
            transform: active ? "translateY(4.5px)" : "translateY(0px)",
            stroke: active ? "#0EA5E9" : "currentColor",
            opacity: active ? 0.8 : 1,
            transition: transitionStyle,
          }}
        />
      </svg>
    </span>
  );
};
