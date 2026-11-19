"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useTheme } from "@/components/theme/ThemeProvider";
import { STUDIO_EASE } from "@/components/ui/MotionPrimitives";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  Sun,
  Moon,
  Building2,
  Users,
  Briefcase,
} from "lucide-react";
import { clsx } from "clsx";

const PRIMARY_NAV = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Work", href: "/work" },
];

const COMPANY_NAV = [
  {
    name: "About",
    href: "/about",
    description: "An Edu Alt Tech Company & founder leadership",
    icon: Building2,
  },
  {
    name: "Team",
    href: "/team",
    description: "Architects, engineers & digital specialists",
    icon: Users,
  },
  {
    name: "Careers",
    href: "/careers",
    description: "Engineering culture & open collaborations",
    icon: Briefcase,
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, mounted, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [companyOpen, setCompanyOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCompanyOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCompanyOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCompanyOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  const isCompanyActive = COMPANY_NAV.some((item) =>
    pathname?.startsWith(item.href)
  );

  const isDark = mounted && theme === "dark";

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/95 dark:bg-[#080C14]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 shadow-sm shadow-slate-900/[0.03] dark:shadow-black/30"
          : "bg-white/85 dark:bg-[#080C14]/85 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50"
      )}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-[68px]">
          {/* Zone 1: Brand Identity */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center group focus-visible:rounded-lg shrink-0"
              aria-label="Setsuzoku LLP Home"
            >
              <span className="inline-flex items-center transition-colors duration-200 dark:bg-white/95 dark:px-2.5 dark:py-1 dark:rounded-lg">
                <Image
                  id="header-logo"
                  src="/brand/setsuzoku-logo.png"
                  alt="Setsuzoku LLP Logo"
                  width={280}
                  height={80}
                  priority
                  className="h-9 sm:h-10 lg:h-11 dark:h-8 dark:sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                />
              </span>
            </Link>

            <span
              className="hidden xl:inline-block h-4 w-px bg-slate-200 dark:bg-slate-800"
              aria-hidden="true"
            />
            <div
              className="hidden xl:inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 select-none"
              title="Setsuzoku LLP — MSME Recognised Micro Enterprise"
              aria-label="MSME Recognised Enterprise"
            >
              <ShieldCheck
                className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-mono font-medium tracking-wide whitespace-nowrap">
                {siteConfig.registration.msme.headerBadgeText}
              </span>
            </div>
          </div>

          {/* Zone 2: Desktop Primary Navigation */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {PRIMARY_NAV.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150",
                    isActive
                      ? "text-[#0B1220] dark:text-white font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#0B1220] dark:hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{ duration: 0.28, ease: STUDIO_EASE }}
                      className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-blue dark:bg-blue-400 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}

            {/* Company Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCompanyOpen((prev) => !prev)}
                aria-expanded={companyOpen}
                aria-haspopup="menu"
                className={clsx(
                  "relative inline-flex items-center gap-1 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer",
                  isCompanyActive || companyOpen
                    ? "text-[#0B1220] dark:text-white font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-[#0B1220] dark:hover:text-white"
                )}
              >
                <span>Company</span>
                <ChevronDown
                  className={clsx(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    companyOpen && "rotate-180"
                  )}
                />
                {isCompanyActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    transition={{ duration: 0.28, ease: STUDIO_EASE }}
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-blue dark:bg-blue-400 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>

              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: STUDIO_EASE }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[320px] z-50"
                  >
                    <div
                      role="menu"
                      className="rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/50 p-2"
                    >
                      {COMPANY_NAV.map((item) => {
                        const active = pathname?.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setCompanyOpen(false)}
                            className={clsx(
                              "group flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150",
                              active
                                ? "bg-blue-50/80 dark:bg-blue-500/10"
                                : "hover:bg-slate-50 dark:hover:bg-[#131B2E]"
                            )}
                          >
                            <div
                              className={clsx(
                                "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                                active
                                  ? "bg-white dark:bg-[#080C14] border-blue-200 dark:border-blue-500/40 text-brand-blue dark:text-blue-400"
                                  : "bg-slate-50 dark:bg-[#080C14] border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-brand-blue dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-500/30"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={clsx(
                                    "text-sm font-semibold",
                                    active
                                      ? "text-brand-blue dark:text-blue-400"
                                      : "text-[#0B1220] dark:text-slate-100"
                                  )}
                                >
                                  {item.name}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                              </div>
                              <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Zone 3: Theme Switch + CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-brand-blue dark:hover:text-blue-400 transition-colors duration-150 cursor-pointer shrink-0 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.16, ease: STUDIO_EASE }}
                  className="inline-flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="hidden lg:flex">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Let&apos;s Connect
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex lg:hidden items-center justify-center w-11 h-11 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: STUDIO_EASE }}
            className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080C14] shadow-xl shadow-slate-900/10 dark:shadow-black/50"
          >
            <Container className="py-5 space-y-5">
              <nav
                className="flex flex-col space-y-1"
                aria-label="Mobile Navigation"
              >
                {PRIMARY_NAV.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "flex items-center justify-between px-3.5 py-2.5 text-[15px] font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-brand-blue dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-500/10"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0E1422]"
                      )}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}

                <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="block px-3.5 pb-1.5 text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
                    Company
                  </span>
                  {COMPANY_NAV.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          "block px-3.5 py-2.5 text-[15px] font-medium rounded-lg transition-colors",
                          isActive
                            ? "text-brand-blue dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-500/10"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0E1422]"
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    className={clsx(
                      "block px-3.5 py-2.5 text-[15px] font-medium rounded-lg transition-colors",
                      pathname === "/contact"
                        ? "text-brand-blue dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-500/10"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0E1422]"
                    )}
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Let&apos;s Connect
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{siteConfig.registration.msme.headerBadgeText}</span>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
