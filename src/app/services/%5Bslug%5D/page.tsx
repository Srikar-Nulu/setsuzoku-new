import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import {
  Reveal,
  ArchitecturalCrosshair,
} from "@/components/ui/MotionPrimitives";
import {
  Check,
  ArrowRight,
  AlertCircle,
  Layers,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import {
  JsonLd,
  getBreadcrumbSchema,
  getServiceSchema,
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
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  const title = `${service.title} Services — Setsuzoku LLP`;
  const description = service.overview || service.shortDescription;

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.title} development`,
      ...service.whatWeBuild,
      "Setsuzoku LLP",
      "Edu Alt Tech",
    ],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: "website",
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

export default function ServiceDetailPage({ params }: PageProps) {
  const serviceIdx = servicesData.findIndex((s) => s.slug === params.slug);
  const service = serviceIdx >= 0 ? servicesData[serviceIdx] : undefined;

  if (!service) {
    notFound();
  }

  const disciplineIndex = String(serviceIdx + 1).padStart(2, "0");
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: service.title, item: `/services/${service.slug}` },
  ]);
  const serviceSchema = getServiceSchema(service);

  const relatedProjects = projectsData.filter((p) => {
    if (service.slug === "websites") return p.category === "Websites";
    if (service.slug === "applications") return p.category === "Applications";
    if (service.slug === "ui-ux") return p.category === "UI/UX";
    if (service.slug === "branding") return p.category === "Branding";
    if (service.slug === "design") return p.category === "Design";
    if (service.slug === "digital-solutions")
      return p.category === "Digital Solutions";
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#080C14]">
      <JsonLd data={[breadcrumbData, serviceSchema]} />

      {/* Technical Specification Sheet Hero */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-blueprint-light mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>

            <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
              Discipline {disciplineIndex} / 06
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <Reveal className="lg:col-span-8 space-y-6">
              <Badge variant="blue">{service.title}</Badge>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0B1220] dark:text-slate-50 tracking-[-0.03em] leading-[1.08] text-balance">
                {service.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
                {service.overview}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a {service.title} Project
                </Button>
                {service.slug === "websites" && (
                  <Button href="/pricing" variant="outline" size="lg">
                    View Website Pricing Guide
                  </Button>
                )}
              </div>
            </Reveal>

            {/* Right: Compact Specification Dossier Card */}
            <Reveal delay={0.08} className="lg:col-span-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] divide-y divide-slate-200/80 dark:divide-slate-800 overflow-hidden">
                <div className="px-5 py-3.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">
                    Specification Sheet
                  </span>
                  <span className="text-brand-blue dark:text-blue-400 font-semibold tabular-nums">
                    #{disciplineIndex}
                  </span>
                </div>
                <div className="px-5 py-4 space-y-1">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">
                    Practice Area
                  </span>
                  <span className="text-sm font-semibold text-[#0B1220] dark:text-slate-100">
                    {service.title}
                  </span>
                </div>
                <div className="px-5 py-4 space-y-1">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">
                    Deliverable Scope
                  </span>
                  <span className="text-sm font-semibold text-[#0B1220] dark:text-slate-100 tabular-nums">
                    {service.whatWeBuild.length} Core Deliverables ·{" "}
                    {service.capabilities.length} Capabilities
                  </span>
                </div>
                <div className="px-5 py-4 space-y-1">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">
                    Engineering Standard
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {service.developmentApproach[0]}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Diagnosis-to-Execution Matrix */}
      <section className="py-16 md:py-20 bg-[#F8FAFC]/70 dark:bg-[#0B101C] border-b border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              <div className="p-8 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/90">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-brand-blue dark:text-blue-400 flex items-center justify-center border border-blue-200/70 dark:border-blue-500/30">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                      What We Build
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    {String(service.whatWeBuild.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {service.whatWeBuild.map((item) => (
                    <li
                      key={item}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Check className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 sm:p-10 space-y-6 bg-[#F8FAFC]/60 dark:bg-[#131B2E]/35">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800/90">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/70 dark:border-emerald-500/30">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                      Problems We Solve
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                    {String(service.problemsWeSolve.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="divide-y divide-slate-200/60 dark:divide-slate-800/80">
                  {service.problemsWeSolve.map((item) => (
                    <li
                      key={item}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Numbered Capabilities Editorial Ledger (Horizontal Rows — Distinct from Card Grids) */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#080C14] border-b border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="max-w-3xl space-y-3 mb-12">
              <Badge variant="blue">Capabilities Breakdown</Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight text-balance">
                Engineered for high performance.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore the specific technical modules and capabilities we
                integrate into our solutions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
              {service.capabilities.map((cap, idx) => (
                <div
                  key={cap.title}
                  className="py-7 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline hover:bg-[#F8FAFC]/80 dark:hover:bg-[#0E1422]/60 transition-colors px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl"
                >
                  <div className="md:col-span-1 font-mono text-sm font-semibold text-brand-blue dark:text-blue-400 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                      {cap.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Full-Width Obsidian Engineering Approach Band */}
      <section className="relative py-16 md:py-24 bg-[#070B13] dark:bg-[#060911] text-white border-b border-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10 space-y-10">
          <Reveal>
            <div className="max-w-2xl space-y-3">
              <Badge variant="navy" size="sm">
                Our Engineering Approach
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Guaranteed quality &amp; performance.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-800 rounded-xl overflow-hidden bg-[#0B1220]">
              {service.developmentApproach.map((approach, i) => (
                <div
                  key={approach}
                  className="p-6 sm:p-7 border-r border-b border-slate-800 flex flex-col justify-between gap-6 min-h-[140px]"
                >
                  <span className="text-xs font-mono text-emerald-400 font-semibold tabular-nums">
                    Step 0{i + 1}
                  </span>
                  <p className="text-sm sm:text-[15px] font-semibold text-slate-100 leading-snug">
                    {approach}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Related Case Studies & Other Disciplines */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]/60 dark:bg-[#0B101C]">
        <Container className="space-y-16">
          {relatedProjects.length > 0 && (
            <div className="space-y-8">
              <Reveal>
                <div className="max-w-2xl space-y-3">
                  <Badge variant="green">Relevant Case Studies</Badge>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                    Related work in action.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                    See how we executed {service.title.toLowerCase()} for
                    clients.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProjects.map((p) => {
                  const logo = PROJECT_CLIENT_LOGOS[p.slug];
                  return (
                    <div
                      key={p.slug}
                      className="bg-white dark:bg-[#0E1422] p-7 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {p.categoryLabel}
                          </span>
                          {logo && (
                            <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 h-9 flex items-center justify-center overflow-hidden">
                              <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={88}
                                height={28}
                                unoptimized
                                className="h-5 w-auto max-w-[72px] object-contain"
                              />
                            </div>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                          {p.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between gap-4">
                        <Link
                          href={`/work/${p.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline"
                        >
                          <span>Read Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {p.websiteUrl && (
                          <a
                            href={p.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Explore Other Disciplines Rail */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-5">
            <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400 block">
              Explore Other Disciplines
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-brand-blue dark:hover:border-blue-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                >
                  <span>{other.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>
          </div>

          {/* Final CTA Banner */}
          <Reveal>
            <div className="relative bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
              <ArchitecturalCrosshair className="hidden sm:block absolute top-3.5 left-3.5" />
              <ArchitecturalCrosshair className="hidden sm:block absolute bottom-3.5 right-3.5" />
              <div className="space-y-2 max-w-xl">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50 tracking-tight">
                  Ready to build a {service.title}?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                  Contact our engineering team to discuss your project
                  requirements and technical architecture.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Collaborate with Us
                </Button>
                {service.slug === "websites" && (
                  <Button href="/pricing" variant="outline" size="lg">
                    View Website Pricing Guide
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
