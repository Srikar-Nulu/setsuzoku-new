"use client";

import React, { useState, useRef, useEffect } from "react";
import { NetworkHub } from "./NetworkHub";
import { CapabilityNode, NodeInfo } from "./CapabilityNode";
import { CurvedConnectionPath, NodeBezierConfig } from "./ConnectionPath";

export const orbitalNodesData: NodeInfo[] = [
  {
    id: "ideas",
    title: "IDEAS",
    subtitle: "Vision to Strategy",
    iconName: "ideas",
    colorHex: "#0066FF",
    badgeBg: "bg-blue-50 dark:bg-blue-500/15",
    badgeBorder: "border-blue-200/80 dark:border-blue-500/30",
    badgeText: "text-brand-blue dark:text-blue-400",
    angleDeg: -90,
    radiusPx: 175,
  },
  {
    id: "software",
    title: "SOFTWARE",
    subtitle: "Custom Development",
    iconName: "software",
    colorHex: "#10B981",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-200/80 dark:border-emerald-500/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    angleDeg: -18,
    radiusPx: 185,
  },
  {
    id: "automation",
    title: "AUTOMATION",
    subtitle: "Smarter Operations",
    iconName: "automation",
    colorHex: "#D97706",
    badgeBg: "bg-amber-50 dark:bg-amber-500/15",
    badgeBorder: "border-amber-200/80 dark:border-amber-500/30",
    badgeText: "text-amber-700 dark:text-amber-400",
    angleDeg: 54,
    radiusPx: 175,
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Scale Together",
    iconName: "growth",
    colorHex: "#0891B2",
    badgeBg: "bg-cyan-50 dark:bg-cyan-500/15",
    badgeBorder: "border-cyan-200/80 dark:border-cyan-500/30",
    badgeText: "text-cyan-700 dark:text-cyan-400",
    angleDeg: 126,
    radiusPx: 180,
  },
  {
    id: "ai",
    title: "AI",
    subtitle: "Intelligent Solutions",
    iconName: "ai",
    colorHex: "#3B82F6",
    badgeBg: "bg-slate-100 dark:bg-slate-800",
    badgeBorder: "border-slate-200 dark:border-slate-700",
    badgeText: "text-slate-700 dark:text-slate-200",
    angleDeg: 198,
    radiusPx: 180,
  },
];

// Custom Cubic Bezier Trajectories for Each Capability Node (Node -> Curved Orbit -> Center Hub 250, 250)
export const bezierPathConfigs: Record<string, NodeBezierConfig> = {
  ideas: {
    id: "ideas",
    startX: 250,
    startY: 75,
    ctrl1X: 330,
    ctrl1Y: 90,
    ctrl2X: 320,
    ctrl2Y: 200,
    endX: 250,
    endY: 250,
    colorHex: "#0066FF",
  },
  software: {
    id: "software",
    startX: 426,
    startY: 193,
    ctrl1X: 435,
    ctrl1Y: 290,
    ctrl2X: 335,
    ctrl2Y: 320,
    endX: 250,
    endY: 250,
    colorHex: "#10B981",
  },
  automation: {
    id: "automation",
    startX: 353,
    startY: 391,
    ctrl1X: 375,
    ctrl1Y: 295,
    ctrl2X: 310,
    ctrl2Y: 215,
    endX: 250,
    endY: 250,
    colorHex: "#D97706",
  },
  growth: {
    id: "growth",
    startX: 144,
    startY: 395,
    ctrl1X: 115,
    ctrl1Y: 285,
    ctrl2X: 185,
    ctrl2Y: 205,
    endX: 250,
    endY: 250,
    colorHex: "#0891B2",
  },
  ai: {
    id: "ai",
    startX: 79,
    startY: 194,
    ctrl1X: 105,
    ctrl1Y: 105,
    ctrl2X: 195,
    ctrl2Y: 135,
    endX: 250,
    endY: 250,
    colorHex: "#3B82F6",
  },
};

export const HeroNetwork: React.FC = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const networkRef = useRef<HTMLDivElement | null>(null);

  // Pause non-essential animations when Hero is outside viewport
  useEffect(() => {
    if (!networkRef.current || typeof IntersectionObserver === "undefined")
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(networkRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex items-center justify-center overflow-visible py-2 sm:py-4">
      <div
        ref={networkRef}
        className="relative w-[500px] h-[500px] aspect-square flex items-center justify-center mx-auto select-none overflow-visible scale-[0.62] min-[360px]:scale-[0.70] min-[420px]:scale-[0.80] sm:scale-[0.90] md:scale-[0.95] lg:scale-100 transition-transform duration-300 origin-center shrink-0"
      >
        {/* Precision Drafting Coordinate Axes */}
        <div
          className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-800/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-10 left-1/2 w-px bg-gradient-to-b from-transparent via-slate-200/80 dark:via-slate-800/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Architectural Concentric Guide Rings */}
        <div
          className="absolute inset-[44px] rounded-full border border-slate-200/50 dark:border-slate-800/60 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[72px] rounded-full border border-slate-200/85 dark:border-slate-800/95 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[132px] rounded-full border border-dashed border-slate-200/80 dark:border-slate-800/80 pointer-events-none"
          aria-hidden="true"
        />

        {/* Restrained Ambient Hub Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] rounded-full bg-blue-500/[0.06] dark:bg-blue-500/[0.12] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* PRIMARY ORBITAL CONTAINER: Rotates 40s Clockwise */}
        <div
          className={`absolute inset-0 w-full h-full z-10 ${
            isVisible ? "animate-orbit-clockwise-primary" : ""
          }`}
        >
          {/* SVG Bezier Curved Paths Overlay from Node Positions to Center Hub */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full overflow-visible pointer-events-none"
            aria-hidden="true"
          >
            {orbitalNodesData.map((node) => {
              const config = bezierPathConfigs[node.id];
              if (!config) return null;

              return (
                <CurvedConnectionPath
                  key={`curved-path-${node.id}`}
                  config={config}
                  isHovered={hoveredNodeId === node.id}
                />
              );
            })}
          </svg>

          {/* Floating Capability Nodes Layer */}
          {orbitalNodesData.map((node) => (
            <CapabilityNode
              key={node.id}
              node={node}
              isHovered={hoveredNodeId === node.id}
              isVisible={isVisible}
              onHoverStart={() => setHoveredNodeId(node.id)}
              onHoverEnd={() => setHoveredNodeId(null)}
            />
          ))}
        </div>

        {/* CENTRAL SETSUZOKU LOGO HUB (Stationary) */}
        <div className="relative z-20 pointer-events-auto">
          <NetworkHub />
        </div>
      </div>
    </div>
  );
};
