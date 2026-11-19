import React from "react";
import { Badge } from "./Badge";
import { clsx } from "clsx";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "blue" | "green" | "yellow" | "navy" | "slate";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = "blue",
  title,
  subtitle,
  align = "left",
  className,
}) => {
  return (
    <div
      className={clsx(
        "space-y-3.5 mb-10 md:mb-14",
        align === "center" && "text-center mx-auto max-w-3xl flex flex-col items-center",
        align === "left" && "max-w-3xl",
        className
      )}
    >
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1220] dark:text-slate-50 tracking-[-0.025em] leading-[1.15] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-[17px] text-slate-600 dark:text-slate-400 leading-relaxed text-balance font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
