import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "yellow" | "navy" | "slate";
  size?: "sm" | "md";
  className?: string;
}

/**
 * Editorial Kicker / Eyebrow Label
 *
 * Crisp unboxed typographic label with a refined leading hairline accent rule.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  size = "md",
  className,
}) => {
  const variants = {
    blue: "text-brand-blue dark:text-blue-400",
    green: "text-emerald-700 dark:text-emerald-400",
    yellow: "text-amber-700 dark:text-amber-400",
    navy: "text-slate-300 dark:text-slate-300",
    slate: "text-slate-600 dark:text-slate-400",
  };

  const ruleColors = {
    blue: "bg-brand-blue dark:bg-blue-400",
    green: "bg-emerald-600 dark:bg-emerald-400",
    yellow: "bg-amber-600 dark:bg-amber-400",
    navy: "bg-blue-400",
    slate: "bg-slate-400 dark:bg-slate-500",
  };

  const sizes = {
    sm: "text-xs tracking-wide",
    md: "text-[13px] tracking-[0.02em]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2.5 font-mono font-medium select-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span
        className={clsx("w-5 h-[1.5px] shrink-0", ruleColors[variant])}
        aria-hidden="true"
      />
      <span className="inline-flex items-center gap-1.5">{children}</span>
    </span>
  );
};
