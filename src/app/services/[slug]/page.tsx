import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { Check, ArrowRight, AlertCircle, Layers, ArrowLeft } from "lucide-react";

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
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

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
    if (service.slug === "digital-solutions") return p.category === "Digital Solutions";
    return true;
  });

  return (
    <div className="py-12 md:py-20 bg-transparent">
      <JsonLd data={[breadcrumbData, serviceSchema]} />
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Hero */}
        <div className="max-w-4xl space-y-5 mb-14 pb-12 border-b border-slate-200 dark:border-slate-800">
          <Badge variant="blue">{service.title.toUpperCase()}</Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1220] dark:text-slate-50 tracking-[-0.03em] leading-[1.1] text-balance">
            {service.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl">
            {service.overview}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
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
        </div>

        {/* 2-Column Overview: What We Build & Problems We Solve */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422] mb-16">
          <div className="p-8 sm:p-9 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/15 text-brand-blue dark:text-blue-400 flex items-center justify-center border border-blue-200/70 dark:border-blue-500/30">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                What We Build
              </h3>
            </div>
            <ul className="space-y-3">
              {service.whatWeBuild.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <Check className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 sm:p-9 space-y-6 bg-[#F8FAFC]/60 dark:bg-[#131B2E]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/70 dark:border-emerald-500/30">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                Problems We Solve
              </h3>
            </div>
            <ul className="space-y-3">
              {service.problemsWeSolve.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Capabilities Grid */}
        <div className="mb-16">
          <SectionHeading
            badge="CAPABILITIES BREAKDOWN"
            badgeVariant="blue"
            title="Engineered for high performance."
            subtitle="Explore the specific technical modules and capabilities we integrate into our solutions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-[#0E1422]">
            {service.capabilities.map((cap, idx) => (
              <div
                key={cap.title}
                className="p-7 border-r border-b border-slate-200 dark:border-slate-800 space-y-2.5"
              >
                <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-lg font-bold text-[#0B1220] dark:text-slate-50">
                  {cap.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Approach */}
        <div className="bg-[#0B1220] dark:bg-[#0E1422] text-white rounded-2xl border border-slate-800 p-8 sm:p-12 mb-16 space-y-8">
          <div className="max-w-2xl space-y-3">
            <Badge variant="navy" size="sm">
              OUR ENGINEERING APPROACH
            </Badge>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Guaranteed quality &amp; performance.
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.developmentApproach.map((approach, i) => (
              <div
                key={approach}
                className="bg-slate-900/70 dark:bg-[#131B2E] p-5 rounded-xl border border-slate-800 space-y-2.5"
              >
                <span className="text-xs font-mono text-emerald-400 font-semibold tabular-nums">
                  0{i + 1}
                </span>
                <p className="text-sm font-semibold text-slate-200 leading-snug">
                  {approach}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Case Studies */}
        {relatedProjects.length > 0 && (
          <div className="space-y-8 mb-16">
            <SectionHeading
              badge="RELEVANT CASE STUDIES"
              badgeVariant="green"
              title="Related work in action."
              subtitle={`See how we executed ${service.title.toLowerCase()} for clients.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <div
                  key={p.slug}
                  className="bg-white dark:bg-[#0E1422] p-7 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-3.5"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                    {p.categoryLabel}
                  </span>
                  <h4 className="font-display text-xl font-bold text-[#0B1220] dark:text-slate-50">
                    {p.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/work/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA Banner */}
        <div className="bg-[#F8FAFC] dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1220] dark:text-slate-50">
              Ready to build a {service.title}?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Contact our engineering team to discuss your project requirements and technical architecture.
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
      </Container>
    </div>
  );
}
