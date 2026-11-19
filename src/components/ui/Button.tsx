import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  external = false,
  children,
  icon,
  iconPosition = "right",
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#080C14] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-brand-blue text-white hover:bg-brand-blue-hover dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:ring-brand-blue shadow-sm",
    secondary:
      "bg-brand-green-hover text-white hover:bg-brand-green-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 focus-visible:ring-brand-green shadow-sm",
    accent:
      "bg-brand-yellow text-slate-950 hover:bg-brand-yellow-hover focus-visible:ring-brand-yellow font-bold",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E1422] text-slate-800 dark:text-slate-100 hover:border-slate-900 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-[#131B2E] focus-visible:ring-brand-blue",
    ghost:
      "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 focus-visible:ring-brand-blue",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-sm sm:text-[15px] px-6 py-3 gap-2",
  };

  const combinedClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
