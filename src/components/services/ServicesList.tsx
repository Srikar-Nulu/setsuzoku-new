"use client";

import React from "react";
import Link from "next/link";
import { servicesData, ServiceItem } from "@/data/services";
import { InteractiveGlobe } from "@/components/ui/InteractiveGlobe";
import { InteractivePhone } from "@/components/ui/InteractivePhone";
import { InteractiveUiUx } from "@/components/ui/InteractiveUiUx";
import { InteractiveBranding } from "@/components/ui/InteractiveBranding";
import { InteractiveDesign } from "@/components/ui/InteractiveDesign";
import { InteractiveCpu } from "@/components/ui/InteractiveCpu";
import {
  Reveal,
  ArchitecturalCrosshair,
} from "@/components/ui/MotionPrimitives";
import { ArrowRight, Check } from "lucide-react";
import { clsx } from "clsx";

const categoryLabels: Record<string, string> = {
  websites: "Web Architecture & Platforms",
  applications: "App Systems & Cloud Software",
  "ui-ux": "Interaction & User Experience",
  branding: "Identity & Brand Systems",
  design: "Marketing & Product Design",
  "digital-solutions": "Automation & Alt Tech",
};

const getServiceIcon = (iconName: string, isEven: boolean): React.ReactNode => {
  const colorClass = isEven
    ? "text-brand-blue dark:text-blue-400"
    : "text-emerald-600 dark:text-emerald-400";
  const sizeClass = "w-11 h-11 sm:w-12 sm:h-12";

  switch (iconName) {
    case "Websites":
      return <InteractiveGlobe className={clsx(sizeClass, colorClass)} />;
    case "Applications":
      return <InteractivePhone className={clsx(sizeClass, colorClass)} />;
    case "UI/UX":
      return <InteractiveUiUx className={clsx(sizeClass, colorClass)} />;
    case "Branding":
      return <InteractiveBranding className={clsx(sizeClass, colorClass)} />;
    case "Design":
      return <InteractiveDesign className={clsx(sizeClass, colorClass)} />;
    case "Digital Solutions":
      return <InteractiveCpu className={clsx(sizeClass, colorClass)} />;
    default:
      return <InteractiveGlobe className={clsx(sizeClass, colorClass)} />;
  }
};

interface DisciplineSpreadProps {
  service: ServiceItem;
  index: number;
}

const DisciplineSpread: React.FC<DisciplineSpreadProps> = ({
  service,
  index,
}) => {
  const isEven = index % 2 === 0;
  const stepNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = categoryLabels[service.slug] || service.title;
  const deliverables = service.whatWeBuild.slice(0, 4);

  const stagePanel = (
    <div
      className={clsx(
        "relative w-full h-full min-h-[240px] md:min-h-[340px] flex flex-col items-center justify-center p-8 overflow-hidden",
        isEven
          ? "bg-[#F4F8FE] dark:bg-[#0D1628]"
          : "bg-[#F2FBF6] dark:bg-[#0B1A17]"
      )}
    >
      {/* Subtle architectural blueprint lines */}
      <div
        className="absolute inset-0 bg-blueprint-light opacity-70 pointer-events-none"
        aria-hidden="true"
      />
      <ArchitecturalCrosshair className="absolute top-4 left-4" />
      <ArchitecturalCrosshair className="absolute bottom-4 right-4" />

      {/* Center axis hairline */}
      <div
        className={clsx(
          "absolute inset-x-0 top-1/2 -translate-y-1/2 h-px pointer-events-none",
          isEven
            ? "bg-blue-200/70 dark:bg-blue-500/20"
            : "bg-emerald-200/70 dark:bg-emerald-500/20"
        )}
        aria-hidden="true"
      />

      {/* Centered Emblem & Coordinates */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <span
          className={clsx(
            "font-mono text-xs font-semibold tabular-nums",
            isEven
              ? "text-brand-blue dark:text-blue-400"
              : "text-emerald-700 dark:text-emerald-400"
          )}
        >
          Discipline {stepNumber} / 06
        </span>

        <div
          className={clsx(
            "w-24 h-24 rounded-2xl bg-white dark:bg-[#0E1422] border flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105",
            isEven
              ? "border-blue-200/80 dark:border-blue-500/30"
              : "border-emerald-200/80 dark:border-emerald-500/30"
          )}
        >
          {getServiceIcon(service.iconName, isEven)}
        </div>

        <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
          {categoryLabel}
        </span>
      </div>
    </div>
  );

  const editorialPanel = (
    <div className="w-full h-full bg-white dark:bg-[#0E1422] p-7 sm:p-10 lg:p-11 flex flex-col justify-between space-y-7">
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span
            className={clsx(
              "font-semibold tabular-nums",
              isEven
                ? "text-brand-blue dark:text-blue-400"
                : "text-emerald-700 dark:text-emerald-400"
            )}
          >
            {stepNumber}
          </span>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
            /
          </span>
          <span>{categoryLabel}</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tracking-tight leading-tight">
          <Link
            href={`/services/${service.slug}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
          >
            {service.title}
          </Link>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-[15px] leading-relaxed font-normal">
          {service.overview}
        </p>

        {/* Clean Unboxed Deliverables Ledger (No cards-within-cards) */}
        <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
          <span className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
            Key Capabilities &amp; Deliverables
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 py-1"
              >
                <Check
                  className={clsx(
                    "w-4 h-4 mt-0.5 shrink-0",
                    isEven
                      ? "text-brand-blue dark:text-blue-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  )}
                />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold">
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-[#0B1220] dark:text-white hover:text-brand-blue dark:hover:text-blue-400 transition-colors group/cta"
          >
            <span>View {service.title} Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover/cta:translate-x-1" />
          </Link>

          {service.slug === "websites" && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline"
            >
              <span>View Pricing Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden lg:inline-block">
          Setsuzoku Standard
        </span>
      </div>
    </div>
  );

  return (
    <Reveal delay={0.04} className="scroll-mt-24" id={`service-${service.slug}`}>
      <article className="group relative w-full bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 overflow-hidden transition-colors duration-200">
        <div className="hidden md:grid md:grid-cols-12 items-stretch">
          {isEven ? (
            <>
              <div className="md:col-span-7 flex flex-col border-r border-slate-200 dark:border-slate-800">
                {editorialPanel}
              </div>
              <div className="md:col-span-5 flex flex-col">{stagePanel}</div>
            </>
          ) : (
            <>
              <div className="md:col-span-5 flex flex-col border-r border-slate-200 dark:border-slate-800">
                {stagePanel}
              </div>
              <div className="md:col-span-7 flex flex-col">
                {editorialPanel}
              </div>
            </>
          )}
        </div>

        <div className="md:hidden flex flex-col">
          <div className="border-b border-slate-200 dark:border-slate-800">
            {stagePanel}
          </div>
          <div>{editorialPanel}</div>
        </div>
      </article>
    </Reveal>
  );
};

export function ServicesList() {
  return (
    <div className="space-y-8">
      {servicesData.map((service, index) => (
        <DisciplineSpread key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}
