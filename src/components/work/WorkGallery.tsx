"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { STUDIO_EASE } from "@/components/ui/MotionPrimitives";
import { ArrowRight, ExternalLink } from "lucide-react";
import { clsx } from "clsx";

const categories = [
  "All",
  "Websites",
  "Applications",
  "Digital Solutions",
] as const;

type CategoryFilter = (typeof categories)[number];

const PROJECT_CLIENT_LOGOS: Record<string, { src: string; alt: string }> = {
  joyschool: { src: "/clients/joy-school.png", alt: "JoySchool Logo" },
  "genesis-education-website": {
    src: "/clients/genesis.png",
    alt: "Genesis Logo",
  },
  "genesis-lms": { src: "/clients/genesis.png", alt: "Genesis Logo" },
  "mamasparsh-preschool-website": {
    src: "/clients/mamasprash.png",
    alt: "MamaSparsh Logo",
  },
};

export function WorkGallery() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <>
      {/* Segmented Filter Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projectsData.length
                : projectsData.filter((p) => p.category === cat).length;
            const isActive = activeFilter === cat;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(cat)}
                className={clsx(
                  "relative px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors duration-150 cursor-pointer inline-flex items-center gap-1.5",
                  isActive
                    ? "text-white dark:text-[#0B1220]"
                    : "text-slate-600 dark:text-slate-400 hover:text-[#0B1220] dark:hover:text-slate-100"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter-active"
                    transition={{ duration: 0.24, ease: STUDIO_EASE }}
                    className="absolute inset-0 rounded-lg bg-[#0B1220] dark:bg-white"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={clsx(
                    "relative z-10 font-mono text-[11px] tabular-nums",
                    isActive
                      ? "text-slate-300 dark:text-slate-600"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </span>
      </div>

      {/* Wide Editorial Dossier Rows (Distinct from Homepage Grid) */}
      {filteredProjects.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const clientLogo = PROJECT_CLIENT_LOGOS[project.slug];

              return (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: STUDIO_EASE }}
                  className="group relative p-6 sm:p-8 lg:p-10 hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E]/60 transition-colors duration-150"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Col 1: Index Number */}
                    <div className="lg:col-span-1 hidden lg:block">
                      <span className="font-mono text-2xl font-bold text-slate-300 dark:text-slate-700 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tabular-nums">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Col 2: Authentic Client Mark Plate + Metadata */}
                    <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between gap-4">
                      {clientLogo ? (
                        <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-3 h-16 w-40 flex items-center justify-center overflow-hidden shrink-0">
                          <Image
                            src={clientLogo.src}
                            alt={clientLogo.alt}
                            width={120}
                            height={40}
                            unoptimized
                            className="h-auto w-auto max-h-10 max-w-[85%] object-contain"
                          />
                        </div>
                      ) : (
                        <div className="bg-[#0B1220] dark:bg-[#131B2E] border border-slate-800 text-white rounded-xl px-4 py-3 h-16 w-40 flex items-center justify-center shrink-0">
                          <span className="font-display font-bold text-lg tracking-tight">
                            {project.logoPlaceholder || project.name.slice(0, 2)}
                          </span>
                        </div>
                      )}

                      <div className="space-y-0.5 text-right lg:text-left">
                        <span className="block font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {project.categoryLabel}
                        </span>
                        {project.client && (
                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {project.client}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Col 3: Editorial Narrative & Stack */}
                    <div className="lg:col-span-5 space-y-3">
                      <h2 className="font-display text-2xl font-bold text-[#0B1220] dark:text-slate-50 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tracking-tight leading-snug">
                        <Link
                          href={`/work/${project.slug}`}
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                        >
                          {project.name}
                        </Link>
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                          {project.technologies.map((tech, tIdx) => (
                            <React.Fragment key={tech}>
                              {tIdx > 0 && (
                                <span
                                  className="text-slate-300 dark:text-slate-700"
                                  aria-hidden="true"
                                >
                                  ·
                                </span>
                              )}
                              <span>{tech}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Col 4: Dual Actions */}
                    <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B1220] dark:bg-blue-600 text-white hover:bg-brand-blue dark:hover:bg-blue-500 text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>

                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline whitespace-nowrap"
                      >
                        <span>Visit Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#0E1422] rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            No projects found in this category.
          </p>
        </div>
      )}
    </>
  );
}
