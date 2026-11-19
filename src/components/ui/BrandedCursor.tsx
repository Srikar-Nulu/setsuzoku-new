"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Centralized Setsuzoku Brand Palette
const BRAND_COLORS = {
  blue: {
    glow: "rgba(0, 102, 255, 0.4)",
    shadow: "rgba(0, 102, 255, 0.3)",
    gradient: "radial-gradient(circle, rgba(0, 102, 255, 0.45) 0%, rgba(0, 102, 255, 0.08) 70%, transparent 100%)",
    ripple: "#0066FF",
  },
  green: {
    glow: "rgba(0, 200, 83, 0.45)",
    shadow: "rgba(0, 200, 83, 0.35)",
    gradient: "radial-gradient(circle, rgba(0, 200, 83, 0.5) 0%, rgba(0, 200, 83, 0.08) 75%, transparent 100%)",
    ripple: "#00C853",
  },
  cyan: {
    glow: "rgba(0, 176, 255, 0.5)",
    shadow: "rgba(0, 176, 255, 0.4)",
    gradient: "radial-gradient(circle, rgba(0, 176, 255, 0.55) 0%, rgba(0, 176, 255, 0.1) 75%, transparent 100%)",
    ripple: "#00B0FF",
  },
  softBlue: {
    glow: "rgba(0, 102, 255, 0.25)",
    shadow: "rgba(0, 102, 255, 0.15)",
    gradient: "radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, transparent 80%)",
    ripple: "#0066FF",
  },
};

type ElementState = "default" | "card" | "button" | "link" | "image";

