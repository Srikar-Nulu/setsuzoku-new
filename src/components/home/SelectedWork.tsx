"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { projectsData } from "@/data/projects";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui/MotionPrimitives";
import { ArrowRight, ExternalLink, Check } from "lucide-react";

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

export const SelectedWork: React.FC = () => {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 4);
  const flagship = featuredProjects[0];
  const secondaryProjects = featuredProjects.slice(1);

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]/70 dark:bg-[#0B101C] border-b border-slate-200/80 dark:border-slate-800/80">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <SectionHeading
              badge="Featured Projects"
              badgeVariant="green"
              title="Built for real-world problems."
              subtitle="Explore how Setsuzoku partners with clients to engineer software that powers operations and growth."
              className="mb-0 max-w-2xl"
            />
            <div className="shrink-0">
              <Button
                href="/work"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View All Work
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Flagship Project 01 — Full-Width Horizontal Editorial Showcase */}
        {flagship && (
          <Reveal delay={0.05}>
            <article className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] overflow-hidden mb-6 lg:mb-7 transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-700">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Narrative Column */}
                <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400 dark:text-slate-500 font-semibold tabular-nums">
                        01
                      </span>
                      <span
                        className="text-slate-300 dark:text-slate-700"
                        aria-hidden="true"
                      >
                        /
                      </span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {flagship.categoryLabel}
                      </span>
                      {flagship.client && (
                        <>
                          <span
                            className="text-slate-300 dark:text-slate-700"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {flagship.client}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Link
                        href={`/work/${flagship.slug}`}
                        className="block focus:outline-none"
                      >
                        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tracking-[-0.025em]">
                          {flagship.name}
                        </h3>
                      </Link>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                        {flagship.description}
                      </p>
                    </div>

                    {flagship.technologies && flagship.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                        {flagship.technologies.map((tech, tIdx) => (
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

                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-5">
                    <Link
                      href={`/work/${flagship.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1220] dark:text-white hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                    </Link>

                    {flagship.websiteUrl && (
                      <a
                        href={flagship.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        <span>Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Architectural Showcase Plate */}
                <div className="lg:col-span-5 bg-[#0B1220] dark:bg-[#080D18] text-white p-7 sm:p-10 flex flex-col justify-between gap-8 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
                  <div
                    className="absolute inset-0 bg-blueprint-dark opacity-70 pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-slate-400">
                      Featured Case Study
                    </span>
                    {PROJECT_CLIENT_LOGOS[flagship.slug] && (
                      <div className="bg-white rounded-lg px-3.5 py-2 h-12 flex items-center justify-center overflow-hidden shrink-0">
                        <Image
                          src={PROJECT_CLIENT_LOGOS[flagship.slug].src}
                          alt={PROJECT_CLIENT_LOGOS[flagship.slug].alt}
                          width={110}
                          height={36}
                          unoptimized
                          className="h-7 w-auto max-w-[92px] object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {flagship.capabilities && flagship.capabilities.length > 0 && (
                    <div className="relative z-10 space-y-3 pt-4 border-t border-slate-800/90">
                      <span className="font-mono text-xs text-emerald-400 block">
                        Key Capabilities Delivered
                      </span>
                      <ul className="space-y-2.5">
                        {flagship.capabilities.slice(0, 3).map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-snug"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Secondary Projects 02–04 — Unified Architectural 3-Column Editorial Strip */}
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
          {secondaryProjects.map((project, idx) => {
            const clientLogo = PROJECT_CLIENT_LOGOS[project.slug];
            const indexNumber = String(idx + 2).padStart(2, "0");

            return (
              <StaggerItem key={project.slug} className="flex">
                <article className="group relative flex-1 flex flex-col justify-between border-r border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E] transition-colors duration-150">
                  <Link
                    href={`/work/${project.slug}`}
                    className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-blue"
                  >
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="text-slate-400 dark:text-slate-500 font-semibold tabular-nums">
                            {indexNumber}
                          </span>
                          <span
                            className="text-slate-300 dark:text-slate-700"
                            aria-hidden="true"
                          >
                            /
                          </span>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {project.categoryLabel}
                          </span>
                        </div>

                        {clientLogo && (
                          <div className="bg-white border border-slate-200/90 rounded-lg px-2.5 py-1.5 shrink-0 h-10 flex items-center justify-center overflow-hidden">
                            <Image
                              src={clientLogo.src}
                              alt={clientLogo.alt}
                              width={88}
                              height={32}
                              unoptimized
                              className="h-6 w-auto max-w-[74px] object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tracking-tight">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
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
                  </Link>

                  <div className="px-7 sm:px-8 py-4 border-t border-slate-200/70 dark:border-slate-800/90 flex items-center justify-between gap-4">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-xs font-semibold text-[#0B1220] dark:text-slate-200 hover:text-brand-blue dark:hover:text-blue-400 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                    </Link>

                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
};
