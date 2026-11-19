"use client";

import React, { forwardRef } from "react";
import { Compass, Terminal, Cpu, Workflow, TrendingUp, Check } from "lucide-react";
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
  isFeatured?: boolean;
  initialStyle?: React.CSSProperties;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const CapabilityNode = forwardRef<HTMLDivElement, CapabilityNodeProps>(
  (
    {
      node,
      isHovered,
      isFeatured = false,
      initialStyle,
      onHoverStart,
      onHoverEnd,
    },
    ref
  ) => {
    const IconComponent = iconComponents[node.iconName] || Compass;
    const showHighlightBadge = isHovered || isFeatured;

    return (
      <div
        ref={ref}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        tabIndex={0}
        role="group"
        aria-label={`${node.title}: ${node.subtitle}`}
        style={{
          willChange: "transform, opacity",
          ...initialStyle,
        }}
        className="absolute top-1/2 left-1/2 cursor-pointer select-none focus:outline-none"
      >
        <div
          className={clsx(
            "relative group flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl border transition-all duration-200 whitespace-nowrap",
            isHovered
              ? "bg-white dark:bg-[#111A2E] border-brand-blue/60 dark:border-blue-400/60 shadow-[0_14px_30px_-8px_rgba(0,102,255,0.28)] dark:shadow-[0_14px_32px_-8px_rgba(59,130,246,0.38)]"
              : isFeatured
              ? "bg-white/95 dark:bg-[#0E1422]/95 border-blue-200/90 dark:border-blue-500/40 shadow-[0_12px_28px_-8px_rgba(11,18,32,0.14)] dark:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.6)]"
              : "bg-white/88 dark:bg-[#0E1422]/85 border-slate-200/85 dark:border-slate-700/80 shadow-[0_8px_20px_-6px_rgba(11,18,32,0.10)] dark:shadow-[0_8px_22px_-6px_rgba(0,0,0,0.5)]"
          )}
        >
          {/* Floating Emerald Check Indicator on foreground-featured or hovered node */}
          <span
            aria-hidden="true"
            className={clsx(
              "absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00C853] dark:bg-emerald-500 text-white flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-[#080C14] transition-all duration-200",
              showHighlightBadge
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75 pointer-events-none"
            )}
          >
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>

          {/* Crisp Circular Capability Glyph */}
          <div
            className={clsx(
              "w-7 h-7 rounded-full border flex items-center justify-center transition-transform duration-200 shrink-0",
              node.badgeBg,
              node.badgeBorder,
              node.badgeText,
              isHovered && "scale-105"
            )}
          >
            <IconComponent className="w-3.5 h-3.5" />
          </div>

          {/* Crisp Label & Subtle Subtitle */}
          <div className="flex flex-col text-left leading-tight pr-0.5">
            <span
              className={clsx(
                "font-display text-[11px] font-bold tracking-[0.04em] transition-colors duration-150",
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
    );
  }
);

CapabilityNode.displayName = "CapabilityNode";
