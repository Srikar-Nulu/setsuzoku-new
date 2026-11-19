"use client";

import React, { useEffect, useRef, useState } from "react";
import { LucideProps } from "lucide-react";

interface InteractiveDesignProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractiveDesign: React.FC<InteractiveDesignProps> = ({
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

      const handleMouseEnter = () => {
        if (mediaQuery.matches) return;
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

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer select-none ${className}`}
      style={style}
      {...props}
    >
      <style jsx>{`
        @keyframes paletteMixTilt {
          0% { transform: rotate(0deg) translate(0px, 0px); }
          25% { transform: rotate(-3deg) translate(-1px, -1px); }
          50% { transform: rotate(2deg) translate(1px, 0px); }
          75% { transform: rotate(-2deg) translate(0px, 1px); }
          100% { transform: rotate(0deg) translate(0px, 0px); }
        }

        @keyframes wellCycleColor1 {
          0% { fill: #2563EB; stroke: #2563EB; transform: scale(1); }
          25% { fill: #06B6D4; stroke: #06B6D4; transform: scale(1.25); }
          50% { fill: #10B981; stroke: #10B981; transform: scale(1); }
          75% { fill: #FBBF24; stroke: #FBBF24; transform: scale(1.2); }
          100% { fill: #2563EB; stroke: #2563EB; transform: scale(1); }
        }

        @keyframes wellCycleColor2 {
          0% { fill: #10B981; stroke: #10B981; transform: scale(1); }
          25% { fill: #FBBF24; stroke: #FBBF24; transform: scale(1.2); }
          50% { fill: #8B5CF6; stroke: #8B5CF6; transform: scale(1); }
          75% { fill: #2563EB; stroke: #2563EB; transform: scale(1.25); }
          100% { fill: #10B981; stroke: #10B981; transform: scale(1); }
        }

        @keyframes wellCycleColor3 {
          0% { fill: #FBBF24; stroke: #FBBF24; transform: scale(1.2); }
          25% { fill: #8B5CF6; stroke: #8B5CF6; transform: scale(1); }
          50% { fill: #2563EB; stroke: #2563EB; transform: scale(1.25); }
          75% { fill: #06B6D4; stroke: #06B6D4; transform: scale(1); }
          100% { fill: #FBBF24; stroke: #FBBF24; transform: scale(1.2); }
        }

        @keyframes colorStreamFlow {
          0% { stroke-dashoffset: 24; stroke: #2563EB; }
          33% { stroke-dashoffset: 12; stroke: #10B981; }
          66% { stroke-dashoffset: 0; stroke: #FBBF24; }
          100% { stroke-dashoffset: -12; stroke: #2563EB; }
        }

        @keyframes particleEmit1 {
          0% { transform: translate(0px, 0px) scale(0.2); opacity: 0; }
          30% { transform: translate(-3px, -4px) scale(1); opacity: 0.9; }
          70% { transform: translate(-6px, -8px) scale(0.7); opacity: 0.6; }
          100% { transform: translate(-9px, -11px) scale(0.1); opacity: 0; }
        }

        @keyframes particleEmit2 {
          0% { transform: translate(0px, 0px) scale(0.2); opacity: 0; }
          30% { transform: translate(4px, -3px) scale(1); opacity: 0.9; }
          70% { transform: translate(7px, -6px) scale(0.7); opacity: 0.6; }
          100% { transform: translate(10px, -9px) scale(0.1); opacity: 0; }
        }
      `}</style>

      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full shrink-0 overflow-visible"
      >
        {/* Main Palette Body Group */}
        <g
          style={{
            transformOrigin: "12px 12px",
            animation: active
              ? `paletteMixTilt 3.2s ease-in-out infinite`
              : "none",
            transition: "transform 450ms ease-out",
          }}
        >
          {/* Main Palette Outer Path */}
          <path
            d="M12 2a10 10 0 0 0-10 10c0 4.42 3.58 8 8 8 1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.8c3.4 0 6.2-2.8 6.2-6.2A10 10 0 0 0 12 2Z"
            style={{
              stroke: active ? "#2563EB" : "currentColor",
              transition: "stroke 500ms ease-out",
            }}
          />

          {/* Subdued paint mixing color stream arc connecting wells */}
          {active && (
            <path
              d="M7.5 8 Q12 6.5 16.5 8"
              fill="none"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              style={{
                animation: "colorStreamFlow 2.4s linear infinite",
                opacity: 0.75,
              }}
            />
          )}

          {/* Color Well 1 (Left: 7.5, 8) */}
          <circle
            cx="7.5"
            cy="8"
            r="1.2"
            fill={active ? "#2563EB" : "currentColor"}
            stroke={active ? "#2563EB" : "currentColor"}
            strokeWidth="0.5"
            style={{
              transformOrigin: "7.5px 8px",
              animation: active
                ? `wellCycleColor1 3s ease-in-out infinite`
                : "none",
              transition: "fill 400ms ease-out, stroke 400ms ease-out, transform 400ms ease-out",
            }}
          />

          {/* Color Well 2 (Top Center: 12, 6.5) */}
          <circle
            cx="12"
            cy="6.5"
            r="1.2"
            fill={active ? "#10B981" : "currentColor"}
            stroke={active ? "#10B981" : "currentColor"}
            strokeWidth="0.5"
            style={{
              transformOrigin: "12px 6.5px",
              animation: active
                ? `wellCycleColor2 3s ease-in-out 0.8s infinite`
                : "none",
              transition: "fill 400ms ease-out, stroke 400ms ease-out, transform 400ms ease-out",
            }}
          />

          {/* Color Well 3 (Right: 16.5, 8) */}
          <circle
            cx="16.5"
            cy="8"
            r="1.2"
            fill={active ? "#FBBF24" : "currentColor"}
            stroke={active ? "#FBBF24" : "currentColor"}
            strokeWidth="0.5"
            style={{
              transformOrigin: "16.5px 8px",
              animation: active
                ? `wellCycleColor3 3s ease-in-out 1.6s infinite`
                : "none",
              transition: "fill 400ms ease-out, stroke 400ms ease-out, transform 400ms ease-out",
            }}
          />
        </g>

        {/* Tiny Color Particles Emitted from Palette */}
        {active && (
          <>
            {/* Particle 1 (Blue/Cyan) */}
            <circle
              cx="7.5"
              cy="8"
              r="0.9"
              fill="#2563EB"
              style={{
                transformOrigin: "7.5px 8px",
                animation: "particleEmit1 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
              }}
            />

            {/* Particle 2 (Yellow/Green) */}
            <circle
              cx="16.5"
              cy="8"
              r="0.9"
              fill="#FBBF24"
              style={{
                transformOrigin: "16.5px 8px",
                animation: "particleEmit2 2.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s infinite",
              }}
            />
          </>
        )}
      </svg>
    </span>
  );
};