export const BrandedCursor: React.FC = () => {
  const pathname = usePathname();
  const auraRef = useRef<HTMLDivElement | null>(null);
  const ripplesContainerRef = useRef<HTMLDivElement | null>(null);

  // Position tracking (kept in refs to avoid React re-renders)
  const mousePos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const currentStateRef = useRef<ElementState>("default");
  const currentColorHex = useRef<string>(BRAND_COLORS.blue.ripple);
  const isVisibleRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const lastTargetRef = useRef<EventTarget | null>(null);
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  useEffect(() => {
    // 1. Accessibility & Device Checks
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return; // Gracefully disable on touch / reduced motion devices
    }

    const aura = auraRef.current;
    if (!aura) return;

    // 2. Linear Interpolation (Lerp) Loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const startLoop = () => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      rafId.current = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      isRunningRef.current = false;
    };

    const render = () => {
      // Smoothly lag aura behind mouse
      auraPos.current.x = lerp(auraPos.current.x, mousePos.current.x, 0.18);
      auraPos.current.y = lerp(auraPos.current.y, mousePos.current.y, 0.18);
      scaleRef.current = lerp(scaleRef.current, targetScaleRef.current, 0.18);

      if (aura && isVisibleRef.current) {
        // Offset by half of aura size (14px) so it centers on cursor
        const x = auraPos.current.x - 14;
        const y = auraPos.current.y - 14;
        aura.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scaleRef.current})`;
      }

      // Check if settled to save CPU/battery when idle
      const dx = Math.abs(auraPos.current.x - mousePos.current.x);
      const dy = Math.abs(auraPos.current.y - mousePos.current.y);
      const ds = Math.abs(scaleRef.current - targetScaleRef.current);

      if (dx < 0.05 && dy < 0.05 && ds < 0.005) {
        // Fully settled: stop looping until next mouse event
        stopLoop();
        return;
      }

      rafId.current = requestAnimationFrame(render);
    };

    // 3. Context-Aware Target Detection with Cached Target
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (aura) aura.style.opacity = "1";
        auraPos.current.x = e.clientX;
        auraPos.current.y = e.clientY;
      }

      // Wake up render loop if stopped
      startLoop();

      // Skip expensive DOM traversal if target element hasn't changed
      if (e.target === lastTargetRef.current) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement | null;
      if (!target || !aura) return;

      const interactiveEl = target.closest(
        "a, button, .group, [role='button'], input, img, video, canvas, svg"
      );
      let newState: ElementState = "default";

      if (interactiveEl) {
        const tag = interactiveEl.tagName.toLowerCase();
        if (tag === "button" || interactiveEl.getAttribute("role") === "button" || tag === "input") {
          newState = "button";
        } else if (tag === "a" || interactiveEl.hasAttribute("href")) {
          newState = "link";
        } else if (tag === "img" || tag === "video" || tag === "canvas" || tag === "svg") {
          newState = "image";
        } else {
          newState = "card";
        }
      }

      if (currentStateRef.current !== newState) {
        currentStateRef.current = newState;

        switch (newState) {
          case "card":
            targetScaleRef.current = 1.45;
            aura.style.background = BRAND_COLORS.green.gradient;
            aura.style.boxShadow = `0 0 24px 6px ${BRAND_COLORS.green.shadow}`;
            currentColorHex.current = BRAND_COLORS.green.ripple;
            break;
          case "button":
            targetScaleRef.current = 1.35;
            aura.style.background = BRAND_COLORS.blue.gradient;
            aura.style.boxShadow = `0 0 26px 8px ${BRAND_COLORS.blue.shadow}`;
            currentColorHex.current = BRAND_COLORS.blue.ripple;
            break;
          case "link":
            targetScaleRef.current = 1.25;
            aura.style.background = BRAND_COLORS.cyan.gradient;
            aura.style.boxShadow = `0 0 22px 5px ${BRAND_COLORS.cyan.shadow}`;
            currentColorHex.current = BRAND_COLORS.cyan.ripple;
            break;
          case "image":
            targetScaleRef.current = 1.1;
            aura.style.background = BRAND_COLORS.softBlue.gradient;
            aura.style.boxShadow = `0 0 16px 2px ${BRAND_COLORS.softBlue.shadow}`;
            currentColorHex.current = BRAND_COLORS.blue.ripple;
            break;
          default:
            targetScaleRef.current = 1.0;
            aura.style.background = BRAND_COLORS.blue.gradient;
            aura.style.boxShadow = `0 0 20px 4px ${BRAND_COLORS.blue.shadow}`;
            currentColorHex.current = BRAND_COLORS.blue.ripple;
            break;
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (aura) aura.style.opacity = "0";
      stopLoop();
    };

    const handleTouchStart = () => {
      isVisibleRef.current = false;
      if (aura) aura.style.opacity = "0";
      stopLoop();
    };

    // 4. Subtle Circular Click Ripple Effect with clean lifecycle tracking
    const handleMouseDown = (e: MouseEvent) => {
      const container = ripplesContainerRef.current;
      if (!container) return;

      // Limit max concurrent ripples to prevent DOM accumulation
      while (container.children.length > 2) {
        container.removeChild(container.children[0]);
      }

      const ripple = document.createElement("div");
      const size = 16;
      const x = e.clientX - size / 2;
      const y = e.clientY - size / 2;

      ripple.className =
        "fixed rounded-full pointer-events-none transition-all duration-500 ease-out z-[9998]";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.border = `2px solid ${currentColorHex.current}`;
      ripple.style.opacity = "0.75";
      ripple.style.transform = "scale(0.8)";

      container.appendChild(ripple);

      // Trigger scale expansion & fade out on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ripple.style.transform = "scale(3.2)";
          ripple.style.opacity = "0";
        });
      });

      // Automatically clean up DOM element after animation
      const tid = setTimeout(() => {
        if (container.contains(ripple)) {
          container.removeChild(ripple);
        }
        timeoutsRef.current.delete(tid);
      }, 520);
      timeoutsRef.current.add(tid);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    const activeTimeouts = timeoutsRef.current;

    return () => {
      stopLoop();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);

      // Clear any pending ripple removal timeouts
      activeTimeouts.forEach((t) => clearTimeout(t));
      activeTimeouts.clear();
    };
  }, []);

  if (pathname?.startsWith("/demo")) return null;

  return (
    <>
      {/* 1. Subtle Branded Cursor Aura */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{
          background: BRAND_COLORS.blue.gradient,
          boxShadow: `0 0 20px 4px ${BRAND_COLORS.blue.shadow}`,
          willChange: "transform, opacity",
        }}
      />

      {/* 2. Container for Click Ripples */}
      <div ref={ripplesContainerRef} aria-hidden="true" className="pointer-events-none" />
    </>
  );
};
