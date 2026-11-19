"use client";

import React, { useEffect, useRef } from "react";
import { Globe, Globe2 } from "lucide-react";

interface InteractiveGlobeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  variant?: "globe" | "globe2";
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = "w-5 h-5",
  variant = "globe",
  style,
  ...props
}) => {
  const IconComponent = variant === "globe2" ? Globe2 : Globe;
  const containerRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);

  const isHoveredRef = useRef(false);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const targetAngleRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable animation for reduced motion preference
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    // Detect parent card or node if inside a clickable/hover group
    const parentGroup = container.closest(".group") || container.parentElement;

    const MAX_SPEED = 3.2; // degrees per frame (~190 deg/sec = ~1.9s per 360deg rotation)
    const ACCEL = 0.08;   // acceleration factor on hover
    const FRICTION = 0.94; // friction deceleration factor on leave

    const tick = () => {
      const icon = iconRef.current;
      if (!icon) return;

      if (isHoveredRef.current) {
        // Accelerate speed up to MAX_SPEED
        speedRef.current += (MAX_SPEED - speedRef.current) * ACCEL;
        angleRef.current += speedRef.current;
      } else {
        // Decelerate speed and ease angle toward targetAngle (complete turn)
        const target = targetAngleRef.current;
        const dist = target - angleRef.current;

        if (dist > 0.5) {
          speedRef.current *= FRICTION;
          if (speedRef.current < 0.3) {
            speedRef.current = Math.max(0.15, dist * 0.12);
          }
          angleRef.current += speedRef.current;
        } else {
          // Cleanly land back at static position (0deg)
          angleRef.current = 0;
          speedRef.current = 0;
          icon.style.transform = "perspective(400px) rotateY(0deg)";
          animFrameIdRef.current = null;
          return; // Stop animation loop
        }
      }

      icon.style.transform = `perspective(400px) rotateY(${angleRef.current}deg)`;
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(tick);
      }
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      startAnimation();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      const current = angleRef.current;
      let target = Math.ceil(current / 360) * 360;
      if (target - current < 120) {
        target += 360;
      }
      targetAngleRef.current = target;
      startAnimation();
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
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className="inline-flex items-center justify-center shrink-0"
      style={{ perspective: "400px", ...style }}
      {...props}
    >
      <IconComponent
        ref={iconRef}
        className={className}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "visible",
        }}
      />
    </span>
  );
};
