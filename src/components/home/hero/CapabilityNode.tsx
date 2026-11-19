"use client";

import React from "react";
import { Compass, Terminal, Cpu, Workflow, TrendingUp } from "lucide-react";
import { clsx } from "clsx";

export interface NodeInfo {
  id: string;
  title: string;
  subtitle: string;
  iconName: "ideas" | "software" | "ai" | "automation" | "growth";
  colorHex: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  angleDeg: number;
  radiusPx: number;
}

const iconComponents = {
  ideas: Compass,
  software: Terminal,
  ai: Cpu,
  automation: Workflow,
  growth: TrendingUp,
};

interface CapabilityNodeProps {
  node: NodeInfo;
  isHovered: boolean;
  isVisible?: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const CapabilityNode: React.FC<CapabilityNodeProps> = ({
  node,
  isHovered,
  isVisible = true,
  onHoverStart,
  onHoverEnd,
}) => {
  const IconComponent = iconComponents[node.iconName] || Compass;

  const rad = (node.angleDeg * Math.PI) / 180;
  const xOffset = Math.cos(rad) * node.radiusPx;
  const yOffset = Math.sin(rad) * node.radiusPx;

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="absolute z-20 cursor-pointer select-none"
      style={{
        left: `calc(50% + ${xOffset}px)`,
        top: `calc(50% + ${yOffset}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Counter-rotate inner container so text remains ALWAYS UPRIGHT */}
      <div className={isVisible ? "animate-orbit-counter-primary" : ""}>
        <div
          className={clsx(
            "group flex items-center space-x-2 bg-white/95 dark:bg-[#0E1422]/95 backdrop-blur-md px-3 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap",
            isHovered
              ? "scale-105 border-slate-400 dark:border-slate-500 shadow-lg shadow-slate-900/10 dark:shadow-black/50 -translate-y-0.5"
              : "border-slate-200 dark:border-slate-700/90 shadow-sm shadow-slate-900/5 dark:shadow-black/30 hover:border-slate-300 dark:hover:border-slate-600"
          )}
        >
          {/* Icon Cell */}
          <div
            className={clsx(
              "p-1.5 rounded-lg border flex items-center justify-center transition-transform duration-200 shrink-0",
              node.badgeBg,
              node.badgeBorder,
              node.badgeText,
              isHovered && "scale-105"
            )}
          >
            <IconComponent className="w-3.5 h-3.5" />
          </div>

          {/* Node Title & Subtitle */}
          <div className="flex flex-col text-left">
            <span
              className={clsx(
                "text-[10.5px] font-mono font-bold tracking-[0.08em] uppercase transition-colors duration-150",
                isHovered
                  ? "text-[#0B1220] dark:text-white"
                  : "text-slate-800 dark:text-slate-100"
              )}
            >
              {node.title}
            </span>
            <span
              className={clsx(
                "text-[9.5px] font-medium transition-colors duration-150",
                isHovered
                  ? "text-slate-600 dark:text-slate-300"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {node.subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
