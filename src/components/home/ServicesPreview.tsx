"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesData } from "@/data/services";
import { InteractiveGlobe } from "@/components/ui/InteractiveGlobe";
import { InteractivePhone } from "@/components/ui/InteractivePhone";
import { InteractiveUiUx } from "@/components/ui/InteractiveUiUx";
import { InteractiveBranding } from "@/components/ui/InteractiveBranding";
import { InteractiveDesign } from "@/components/ui/InteractiveDesign";
import { InteractiveCpu } from "@/components/ui/InteractiveCpu";
import {
  Reveal,
  ArchitecturalCrosshair,
  STUDIO_EASE,
} from "@/components/ui/MotionPrimitives";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { clsx } from "clsx";

const getServiceIcon = (iconName: string, large = false) => {
  const sizeClass = large ? "w-7 h-7" : "w-4 h-4";
  const colorClass =
    iconName === "Digital Solutions"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-brand-blue dark:text-blue-400";

  switch (iconName) {
    case "Websites":
      return <InteractiveGlobe className={`${sizeClass} ${colorClass}`} />;
    case "Applications":
      return <InteractivePhone className={`${sizeClass} ${colorClass}`} />;
    case "UI/UX":
      return <InteractiveUiUx className={`${sizeClass} ${colorClass}`} />;
    case "Branding":
      return <InteractiveBranding className={`${sizeClass} ${colorClass}`} />;
    case "Design":
      return <InteractiveDesign className={`${sizeClass} ${colorClass}`} />;
    case "Digital Solutions":
      return <InteractiveCpu className={`${sizeClass} ${colorClass}`} />;
    default:
      return <InteractiveGlobe className={`${sizeClass} ${colorClass}`} />;
  }
};

export const ServicesPreview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = servicesData[activeIndex] || servicesData[0];

  return (
    <section
      id="services-preview"
      className="py-20 sm:py-28 bg-white dark:bg-[#080C14] relative z-10 scroll-mt-20 border-b border-slate-200/80 dark:border-slate-800/80"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <SectionHeading
              badge="Our Services"
              badgeVariant="blue"
              title="Technology & Design Solutions"
              subtitle="An Edu Alt Tech Company delivering Websites, Applications, UI/UX, Branding, Design, and Digital Solutions."
              className="mb-0"
            />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue dark:text-blue-400 hover:text-brand-blue-hover dark:hover:text-blue-300 transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>All 6 Capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Interactive Capabilities Workbench */}
        <Reveal delay={0.08}>
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] overflow-hidden">
            {/* Subtle corner registration marks */}
            <ArchitecturalCrosshair className="hidden lg:block absolute top-3 left-3 z-20" />
            <ArchitecturalCrosshair className="hidden lg:block absolute top-3 right-3 z-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* LEFT RAIL: Interactive 01–06 Discipline Index */}
              <div
                role="tablist"
                aria-label="Service capabilities"
                className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-[#F8FAFC]/70 dark:bg-[#0B101C]"
              >
                <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>Core Disciplines</span>
                  <span className="tabular-nums">01 — 06</span>
                </div>

                <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                  {servicesData.map((service, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={service.slug}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveIndex(idx)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={clsx(
                          "relative w-full text-left px-6 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue",
                          isActive
                            ? "bg-white dark:bg-[#131B2E]"
                            : "hover:bg-white/60 dark:hover:bg-[#101726]"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="workbench-active-bar"
                            transition={{ duration: 0.24, ease: STUDIO_EASE }}
                            className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-blue dark:bg-blue-400"
                            aria-hidden="true"
                          />
                        )}

                        <div className="flex items-center gap-4 min-w-0">
                          <span
                            className={clsx(
                              "font-mono text-xs font-semibold tabular-nums shrink-0 transition-colors",
                              isActive
                                ? "text-brand-blue dark:text-blue-400"
                                : "text-slate-400 dark:text-slate-600"
                            )}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0">
                            <span
                              className={clsx(
                                "block font-display text-base sm:text-[17px] font-bold tracking-tight transition-colors truncate",
                                isActive
                                  ? "text-[#0B1220] dark:text-white"
                                  : "text-slate-700 dark:text-slate-300"
                              )}
                            >
                              {service.title}
                            </span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {service.whatWeBuild[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={clsx(
                              "hidden sm:inline-flex w-8 h-8 rounded-lg items-center justify-center border transition-colors",
                              isActive
                                ? "bg-blue-50/70 dark:bg-blue-500/10 border-blue-200/80 dark:border-blue-500/30"
                                : "bg-white dark:bg-[#0E1422] border-slate-200/80 dark:border-slate-800"
                            )}
                          >
                            {getServiceIcon(service.iconName, false)}
                          </span>
                          <ArrowRight
                            className={clsx(
                              "w-4 h-4 transition-all duration-150",
                              isActive
                                ? "text-brand-blue dark:text-blue-400 translate-x-0.5"
                                : "text-slate-300 dark:text-slate-700"
                            )}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT PANEL: Active Discipline Specification Dossier */}
              <div
                role="tabpanel"
                className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white dark:bg-[#0E1422] relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: STUDIO_EASE }}
                    className="space-y-8 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-7">
                      {/* Dossier Top Bar */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                            <span className="text-brand-blue dark:text-blue-400 font-semibold tabular-nums">
                              Discipline {String(activeIndex + 1).padStart(2, "0")} of 06
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{activeService.shortDescription}</span>
                          </div>
                          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
                            {activeService.title}
                          </h3>
                        </div>

                        <div className="w-14 h-14 rounded-xl bg-[#F8FAFC] dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700/80 flex items-center justify-center shrink-0">
                          {getServiceIcon(activeService.iconName, true)}
                        </div>
                      </div>

                      {/* Discipline Description */}
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                        {activeService.overview}
                      </p>

                      {/* Structured Deliverables Ledger */}
                      <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                            What We Build
                          </h4>
                          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                            {activeService.whatWeBuild.length} capabilities
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                          {activeService.whatWeBuild.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                            >
                              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Rail */}
                    <div className="pt-7 mt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={`/services/${activeService.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1220] dark:bg-blue-600 text-white hover:bg-brand-blue dark:hover:bg-blue-500 text-sm font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Explore {activeService.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                      >
                        <span>Discuss a Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Architectural Pricing Guide Bar */}
        <Reveal delay={0.12}>
          <div className="mt-8">
            <Link
              href="/pricing"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] hover:border-brand-blue/50 dark:hover:border-blue-500/50 transition-colors duration-150"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-xs font-semibold text-brand-blue dark:text-blue-400">
                  2026 Pricing Guide
                </span>
                <span
                  className="hidden sm:inline text-slate-300 dark:text-slate-700"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span className="text-sm font-semibold text-[#0B1220] dark:text-slate-100 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                  Explore Setsuzoku Website Development Pricing Guide (2026)
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 shrink-0">
                <span>View Pricing</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
