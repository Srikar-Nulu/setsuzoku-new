"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

export const STUDIO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

/**
 * Crisp compositor-only viewport entrance for editorial sections and blocks.
 * Automatically degrades to instant presence when prefers-reduced-motion is active.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 18,
  duration = 0.55,
  className,
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: STUDIO_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className,
  staggerDelay = 0.06,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.48, ease: STUDIO_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ArchitecturalCrosshairProps {
  className?: string;
}

/**
 * Precision drafting registration mark (+) placed subtly at architectural frame intersections.
 */
export const ArchitecturalCrosshair: React.FC<ArchitecturalCrosshairProps> = ({
  className,
}) => (
  <svg
    viewBox="0 0 11 11"
    fill="none"
    aria-hidden="true"
    className={clsx(
      "w-2.5 h-2.5 text-slate-300 dark:text-slate-700 pointer-events-none select-none shrink-0",
      className
    )}
  >
    <path
      d="M5.5 0V11M0 5.5H11"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);
