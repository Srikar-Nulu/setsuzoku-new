"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Monitor,
  Smartphone,
  Layers,
  Grid3X3,
  Cpu,
  Wifi,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";
import { projectsData, ProjectItem } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { InteractiveGlobe } from "@/components/ui/InteractiveGlobe";
import { InteractivePhone } from "@/components/ui/InteractivePhone";
import { InteractiveUiUx } from "@/components/ui/InteractiveUiUx";
import { InteractiveBranding } from "@/components/ui/InteractiveBranding";
import { InteractiveDesign } from "@/components/ui/InteractiveDesign";
import { InteractiveCpu } from "@/components/ui/InteractiveCpu";
import { STUDIO_EASE } from "@/components/ui/MotionPrimitives";

const DISCIPLINE_CATEGORY_MAP: Record<string, string> = {
  websites: "Web Architecture & Platforms",
  applications: "App Systems & Cloud Software",
  "ui-ux": "Interaction & Experience Design",
  branding: "Identity & Brand Systems",
  design: "Visual & Product Communication",
  "digital-solutions": "Automation & Edu Alt Tech",
};

const DISCIPLINE_PROOF_LABEL: Record<string, string> = {
  websites: "JoySchool · Genesis · MamaSparsh",
  applications: "Genesis LMS · Cross-Platform Apps",
  "ui-ux": "Design Systems · WCAG Workflows",
  branding: "Brand Geometry · Visual Guidelines",
  design: "Vector Craft · Pitch Systems",
  "digital-solutions": "EduAltTech · Workflow Automation",
};

function renderDisciplineIcon(iconName: string, className: string) {
  switch (iconName) {
    case "Websites":
      return <InteractiveGlobe className={className} />;
    case "Applications":
      return <InteractivePhone className={className} />;
    case "UI/UX":
      return <InteractiveUiUx className={className} />;
    case "Branding":
      return <InteractiveBranding className={className} />;
    case "Design":
      return <InteractiveDesign className={className} />;
    case "Digital Solutions":
      return <InteractiveCpu className={className} />;
    default:
      return <InteractiveGlobe className={className} />;
  }
}

function getProjectsForService(title: string): ProjectItem[] {
  return projectsData.filter((p) => p.category === title);
}

/* ============================================================================
 * LIVE DISCIPLINE PREVIEW STAGE VISUALS
 * Honest, interactive visual demonstrations + real Setsuzoku project proofs
 * ============================================================================ */

