import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { servicesData } from "@/data/services";
import { ServicesExhibition } from "@/components/services/ServicesExhibition";
import {
  Reveal,
  ArchitecturalCrosshair,
} from "@/components/ui/MotionPrimitives";
import {
  JsonLd,
  getBreadcrumbSchema,
  getServiceSchema,
} from "@/components/seo/JsonLd";
import { ArrowRight, ArrowDownRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Software Development & IT Engineering Services — Setsuzoku LLP",
  description:
    "Explore Setsuzoku LLP's engineering services: Custom Websites, Web Applications, UI/UX Design Systems, Branding, and Enterprise Digital Solutions from Kakinada, Andhra Pradesh.",
  keywords: [
    "Software Development Services",
    "Web Development Company in Kakinada",
    "IT Company in Kakinada",
    "Tech Company in Andhra Pradesh",
    "Custom Web Applications",
    "UI/UX Design Systems",
    "Brand Identity Design",
    "Digital Transformation India",
    "Edu Alt Tech Services",
    "Setsuzoku Services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Software Development & IT Engineering Services — Setsuzoku LLP",
    description:
      "Explore Setsuzoku LLP's engineering services: Custom Websites, Web Applications, UI/UX Design Systems, Branding, and Enterprise Digital Solutions.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development & IT Engineering Services — Setsuzoku LLP",
    description:
      "Explore Setsuzoku LLP's engineering services: Custom Websites, Web Applications, UI/UX Design Systems, Branding, and Enterprise Digital Solutions.",
  },
};

export default function ServicesPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
  ]);

  const serviceSchemas = servicesData.map(getServiceSchema);

  return (
    <div className="bg-white dark:bg-[#080C14] min-h-screen relative overflow-x-clip">
      <JsonLd data={[breadcrumbData, ...serviceSchemas]} />

      {/* Distinctive Full-Width Architectural Manifesto Masthead (No repeated split hero box) */}
      <section className="relative pt-14 pb-12 md:pt-20 md:pb-16 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-blueprint-light mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Reveal className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <p className="font-mono text-xs font-medium text-brand-blue dark:text-blue-400">
                Our Disciplines · {siteConfig.descriptor}
              </p>
              <a
                href="#studio-index"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
              >
                <span>Jump to Interactive Studio Index</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-[#0B1220] dark:text-slate-50 tracking-[-0.035em] leading-[1.03] text-balance">
                  Connect <span className="text-emerald-600 dark:text-emerald-400">·</span> Create{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">·</span>{" "}
                  <span className="text-brand-blue dark:text-blue-400">Grow</span>
                </h1>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Setsuzoku LLP is an Edu Alt Tech Company. We engineer Websites,
                  Applications, UI/UX, Branding, Design, and Digital Solutions
                  tailored around your business needs and long-term scalability.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    href="/pricing"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Pricing
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Request Custom Proposal
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Upfront 6-Discipline Exhibition + Interactive Studio Index Canvas + Outcomes Matrix */}
      <ServicesExhibition />

      {/* Bottom Pricing Guide Contrast Spread */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#080C14]">
        <Container>
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl bg-[#0B1220] dark:bg-[#0E1422] border border-slate-800 p-8 sm:p-12 text-white overflow-hidden">
              <div
                className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
                aria-hidden="true"
              />
              <ArchitecturalCrosshair className="hidden sm:block absolute top-4 left-4 text-slate-700" />
              <ArchitecturalCrosshair className="hidden sm:block absolute bottom-4 right-4 text-slate-700" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <p className="font-mono text-xs text-blue-400">
                    Transparent Scope &amp; Estimates
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Looking for clear website development pricing?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Explore our 2026 Website Development Pricing Guide featuring
                    starting prices from ₹8,000, 13 website types, recommended
                    packages, add-ons, and clear commercial terms.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Button
                    href="/pricing"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Pricing Guide
                  </Button>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2"
                  >
                    <span>See Live Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

