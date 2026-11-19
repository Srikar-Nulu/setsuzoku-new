import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projectsData } from "@/data/projects";
import {
  Reveal,
  ArchitecturalCrosshair,
} from "@/components/ui/MotionPrimitives";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import {
  JsonLd,
  getBreadcrumbSchema,
  getProjectSchema,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: {
    slug: string;
  };
}

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

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.name} — ${project.categoryLabel} Case Study | Setsuzoku LLP`;
  const description = project.longDescription || project.description;

  return {
    title,
    description,
    keywords: [
      project.name,
      project.categoryLabel,
      ...(project.technologies || []),
      ...(project.capabilities || []),
      "Setsuzoku LLP",
      "Case Study",
    ],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/work/${project.slug}`,
      type: "article",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const projectIdx = projectsData.findIndex((p) => p.slug === params.slug);
  const project = projectIdx >= 0 ? projectsData[projectIdx] : undefined;

  if (!project) {
    notFound();
  }

  const clientLogo = PROJECT_CLIENT_LOGOS[project.slug];
  const prevProject =
    projectsData[(projectIdx - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(projectIdx + 1) % projectsData.length];

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Work", item: "/work" },
    { name: project.name, item: `/work/${project.slug}` },
  ]);
  const projectSchema = getProjectSchema(project);

  return (
    <div className="bg-white dark:bg-[#080C14]">
      <JsonLd data={[breadcrumbData, projectSchema]} />

      {/* Full-Width Obsidian Case Study Monograph Masthead */}
      <section className="relative bg-[#070B13] dark:bg-[#060911] text-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-blue via-blue-400 to-emerald-400"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Top Navigation Bar */}
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </Link>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              Case Study {String(projectIdx + 1).padStart(2, "0")} /{" "}
              {String(projectsData.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <Reveal className="lg:col-span-9 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="navy">{project.categoryLabel}</Badge>
                {project.client && (
                  <span className="text-xs font-mono text-slate-400">
                    Client · {project.client}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-[-0.03em] leading-[1.08] text-balance">
                {project.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
                {project.longDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  href={project.websiteUrl}
                  external
                  variant="secondary"
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Visit Live Project
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="border-slate-700 bg-slate-900/70 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                >
                  Discuss a Similar Project
                </Button>
              </div>
            </Reveal>

            {/* Right: Authentic Framed Client Logo Plate */}
            {clientLogo && (
              <Reveal delay={0.08} className="lg:col-span-3 flex lg:justify-end">
                <div className="bg-white rounded-xl px-5 py-4 h-20 w-48 flex items-center justify-center overflow-hidden shadow-lg shadow-black/20">
                  <Image
                    src={clientLogo.src}
                    alt={clientLogo.alt}
                    width={150}
                    height={48}
                    unoptimized
                    className="h-auto w-auto max-h-12 max-w-[85%] object-contain"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* Monograph Body: Sticky Left Dossier Rail + Wide Editorial Chapters */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#080C14]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Sticky Dossier Rail */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] divide-y divide-slate-200/80 dark:divide-slate-800 overflow-hidden">
                <div className="px-5 py-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  Project Dossier
                </div>

                {project.client && (
                  <div className="px-5 py-4 space-y-1">
                    <span className="block text-xs font-mono text-slate-400 dark:text-slate-500">
                      Client
                    </span>
                    <span className="text-sm font-semibold text-[#0B1220] dark:text-slate-100">
                      {project.client}
                    </span>
                  </div>
                )}

                <div className="px-5 py-4 space-y-1">
                  <span className="block text-xs font-mono text-slate-400 dark:text-slate-500">
                    Category
                  </span>
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {project.categoryLabel}
                  </span>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="px-5 py-4 space-y-2">
                    <span className="block text-xs font-mono text-slate-400 dark:text-slate-500">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          {idx > 0 && (
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
                  </div>
                )}

                <div className="px-5 py-4">
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline"
                  >
                    <span>Open Live Environment</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Editorial Narrative Chapters */}
            <div className="lg:col-span-8 space-y-14">
              {/* Chapter 01: The Challenge */}
              <Reveal>
                <div className="space-y-4 pb-12 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-500/30 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      01
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                      The Challenge
                    </h2>
                  </div>
                  <p className="text-base sm:text-[17px] text-slate-600 dark:text-slate-300 leading-[1.75]">
                    {project.challenge}
                  </p>
                </div>
              </Reveal>

              {/* Chapter 02: What We Built */}
              <Reveal delay={0.05}>
                <div className="space-y-4 pb-12 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      02
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                      What We Built
                    </h2>
                  </div>
                  <p className="text-base sm:text-[17px] text-slate-600 dark:text-slate-300 leading-[1.75]">
                    {project.solution}
                  </p>
                </div>
              </Reveal>

              {/* Chapter 03: Key Capabilities Delivered Ledger */}
              <Reveal delay={0.08}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      03
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                      Key Capabilities Delivered
                    </h2>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200/80 dark:divide-slate-800">
                    {project.capabilities.map((cap, cIdx) => (
                      <div
                        key={cap}
                        className="py-4 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                          <span className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                            {cap}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums shrink-0 mt-1">
                          {String(cIdx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Live Environment Callout */}
              <Reveal delay={0.1}>
                <div className="relative bg-[#0B1220] dark:bg-[#0E1422] border border-slate-800 text-white p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden">
                  <ArchitecturalCrosshair className="hidden sm:block absolute top-3.5 left-3.5 text-slate-700" />
                  <ArchitecturalCrosshair className="hidden sm:block absolute bottom-3.5 right-3.5 text-slate-700" />
                  <div className="space-y-1.5 relative z-10">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      Experience the Live Project
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Explore the deployed project and live environment
                      directly.
                    </p>
                  </div>
                  <Button
                    href={project.websiteUrl}
                    external
                    variant="secondary"
                    size="lg"
                    className="relative z-10"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Visit Live Project
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Next / Previous Case Study Monograph Navigation */}
          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href={`/work/${prevProject.slug}`}
              className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-1.5"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Previous Case Study</span>
              </span>
              <span className="block font-display text-lg font-bold text-[#0B1220] dark:text-slate-100 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                {prevProject.name}
              </span>
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-1.5 sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400 sm:justify-end">
                <span>Next Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="block font-display text-lg font-bold text-[#0B1220] dark:text-slate-100 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                {nextProject.name}
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
