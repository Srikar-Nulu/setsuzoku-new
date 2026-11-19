"use client";

import React, { useEffect, useRef, useState } from "react";
import { LucideProps } from "lucide-react";

interface InteractiveBrandingProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractiveBranding: React.FC<InteractiveBrandingProps> = ({
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

      const triggerAnimation = () => {
        if (mediaQuery.matches) return;
        setIsHovered(true);
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      container.addEventListener("mouseenter", triggerAnimation);
      container.addEventListener("mouseleave", handleMouseLeave);

      if (parentGroup && parentGroup !== container) {
        parentGroup.addEventListener("mouseenter", triggerAnimation);
        parentGroup.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
        container.removeEventListener("mouseenter", triggerAnimation);
        container.removeEventListener("mouseleave", handleMouseLeave);
        if (parentGroup && parentGroup !== container) {
          parentGroup.removeEventListener("mouseenter", triggerAnimation);
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
        @keyframes sparkMainIgnition {
          0% {
            transform: scale(1);
            stroke: currentColor;
          }
          20% {
            transform: scale(1.04);
            stroke: #2563EB;
          }
          45% {
            transform: scale(1);
            stroke: #06B6D4;
          }
          70% {
            transform: scale(1);
            stroke: #10B981;
          }
          90% {
            transform: scale(1);
            stroke: #FBBF24;
          }
          100% {
            transform: scale(1);
            stroke: #2563EB;
          }
        }

        @keyframes sparkTopRight {
          0% { transform: scale(1); stroke: currentColor; }
          30% { transform: scale(1.15) translate(1px, -1px); stroke: #06B6D4; }
          70% { transform: scale(1) translate(0, 0); stroke: #10B981; }
          100% { transform: scale(1); stroke: currentColor; }
        }

        @keyframes sparkBottomLeft {
          0% { transform: scale(1); stroke: currentColor; }
          30% { transform: scale(1.15) translate(-1px, 1px); stroke: #FBBF24; }
          70% { transform: scale(1) translate(0, 0); stroke: #10B981; }
          100% { transform: scale(1); stroke: currentColor; }
        }

        @keyframes sparkTinyTop {
          0% { transform: translateY(2px) scale(0.2); opacity: 0; }
          25% { transform: translateY(-2px) scale(1); opacity: 1; }
          60% { transform: translateY(-5px) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-8px) scale(0.1); opacity: 0; }
        }

        @keyframes sparkTinyRight {
          0% { transform: translateX(-2px) scale(0.2); opacity: 0; }
          25% { transform: translateX(2px) scale(1); opacity: 1; }
          60% { transform: translateX(5px) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(8px) scale(0.1); opacity: 0; }
        }

        @keyframes sparkTinyBottom {
          0% { transform: translateY(-2px) scale(0.2); opacity: 0; }
          25% { transform: translateY(2px) scale(1); opacity: 1; }
          60% { transform: translateY(5px) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(8px) scale(0.1); opacity: 0; }
        }

        @keyframes sparkTinyLeft {
          0% { transform: translateX(2px) scale(0.2); opacity: 0; }
          25% { transform: translateX(-2px) scale(1); opacity: 1; }
          60% { transform: translateX(-5px) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(-8px) scale(0.1); opacity: 0; }
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
        {/* Main Center Sparkle Star */}
        <path
          d="m12 3-1.9 5.8a2 2 0 0 1-1.28 1.28L3 12l5.8 1.9a2 2 0 0 1 1.28 1.28L12 21l1.9-5.8a2 2 0 0 1 1.28-1.28L21 12l-5.8-1.9a2 2 0 0 1-1.28-1.28Z"
          style={{
            transformOrigin: "12px 12px",
            animation: active
              ? `sparkMainIgnition 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite`
              : "none",
          }}
        />

        {/* Top Right Sparkle Accent */}
        <path
          d="M18 4h3v3"
          style={{
            transformOrigin: "19.5px 5.5px",
            animation: active
              ? `sparkTopRight 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite`
              : "none",
          }}
        />

        {/* Bottom Left Sparkle Accent */}
        <path
          d="M3 17h3v3"
          style={{
            transformOrigin: "4.5px 18.5px",
            animation: active
              ? `sparkBottomLeft 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite`
              : "none",
          }}
        />

        {/* 4 Secondary Outward Sparkles (Active continuously during hover loop) */}
        {active && (
          <>
            {/* Top Tiny Sparkle (Royal Blue #2563EB) */}
            <path
              d="M12 0.5 L12.5 1.8 L13.8 2.3 L12.5 2.8 L12 4.1 L11.5 2.8 L10.2 2.3 L11.5 1.8 Z"
              fill="#2563EB"
              stroke="#2563EB"
              strokeWidth="0.4"
              style={{
                transformOrigin: "12px 2.3px",
                animation: `sparkTinyTop 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite`,
              }}
            />

            {/* Right Tiny Sparkle (Cyan #06B6D4) */}
            <path
              d="M21.7 10.2 L22.2 11.5 L23.5 12 L22.2 12.5 L21.7 13.8 L21.2 12.5 L19.9 12 L21.2 11.5 Z"
              fill="#06B6D4"
              stroke="#06B6D4"
              strokeWidth="0.4"
              style={{
                transformOrigin: "21.7px 12px",
                animation: `sparkTinyRight 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s infinite`,
              }}
            />

            {/* Bottom Tiny Sparkle (Emerald #10B981) */}
            <path
              d="M12 19.7 L12.5 21 L13.8 21.5 L12.5 22 L12 23.3 L11.5 22 L10.2 21.5 L11.5 21 Z"
              fill="#10B981"
              stroke="#10B981"
              strokeWidth="0.4"
              style={{
                transformOrigin: "12px 21.5px",
                animation: `sparkTinyBottom 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s infinite`,
              }}
            />

            {/* Left Tiny Sparkle (Warm Yellow #FBBF24) */}
            <path
              d="M2.3 10.2 L2.8 11.5 L4.1 12 L2.8 12.5 L2.3 13.8 L1.8 12.5 L0.5 12 L1.8 11.5 Z"
              fill="#FBBF24"
              stroke="#FBBF24"
              strokeWidth="0.4"
              style={{
                transformOrigin: "2.3px 12px",
                animation: `sparkTinyLeft 1.6s cubic-bezier(0.16, 1, 0.3, 1) 1.2s infinite`,
              }}
            />
          </>
        )}
      </svg>
    </span>
  );
};
