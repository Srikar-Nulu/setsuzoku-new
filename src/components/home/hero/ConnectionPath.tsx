"use client";

import React from "react";

export interface NodeBezierConfig {
  id: string;
  startX: number;
  startY: number;
  ctrl1X: number;
  ctrl1Y: number;
  ctrl2X: number;
  ctrl2Y: number;
  endX: number;
  endY: number;
  colorHex: string;
}

interface CurvedConnectionPathProps {
  config: NodeBezierConfig;
  isHovered: boolean;
}

export const CurvedConnectionPath: React.FC<CurvedConnectionPathProps> = ({
  config,
  isHovered,
}) => {
  const { id, startX, startY, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, endX, endY, colorHex } = config;

  // Cubic Bezier Path String
  const pathD = `M ${startX} ${startY} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${endX} ${endY}`;
  const gradientId = `curved-path-grad-${id}`;

  return (
    <g className="transition-all duration-500">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity={isHovered ? 0.95 : 0.45} />
          <stop offset="60%" stopColor={colorHex} stopOpacity={isHovered ? 0.6 : 0.25} />
          <stop offset="100%" stopColor="#357AC8" stopOpacity={isHovered ? 0.4 : 0.1} />
        </linearGradient>
      </defs>

      {/* Subtle Glow Blur Trail on Hover */}
      {isHovered && (
        <path
          d={pathD}
          fill="none"
          stroke={colorHex}
          strokeWidth="3.5"
          strokeLinecap="round"
          className="opacity-30 blur-[2px] transition-all duration-300"
        />
      )}

      {/* Primary Flowing Bezier Curve Path with Dotted Pattern */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={isHovered ? "2.2" : "1.4"}
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Light Energy Traveling Pulse Point along the Bezier Curve */}
      <circle
        r={isHovered ? "3" : "2"}
        fill={colorHex}
        className="transition-all duration-300"
        opacity={isHovered ? 0.95 : 0.65}
      >
        <animateMotion
          path={pathD}
          dur={isHovered ? "2s" : "4.5s"}
          repeatCount="indefinite"
          calcMode="linear"
        />
      </circle>

      {/* Small Organic Junction Point at Node Origin */}
      <circle
        cx={startX}
        cy={startY}
        r={isHovered ? "3.5" : "2.2"}
        fill={colorHex}
        className="transition-all duration-300 opacity-90"
      />
    </g>
  );
};