const WebsitesPreviewCanvas: React.FC = () => {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [siteIdx, setSiteIdx] = useState<number>(0);

  const shippedSites = [
    {
      name: "JoySchool",
      domain: "joyschool.online",
      summary: "Nursery to Class 10 digital campus & admissions workflow",
      logo: "/clients/joy-school.png",
      alt: "Kinder Joy School Logo",
      slug: "joyschool",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Genesis Education",
      domain: "genesisedu.in",
      summary: "Montessori & STEM educational identity for ages 1.0–6.0",
      logo: "/clients/genesis.png",
      alt: "Genesis Official Logo",
      slug: "genesis-education-website",
      stack: ["React", "JavaScript", "Tailwind CSS"],
    },
    {
      name: "MamaSparsh Preschool",
      domain: "mamasparshschool.in",
      summary: "Early-learning curriculum & parent campus tour scheduling",
      logo: "/clients/mamasprash.png",
      alt: "MamaSparsh Preschool Logo",
      slug: "mamasparsh-preschool-website",
      stack: ["React", "TypeScript", "Tailwind CSS"],
    },
  ];

  const current = shippedSites[siteIdx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Select deployed website reference">
          {shippedSites.map((site, idx) => (
            <button
              key={site.slug}
              type="button"
              onClick={() => setSiteIdx(idx)}
              className={clsx(
                "px-2.5 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap min-h-[36px]",
                siteIdx === idx
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/40"
                  : "text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
              )}
            >
              {site.name}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center rounded-lg border border-slate-800 bg-[#070B13] p-0.5">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            aria-pressed={viewport === "desktop"}
            className={clsx(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              viewport === "desktop"
                ? "bg-brand-blue text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            aria-pressed={viewport === "mobile"}
            className={clsx(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              viewport === "mobile"
                ? "bg-brand-blue text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Viewport Chrome */}
      <div className="flex justify-center">
        <div
          className={clsx(
            "rounded-xl border border-slate-700/80 bg-[#070B13] overflow-hidden transition-all duration-300",
            viewport === "desktop" ? "w-full" : "w-full max-w-[300px]"
          )}
        >
          <div className="px-3.5 py-2 border-b border-slate-800 bg-[#0A101D] flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-slate-400 truncate">
              {current.domain}
            </span>
            <span className="font-mono text-[10px] text-emerald-400 whitespace-nowrap">
              Deployed Client Website
            </span>
          </div>

          <div
            className={clsx(
              "p-5 sm:p-6 grid gap-5 items-center",
              viewport === "desktop" ? "grid-cols-1 sm:grid-cols-12" : "grid-cols-1 text-center"
            )}
          >
            <div
              className={clsx(
                "bg-white rounded-lg p-3 h-20 flex items-center justify-center overflow-hidden",
                viewport === "desktop" ? "sm:col-span-4" : "mx-auto w-36"
              )}
            >
              <Image
                src={current.logo}
                alt={current.alt}
                width={140}
                height={48}
                unoptimized
                className="h-auto w-auto max-h-12 max-w-[85%] object-contain"
              />
            </div>

            <div className={viewport === "desktop" ? "sm:col-span-8 space-y-2.5" : "space-y-2"}>
              <p className="font-display text-base font-bold text-white">
                {current.name}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.summary}
              </p>
              <div
                className={clsx(
                  "flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-slate-400 pt-1",
                  viewport === "mobile" && "justify-center"
                )}
              >
                {current.stack.map((tech, i) => (
                  <React.Fragment key={tech}>
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <span>{tech}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className={clsx("pt-1", viewport === "mobile" && "flex justify-center")}>
                <Link
                  href={`/work/${current.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Inspect Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationsPreviewCanvas: React.FC = () => {
  const [syncMode, setSyncMode] = useState<"online" | "offline">("online");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Interactive Visual Demonstration · Cross-Platform &amp; Sync Model
        </span>
        <div className="inline-flex items-center rounded-lg border border-slate-800 bg-[#070B13] p-0.5">
          <button
            type="button"
            onClick={() => setSyncMode("online")}
            aria-pressed={syncMode === "online"}
            className={clsx(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              syncMode === "online"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            Online Cloud Sync
          </button>
          <button
            type="button"
            onClick={() => setSyncMode("offline")}
            aria-pressed={syncMode === "offline"}
            className={clsx(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              syncMode === "offline"
                ? "bg-brand-blue text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            Offline Cache Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch rounded-xl border border-slate-700/80 bg-[#070B13] p-4 sm:p-5">
        <div className="sm:col-span-5 flex flex-col justify-between gap-4 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
          <div className="bg-white rounded-lg p-2.5 h-16 flex items-center justify-center overflow-hidden">
            <Image
              src="/clients/genesis.png"
              alt="Genesis LMS Logo"
              width={120}
              height={42}
              unoptimized
              className="h-auto w-auto max-h-11 object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[11px] text-blue-400">
              Deployed Project Reference
            </p>
            <p className="font-display text-sm font-bold text-white">
              Genesis LMS
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              &ldquo;Learn · Lead · Achieve&rdquo; educational web application interface.
            </p>
          </div>
          <Link
            href="/work/genesis-lms"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            <span>View Genesis LMS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="sm:col-span-7 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Wifi className="w-3.5 h-3.5 text-blue-400" />
              <span>State: {syncMode === "online" ? "Cloud Synchronized" : "Local Cache Queued"}</span>
            </span>
            <span className="text-[11px] text-slate-500">Simulation</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              "Cross-Platform Web & Mobile Architecture",
              "Local Caching Under Spotty Connectivity",
              "Role-Based Operational Workflows",
            ].map((row) => (
              <div
                key={row}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0B1220] border border-slate-800/90 text-slate-200"
              >
                <span className="truncate pr-2">{row}</span>
                <span className="font-mono text-[11px] text-emerald-400 shrink-0">
                  {syncMode === "online" ? "Synced" : "Cached"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UiUxPreviewCanvas: React.FC = () => {
  const [viewMode, setViewMode] = useState<"wireframe" | "interface">("interface");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Interactive Visual Demonstration · Wireframe to Interface System
        </span>
        <div className="inline-flex items-center rounded-lg border border-slate-800 bg-[#070B13] p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("wireframe")}
            aria-pressed={viewMode === "wireframe"}
            className={clsx(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              viewMode === "wireframe"
                ? "bg-brand-blue text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            Wireframe
          </button>
          <button
            type="button"
            onClick={() => setViewMode("interface")}
            aria-pressed={viewMode === "interface"}
            className={clsx(
              "px-2.5 py-1 rounded text-[11px] font-mono transition-colors min-h-[32px]",
              viewMode === "interface"
                ? "bg-brand-blue text-white"
                : "text-slate-400 hover:text-white"
            )}
          >
            Design System UI
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-[#070B13] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs text-slate-300">
              {viewMode === "wireframe" ? "Information Architecture View" : "Human-Centered Tokenized Component"}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">WCAG Standards</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className={clsx(
              "p-4 rounded-lg border transition-colors",
              viewMode === "wireframe"
                ? "border-dashed border-slate-600 bg-transparent"
                : "border-slate-700 bg-[#0E1422]"
            )}
          >
            <p className="font-mono text-[11px] text-slate-400 mb-1.5">
              Typography Scale
            </p>
            <p
              className={clsx(
                "text-base font-bold",
                viewMode === "wireframe" ? "font-mono text-slate-400" : "font-display text-white"
              )}
            >
              Clear Visual Hierarchy
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Simplifying complex workflows into readable steps.
            </p>
          </div>

          <div
            className={clsx(
              "p-4 rounded-lg border transition-colors",
              viewMode === "wireframe"
                ? "border-dashed border-slate-600 bg-transparent"
                : "border-emerald-500/30 bg-[#0B1917]"
            )}
          >
            <p className="font-mono text-[11px] text-slate-400 mb-1.5">
              Interaction Feedback
            </p>
            <p
              className={clsx(
                "text-base font-bold",
                viewMode === "wireframe" ? "font-mono text-slate-400" : "font-display text-emerald-300"
              )}
            >
              Accessible Action State
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Consistent tokens &amp; keyboard focus guarantees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BrandingPreviewCanvas: React.FC = () => {
  const [showAxes, setShowAxes] = useState<boolean>(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Authentic Brand Specimen · Setsuzoku Identity System
        </span>
        <button
          type="button"
          onClick={() => setShowAxes((prev) => !prev)}
          aria-pressed={showAxes}
          className={clsx(
            "px-2.5 py-1 rounded text-[11px] font-mono border transition-colors min-h-[32px]",
            showAxes
              ? "bg-brand-blue border-brand-blue text-white"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          )}
        >
          {showAxes ? "Hide Alignment Guides" : "Show Alignment Guides"}
        </button>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-[#070B13] p-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-6 relative bg-white rounded-lg p-6 h-36 flex items-center justify-center overflow-hidden">
          {showAxes && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-blue-400/50" />
              <div className="absolute inset-y-0 left-1/2 w-px border-l border-dashed border-emerald-500/50" />
              <div className="absolute inset-3 border border-dashed border-slate-300/80 rounded" />
            </div>
          )}
          <Image
            src="/brand/setsuzoku-logo.png"
            alt="Setsuzoku LLP Official Brand Logo"
            width={180}
            height={60}
            unoptimized
            className="relative z-10 h-auto w-auto max-h-14 object-contain"
          />
        </div>

        <div className="sm:col-span-6 space-y-3">
          <p className="font-mono text-[11px] text-slate-400">
            Brand Color Harmony &amp; Kanji Origin
          </p>
          <p className="text-sm font-semibold text-white">
            接続 (Setsuzoku) — Engineered Connection
          </p>
          <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
            <div className="space-y-1">
              <div className="h-6 rounded bg-[#0066FF]" />
              <span className="text-slate-400 block">#0066FF</span>
            </div>
            <div className="space-y-1">
              <div className="h-6 rounded bg-[#00C853]" />
              <span className="text-slate-400 block">#00C853</span>
            </div>
            <div className="space-y-1">
              <div className="h-6 rounded bg-[#0B1220] border border-slate-700" />
              <span className="text-slate-400 block">#0B1220</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DesignPreviewCanvas: React.FC = () => {
  const [gridOverlay, setGridOverlay] = useState<boolean>(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Interactive Visual Demonstration · Vector &amp; Layout Craft
        </span>
        <button
          type="button"
          onClick={() => setGridOverlay((prev) => !prev)}
          aria-pressed={gridOverlay}
          className={clsx(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-colors min-h-[32px]",
            gridOverlay
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          )}
        >
          <Grid3X3 className="w-3.5 h-3.5" />
          <span>{gridOverlay ? "Grid Guides On" : "Grid Guides Off"}</span>
        </button>
      </div>

      <div className="relative rounded-xl border border-slate-700/80 bg-[#070B13] p-5 overflow-hidden">
        {gridOverlay && (
          <div
            className="absolute inset-0 grid grid-cols-4 gap-3 px-5 pointer-events-none opacity-25"
            aria-hidden="true"
          >
            <div className="bg-blue-500/20 border-x border-blue-400/40 h-full" />
            <div className="bg-blue-500/20 border-x border-blue-400/40 h-full" />
            <div className="bg-blue-500/20 border-x border-blue-400/40 h-full" />
            <div className="bg-blue-500/20 border-x border-blue-400/40 h-full" />
          </div>
        )}

        <div className="relative z-10 grid grid-cols-3 gap-3 text-center">
          <div className="group p-4 rounded-lg bg-[#0E1422]/90 border border-slate-800 flex flex-col items-center gap-2.5">
            <InteractiveDesign className="w-9 h-9 text-blue-400" />
            <span className="text-xs font-medium text-slate-200">Vector Artwork</span>
          </div>
          <div className="group p-4 rounded-lg bg-[#0E1422]/90 border border-slate-800 flex flex-col items-center gap-2.5">
            <InteractiveBranding className="w-9 h-9 text-emerald-400" />
            <span className="text-xs font-medium text-slate-200">Visual Assets</span>
          </div>
          <div className="group p-4 rounded-lg bg-[#0E1422]/90 border border-slate-800 flex flex-col items-center gap-2.5">
            <InteractiveUiUx className="w-9 h-9 text-blue-300" />
            <span className="text-xs font-medium text-slate-200">Pitch Decks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DigitalSolutionsPreviewCanvas: React.FC = () => {
  const [stageIdx, setStageIdx] = useState<number>(0);

  const stages = [
    {
      label: "Peer-to-Peer Structures",
      detail: "Collaborative learning workflows replacing passive video consumption.",
    },
    {
      label: "Mentor Accountability",
      detail: "Guided checkpoint systems bridging execution gaps in education.",
    },
    {
      label: "Assistive AI Workflows",
      detail: "Practical artificial intelligence and cloud architecture built for reliability.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-mono text-[11px] text-slate-400">
          Architecture Blueprint · Grounded in EduAltTech
        </span>
        <Link
          href="/work/edualttech"
          className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300"
        >
          <span>Explore EduAltTech</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="rounded-xl border border-slate-700/80 bg-[#070B13] p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="group" aria-label="Select digital solution layer">
          {stages.map((st, idx) => (
            <button
              key={st.label}
              type="button"
              onClick={() => setStageIdx(idx)}
              className={clsx(
                "text-left p-3 rounded-lg border transition-colors min-h-[44px]",
                stageIdx === idx
                  ? "bg-blue-500/15 border-blue-400/50 text-white"
                  : "bg-[#0E1422] border-slate-800 text-slate-400 hover:text-slate-200"
              )}
            >
              <span className="block font-mono text-[10px] text-emerald-400 tabular-nums mb-1">
                0{idx + 1}
              </span>
              <span className="block text-xs font-semibold">{st.label}</span>
            </button>
          ))}
        </div>

        <div className="p-3.5 rounded-lg bg-[#0E1422] border border-slate-800 flex items-start gap-3">
          {stageIdx === 2 ? (
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Cpu className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-white">
              {stages[stageIdx].label}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {stages[stageIdx].detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderPreviewCanvas(slug: string) {
  switch (slug) {
    case "websites":
      return <WebsitesPreviewCanvas />;
    case "applications":
      return <ApplicationsPreviewCanvas />;
    case "ui-ux":
      return <UiUxPreviewCanvas />;
    case "branding":
      return <BrandingPreviewCanvas />;
    case "design":
      return <DesignPreviewCanvas />;
    case "digital-solutions":
      return <DigitalSolutionsPreviewCanvas />;
    default:
      return <WebsitesPreviewCanvas />;
  }
}

/* ============================================================================
 * MAIN SERVICES EXHIBITION CLIENT EXPERIENCE
 * ============================================================================ */

export const ServicesExhibition: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>(servicesData[0].slug);
  const studioStageRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const activeIndex = servicesData.findIndex((s) => s.slug === activeSlug);
  const activeService: ServiceItem =
    servicesData[activeIndex >= 0 ? activeIndex : 0];
  const matchedProjects = getProjectsForService(activeService.title);

  const handleInspectDiscipline = (slug: string) => {
    setActiveSlug(slug);
    if (studioStageRef.current) {
      studioStageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* --------------------------------------------------------------------
          SECTION 1: UPFRONT SIX-PRACTICE ARCHITECTURAL EXHIBITION (Light)
          Communicates all six disciplines' quality immediately before scrolling
          -------------------------------------------------------------------- */}
      <section
        aria-label="Six Engineering Disciplines Overview"
        className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080C14]"
      >
        <Container>
          <div className="py-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
              Six Core Engineering &amp; Design Practices
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any practice to inspect deliverables interactively below or open its full brief
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-slate-200 dark:border-slate-800">
            {servicesData.map((service, index) => {
              const stepNumber = String(index + 1).padStart(2, "0");
              const isBlue = index % 2 === 0;
              const isActive = activeSlug === service.slug;

              return (
                <article
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className={clsx(
                    "group relative border-r border-b border-slate-200 dark:border-slate-800 p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 scroll-mt-24",
                    isActive
                      ? "bg-[#F8FAFC] dark:bg-[#0E1422]"
                      : "bg-white dark:bg-[#080C14] hover:bg-[#F8FAFC]/80 dark:hover:bg-[#0E1422]/70"
                  )}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={clsx(
                          "font-mono text-xs font-semibold tabular-nums",
                          isBlue
                            ? "text-brand-blue dark:text-blue-400"
                            : "text-emerald-700 dark:text-emerald-400"
                        )}
                      >
                        {stepNumber} · {DISCIPLINE_CATEGORY_MAP[service.slug]}
                      </span>

                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        {renderDisciplineIcon(
                          service.iconName,
                          clsx(
                            "w-7 h-7 transition-transform duration-200 group-hover:scale-105",
                            isBlue
                              ? "text-brand-blue dark:text-blue-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h2 className="font-display text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                        <Link
                          href={`/services/${service.slug}`}
                          className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                        >
                          {service.title}
                        </Link>
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.whatWeBuild.slice(0, 2).map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check
                            className={clsx(
                              "w-3.5 h-3.5 mt-0.5 shrink-0",
                              isBlue
                                ? "text-brand-blue dark:text-blue-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            )}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                    <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {DISCIPLINE_PROOF_LABEL[service.slug]}
                    </p>

                    <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-[#0B1220] dark:text-white hover:text-brand-blue dark:hover:text-blue-400 transition-colors py-1"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleInspectDiscipline(service.slug)}
                        className="text-brand-blue dark:text-blue-400 hover:underline py-1 whitespace-nowrap"
                      >
                        Preview Stage ↓
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 2: INTERACTIVE STUDIO INDEX & LIVE DISCIPLINE PREVIEW CANVAS
          Exact Deep Indigo / Obsidian contrast showcase band
          -------------------------------------------------------------------- */}
      <section
        ref={studioStageRef}
        id="studio-index"
        aria-label="Interactive Studio Index and Live Preview Canvas"
        className="relative py-16 md:py-24 bg-[#070B13] text-white border-b border-slate-800 overflow-hidden scroll-mt-16"
      >
        <div
          className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs text-blue-400">
                Interactive Studio Index
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Inspect each discipline in depth
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Select a service practice below to inspect deliverables, authentic project proofs, and interactive capability demonstrations.
            </p>
          </div>

          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Rail (Desktop) & Horizontal Scrollable Tab Strip (Mobile/Tablet) */}
            <div className="lg:col-span-5">
              <div
                role="tablist"
                aria-label="Service Disciplines"
                className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-0 pb-2 lg:pb-0 lg:border-t lg:border-slate-800"
              >
                {servicesData.map((service, idx) => {
                  const isSelected = activeSlug === service.slug;
                  const step = String(idx + 1).padStart(2, "0");

                  return (
                    <button
                      key={service.slug}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="discipline-preview-panel"
                      onClick={() => setActiveSlug(service.slug)}
                      className={clsx(
                        "relative group text-left shrink-0 lg:shrink lg:w-full px-4 py-3.5 lg:py-4 rounded-xl lg:rounded-none border lg:border-0 lg:border-b border-slate-800 transition-colors min-h-[44px] flex items-center justify-between gap-4",
                        isSelected
                          ? "bg-[#0E1629] lg:bg-[#0B1220] border-blue-500/40 text-white"
                          : "bg-[#0B111E] lg:bg-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1220]/60"
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="studioIndexIndicator"
                          transition={
                            prefersReduced
                              ? { duration: 0 }
                              : { duration: 0.28, ease: STUDIO_EASE }
                          }
                          className="hidden lg:block absolute left-0 top-2 bottom-2 w-0.5 bg-brand-blue"
                          aria-hidden="true"
                        />
                      )}

                      <div className="flex items-center gap-3.5 min-w-0">
                        <span
                          className={clsx(
                            "font-mono text-xs tabular-nums shrink-0",
                            isSelected ? "text-blue-400 font-semibold" : "text-slate-500"
                          )}
                        >
                          {step}
                        </span>
                        <div className="min-w-0">
                          <span className="block font-display text-sm sm:text-base font-bold truncate">
                            {service.title}
                          </span>
                          <span className="hidden lg:block text-xs text-slate-400 truncate mt-0.5">
                            {DISCIPLINE_CATEGORY_MAP[service.slug]}
                          </span>
                        </div>
                      </div>

                      <ArrowRight
                        className={clsx(
                          "w-4 h-4 shrink-0 transition-transform duration-150 hidden lg:block",
                          isSelected
                            ? "text-blue-400 translate-x-0.5"
                            : "text-slate-600 group-hover:text-slate-400"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Live Discipline Preview Canvas */}
            <div className="lg:col-span-7" id="discipline-preview-panel" role="tabpanel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.slug}
                  initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: STUDIO_EASE }}
                  className="rounded-2xl border border-slate-800 bg-[#0B1220] p-6 sm:p-8 space-y-6"
                >
                  {/* Discipline Stage Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                    <div className="space-y-1.5 max-w-xl">
                      <span className="font-mono text-xs text-blue-400 tabular-nums">
                        {String(activeIndex + 1).padStart(2, "0")} / 06 ·{" "}
                        {DISCIPLINE_CATEGORY_MAP[activeService.slug]}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {activeService.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed pt-1">
                        {activeService.overview}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl border border-slate-700/80 bg-[#070B13] flex items-center justify-center shrink-0">
                      {renderDisciplineIcon(
                        activeService.iconName,
                        "w-7 h-7 text-blue-400"
                      )}
                    </div>
                  </div>

                  {/* Interactive Visual Product Preview Canvas */}
                  {renderPreviewCanvas(activeService.slug)}

                  {/* Verbatim Core Deliverables */}
                  <div className="pt-2 space-y-3">
                    <p className="font-mono text-xs text-slate-400">
                      Core {activeService.title} Deliverables
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {activeService.whatWeBuild.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 py-1"
                        >
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matched Live Work + Primary Discipline CTA */}
                  <div className="pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${activeService.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-semibold transition-colors min-h-[44px]"
                      >
                        <span>Open {activeService.title} Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      {activeService.slug === "websites" && (
                        <Link
                          href="/pricing"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold transition-colors min-h-[44px]"
                        >
                          <span>Website Pricing Guide</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {matchedProjects.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="font-mono">Related Work:</span>
                        {matchedProjects.map((proj) => (
                          <Link
                            key={proj.slug}
                            href={`/work/${proj.slug}`}
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                          >
                            <span>{proj.name.split(" — ")[0]}</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------------
          SECTION 3: CROSS-DISCIPLINE OUTCOMES & ENGINEERING STANDARDS LEDGER
          Unboxed editorial specification table on clean Light/Dark canvas
          -------------------------------------------------------------------- */}
      <section
        aria-label="Cross-Discipline Problems Solved and Engineering Approach"
        className="py-16 md:py-24 bg-[#F8FAFC]/70 dark:bg-[#0B101C] border-b border-slate-200 dark:border-slate-800"
      >
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs text-brand-blue dark:text-blue-400">
                Practice Comparison Matrix
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
                Problems we solve vs. engineering standards
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              An executive side-by-side summary across all six Setsuzoku practices.
            </p>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {/* Desktop Table Column Headings */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="lg:col-span-3">Discipline</div>
              <div className="lg:col-span-4">Core Challenges Addressed</div>
              <div className="lg:col-span-3">Development Approach</div>
              <div className="lg:col-span-2 text-right">Details</div>
            </div>

            {servicesData.map((service, idx) => (
              <div
                key={service.slug}
                className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start"
              >
                <div className="lg:col-span-3 flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0B1220] dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {DISCIPLINE_CATEGORY_MAP[service.slug]}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-1.5">
                  <span className="lg:hidden block font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Challenges Addressed
                  </span>
                  {service.problemsWeSolve.slice(0, 2).map((prob) => (
                    <p
                      key={prob}
                      className="text-sm text-slate-700 dark:text-slate-300 leading-snug"
                    >
                      {prob}
                    </p>
                  ))}
                </div>

                <div className="lg:col-span-3 space-y-1.5">
                  <span className="lg:hidden block font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    Development Approach
                  </span>
                  {service.developmentApproach.slice(0, 2).map((step) => (
                    <p
                      key={step}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug"
                    >
                      · {step}
                    </p>
                  ))}
                </div>

                <div className="lg:col-span-2 lg:text-right">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue dark:text-blue-400 hover:underline py-1"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
