import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projectsData } from "@/data/projects";
import { ArrowLeft, ExternalLink, Check, AlertTriangle, Lightbulb } from "lucide-react";

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
  "genesis-education-website": { src: "/clients/genesis.png", alt: "Genesis Logo" },
  "genesis-lms": { src: "/clients/genesis.png", alt: "Genesis Logo" },
  "mamasparsh-preschool-website": { src: "/clients/mamasprash.png", alt: "MamaSparsh Logo" },
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
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const clientLogo = PROJECT_CLIENT_LOGOS[project.slug];

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Work", item: "/work" },
    { name: project.name, item: `/work/${project.slug}` },
  ]);
  const projectSchema = getProjectSchema(project);

  return (
    <div className="py-12 md:py-20 bg-transparent">
      <JsonLd data={[breadcrumbData, projectSchema]} />
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-6 mb-14 border-b border-slate-200 dark:border-slate-800 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="blue">{project.categoryLabel}</Badge>
              {project.client && (
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  Client: {project.client}
                </span>
              )}
            </div>

            {clientLogo && (
              <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 h-12 flex items-center justify-center">
                <Image
                  src={clientLogo.src}
                  alt={clientLogo.alt}
                  width={120}
                  height={40}
                  unoptimized
                  className="h-7 w-auto max-w-[100px] object-contain"
                />
              </div>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1220] dark:text-slate-50 tracking-[-0.03em] leading-[1.1] max-w-4xl text-balance">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl">
            {project.longDescription}
          </p>

          {/* Technology Stack Metadata */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                Stack:
              </span>
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  {idx > 0 && (
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {tech}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Live Project CTA */}
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
            <Button href="/contact" variant="outline" size="lg">
              Discuss a Similar Project
            </Button>
          </div>
        </div>

        {/* 2-Column Challenge & Solution Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422] mb-14">
          <div className="p-8 sm:p-9 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-500/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                The Challenge
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.challenge}
            </p>
          </div>

          <div className="p-8 sm:p-9 space-y-4 bg-[#F8FAFC]/70 dark:bg-[#131B2E]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-500/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                What We Built
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Capabilities Checklist */}
        <div className="bg-[#F8FAFC] dark:bg-[#0E1422] p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 mb-14 space-y-6">
          <h3 className="font-display text-2xl font-bold text-[#0B1220] dark:text-slate-50">
            Key Capabilities Delivered
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-3 bg-white dark:bg-[#131B2E] p-4 rounded-xl border border-slate-200/90 dark:border-slate-800"
              >
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final External Redirect CTA */}
        <div className="bg-[#0B1220] dark:bg-[#0E1422] border border-slate-800 text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-white">
              Experience the Live Project
            </h3>
            <p className="text-slate-300 text-sm">
              Explore the deployed project and live environment directly.
            </p>
          </div>
          <Button
            href={project.websiteUrl}
            external
            variant="secondary"
            size="lg"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Visit Live Project
          </Button>
        </div>
      </Container>
    </div>
  );
}
