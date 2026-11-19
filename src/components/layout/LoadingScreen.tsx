"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export const LoadingScreen: React.FC = () => {
  const pathname = usePathname();
  const [isDone, setIsDone] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasFadedRef = useRef<boolean>(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const handleAnimationComplete = useCallback(() => {
    if (hasFadedRef.current) return;
    hasFadedRef.current = true;

    if (!containerRef.current) {
      setIsDone(true);
      return;
    }

    // Gracefully fade out loading screen overlay once video completes or is skipped
    tweenRef.current = gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setIsDone(true);
      },
    });

    // Safety fallback in case animation frame is throttled in background tabs
    setTimeout(() => {
      setIsDone(true);
    }, 1000);
  }, []);

  useEffect(() => {
    // Clear any obsolete session storage keys from earlier builds
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem("setsuzoku_intro_seen");
        window.sessionStorage.removeItem("setsuzoku_seen_intro");
      }
    } catch {
      // Ignore storage access errors
    }

    // Ensure video plays automatically on refresh / mount
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // If autoplay is blocked by strict browser policy, gracefully fade out
        handleAnimationComplete();
      });
    }

    // Bounded safety timeout (7.5s) so playback cannot trap users under any circumstance
    const timer = setTimeout(() => {
      handleAnimationComplete();
    }, 7500);

    return () => {
      clearTimeout(timer);
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [handleAnimationComplete]);

  if (isDone || pathname?.startsWith("/demo")) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-[100dvh] z-[100] bg-white flex items-center justify-center overflow-hidden select-none opacity-100 p-4 sm:p-6 md:p-8 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="status"
      aria-label="Setsuzoku LLP Animated Loading Screen"
    >
      <video
        ref={videoRef}
        src="/intro-logo.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleAnimationComplete}
        onError={handleAnimationComplete}
        className="w-[85%] sm:w-[90%] md:w-full h-full max-w-5xl max-h-full object-contain object-center pointer-events-none transition-all duration-300"
      />

      {/* Accessible Skip Intro Button */}
      <button
        type="button"
        onClick={handleAnimationComplete}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 px-3.5 py-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-700 hover:text-slate-900 text-xs font-semibold backdrop-blur-md transition-all duration-200 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
        aria-label="Skip introduction animation"
      >
        Skip Intro
      </button>
    </div>
  );
};
