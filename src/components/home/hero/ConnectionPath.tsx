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

interface DynamicConnectionBeamProps {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  colorHex: string;
  visible: boolean;
}

/**
 * Clean energy beam connecting a focused/hovered 3D capability node directly
 * to the central Setsuzoku sphere core.
 */
export const CurvedConnectionPath: React.FC<DynamicConnectionBeamProps> = ({
  id,
  startX,
  startY,
  endX,
  endY,
  colorHex,
  visible,
}) => {
  if (!visible) return null;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  // Subtle organic arc perpendicular to the chord toward center
  const dx = endX - startX;
  const dy = endY - startY;
  const ctrlX = midX - dy * 0.14;
  const ctrlY = midY + dx * 0.14;
  const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  const gradientId = `beam-grad-${id}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke={colorHex}
        strokeWidth="4"
        strokeLinecap="round"
        className="opacity-25 blur-[2px]"
      />
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.75"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <circle cx={startX} cy={startY} r="3" fill={colorHex} />
    </g>
  );
};
