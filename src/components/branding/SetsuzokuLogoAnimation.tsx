"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import gsap from "gsap";
import { BlueCharacter } from "./characters/BlueCharacter";
import { GreenCharacter } from "./characters/GreenCharacter";
import { buildSetsuzokuTimeline, AnimationRefs } from "./setsuzoku-animation";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface SetsuzokuLogoAnimationHandle {
  play: () => void;
  restart: () => void;
  pause: () => void;
}

interface SetsuzokuLogoAnimationProps {
  className?: string;
  onComplete?: () => void;
  autoPlay?: boolean;
}

export const SetsuzokuLogoAnimation = forwardRef<
  SetsuzokuLogoAnimationHandle,
  SetsuzokuLogoAnimationProps
>(({ className = "w-full h-full", onComplete, autoPlay = true }, ref) => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const blueCharRef = useRef<SVGGElement | null>(null);
  const greenCharRef = useRef<SVGGElement | null>(null);
  const contactBurstRef = useRef<SVGGElement | null>(null);
  const contactPulseRef = useRef<SVGCircleElement | null>(null);
  const particlesGroupRef = useRef<SVGGElement | null>(null);
  const connectionCircleRef = useRef<SVGGElement | null>(null);
  const connectionLineBlueRef = useRef<SVGLineElement | null>(null);
  const connectionLineGreenRef = useRef<SVGLineElement | null>(null);
  const wordmarkGroupRef = useRef<SVGGElement | null>(null);
  const taglineGroupRef = useRef<SVGGElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const onCompleteRef = useRef(onComplete);

  useIsomorphicLayoutEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (timelineRef.current) timelineRef.current.play();
    },
    restart: () => {
      if (timelineRef.current) timelineRef.current.restart(true);
    },
    pause: () => {
      if (timelineRef.current) timelineRef.current.pause();
    },
  }));

  useIsomorphicLayoutEffect(() => {
    console.log("Loading animation mounted");

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }
    }

    const ctx = gsap.context(() => {
      const refs: AnimationRefs = {
        containerRef,
        blueCharRef,
        greenCharRef,
        contactBurstRef,
        contactPulseRef,
        particlesGroupRef,
        connectionCircleRef,
        connectionLineBlueRef,
        connectionLineGreenRef,
        wordmarkGroupRef,
        taglineGroupRef,
      };

      const tl = buildSetsuzokuTimeline(refs, () => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      });
      timelineRef.current = tl;

      if (autoPlay) {
        tl.play(0);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [autoPlay]);

  const particleColors = [
    "#357AC8",
    "#34A486",
    "#F1C25D",
    "#357AC8",
    "#34A486",
    "#F1C25D",
    "#357AC8",
    "#34A486",
    "#F1C25D",
    "#357AC8",
    "#34A486",
    "#F1C25D",
  ];

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid meet"
      className={`select-none ${className}`}
      aria-label="Setsuzoku LLP Animated Logo"
      role="img"
    >
      {/* 1. Pure White Background */}
      <rect width="1280" height="720" fill="#FFFFFF" />

      {/* 2. Horizontal Connection Lines (Sampled colors #357AC8 and #34A486) */}
      <g id="connection-lines">
        {/* Blue Line Center -> Left */}
        <line
          ref={connectionLineBlueRef}
          x1="605"
          y1="380"
          x2="360"
          y2="380"
          stroke="#357AC8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="250"
          strokeDashoffset="250"
        />
        {/* Green Line Center -> Right */}
        <line
          ref={connectionLineGreenRef}
          x1="675"
          y1="380"
          x2="920"
          y2="380"
          stroke="#34A486"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="250"
          strokeDashoffset="250"
        />
      </g>

      {/* 3. Blue & Green Traced Vector Characters */}
      <BlueCharacter ref={blueCharRef} />
      <GreenCharacter ref={greenCharRef} />

      {/* 4. High-Five Impact Rays, Pulse & Particle Effects */}
      <g id="contact-effects">
        {/* High-Five Impact Rays (matching reference artwork colors) */}
        <g ref={contactBurstRef} id="impact-rays">
          {/* Top Center Yellow Ray */}
          <line x1="638" y1="175" x2="638" y2="130" stroke="#F1C25D" strokeWidth="8" strokeLinecap="round" />
          {/* Left Green Ray */}
          <line x1="616" y1="182" x2="586" y2="148" stroke="#34A486" strokeWidth="8" strokeLinecap="round" />
          {/* Right Green Ray */}
          <line x1="660" y1="182" x2="690" y2="148" stroke="#34A486" strokeWidth="8" strokeLinecap="round" />
          {/* Left Blue Accent Ray */}
          <line x1="600" y1="202" x2="570" y2="192" stroke="#357AC8" strokeWidth="6" strokeLinecap="round" />
          {/* Right Yellow Accent Ray */}
          <line x1="676" y1="202" x2="706" y2="192" stroke="#F1C25D" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* Circular Pulse Wave */}
        <circle
          ref={contactPulseRef}
          cx="638"
          cy="222"
          r="30"
          fill="none"
          stroke="#357AC8"
          strokeWidth="4"
          opacity="0"
        />

        {/* Particle Burst Group */}
        <g ref={particlesGroupRef} id="particles">
          {particleColors.map((color, index) => (
            <circle
              key={index}
              cx="638"
              cy="222"
              r={index % 2 === 0 ? "5" : "3.5"}
              fill={color}
              className="particle"
            />
          ))}
        </g>
      </g>

      {/* 5. Center Connection Circle & Infinity Link Emblem */}
      <g ref={connectionCircleRef} id="connection-emblem">
        <circle cx="638" cy="380" r="34" fill="#FFFFFF" stroke="#357AC8" strokeWidth="4" />
        {/* Infinity Chain Link Symbol Inside Circle */}
        <path
          d="M 620,380 C 620,368 632,368 638,380 C 644,392 656,392 656,380"
          fill="none"
          stroke="#357AC8"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M 656,380 C 656,392 644,392 638,380 C 632,368 620,368 620,380"
          fill="none"
          stroke="#34A486"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* 6. SETSUZOKU Wordmark Reveal (matching reference typography & green 'Z' #34A486) */}
      <g
        ref={wordmarkGroupRef}
        id="wordmark"
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          letterSpacing: "0.22em",
        }}
      >
        {[
          { char: "S", isZ: false },
          { char: "E", isZ: false },
          { char: "T", isZ: false },
          { char: "S", isZ: false },
          { char: "U", isZ: false },
          { char: "Z", isZ: true },
          { char: "O", isZ: false },
          { char: "K", isZ: false },
          { char: "U", isZ: false },
        ].map((item, i) => {
          const xPos = 362 + i * 69;
          return (
            <text
              key={i}
              x={xPos}
              y="505"
              fontSize="72"
              fontWeight="900"
              fill={item.isZ ? "#34A486" : "#2B384A"}
              className="wordmark-letter"
              textAnchor="middle"
            >
              {item.char}
            </text>
          );
        })}
      </g>

      {/* 7. Tagline: CONNECT · CREATE · GROW */}
      <g
        ref={taglineGroupRef}
        id="tagline"
        style={{
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <text
          x="638"
          y="565"
          fontSize="22"
          fontWeight="700"
          fill="#334155"
          letterSpacing="0.3em"
          textAnchor="middle"
        >
          CONNECT <tspan fill="#34A486">·</tspan> CREATE{" "}
          <tspan fill="#34A486">·</tspan> <tspan fill="#34A486">GROW</tspan>
        </text>
      </g>
    </svg>
  );
});

SetsuzokuLogoAnimation.displayName = "SetsuzokuLogoAnimation";
