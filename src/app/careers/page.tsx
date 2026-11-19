import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InteractiveCode } from "@/components/ui/InteractiveCode";
import { ArrowRight, Heart, Lightbulb } from "lucide-react";

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Careers & Engineering Culture — Setsuzoku LLP",
  description:
    "Build what comes next. Learn about Setsuzoku LLP's engineering culture, software values, and collaborative environment in the Edu Alt Tech space.",
  keywords: [
    "Setsuzoku Careers",
    "Software Engineering Jobs",
    "Engineering Culture",
    "Tech Company Values",
    "Remote Engineering",
    "Setsuzoku LLP",
  ],
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Engineering Culture — Setsuzoku LLP",
    description:
      "Build what comes next. Learn about Setsuzoku LLP's engineering culture and collaborative environment.",
    url: `${siteConfig.url}/careers`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Engineering Culture — Setsuzoku LLP",
    description:
      "Build what comes next. Learn about Setsuzoku LLP's engineering culture.",
  },
};

export default function CareersPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Careers", item: "/careers" },
  ]);

  return (
    <div className="bg-white dark:bg-[#080C14] transition-colors duration-200">
      <JsonLd data={breadcrumbData} />

      {/* Hero */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <Badge variant="blue" size="md">
              CAREERS &amp; CULTURE
            </Badge>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08] text-balance">
              Build what{" "}
              <span className="text-brand-blue dark:text-blue-400">comes next.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
              At Setsuzoku LLP, we value engineering craft, technical curiosity, and direct impact over corporate bureaucracy. We build software that matters.
            </p>
            <div className="pt-1">
              <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Talk to Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-24 space-y-20">
        {/* Culture Pillars */}
        <section className="space-y-10">
          <SectionHeading
            badge="OUR ENGINEERING CULTURE"
            badgeVariant="green"
            title="How we work together."
            subtitle="Our culture is engineered around trust, craft, and solving real operational challenges."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
            <div className="p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                <InteractiveCode className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Pride in Engineering
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We believe in clean code, maintainable architecture, and building systems that stand up to real production pressure.
              </p>
            </div>

            <div className="p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 text-brand-green dark:text-emerald-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Continuous Learning
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Technology evolves rapidly. We encourage deep technical exploration, peer code reviews, and constant skill development.
              </p>
            </div>

            <div className="p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Asynchronous Clarity
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We respect focus time. We prioritize clear written communication, thoughtful documentation, and flexible remote work.
              </p>
            </div>
          </div>
        </section>

        {/* General Application Banner */}
        <section className="bg-[#0B1220] dark:bg-[#0E1422] text-white rounded-2xl border border-slate-800 p-8 sm:p-12 text-left space-y-6 relative overflow-hidden">
          <div
            className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green"
            aria-hidden="true"
          />
          <div className="inline-flex items-center gap-2.5 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-400">
            <span className="h-[1.5px] w-5 bg-blue-500" aria-hidden="true" />
            <span>OPEN COLLABORATIONS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interested in working with Setsuzoku?
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            While we are not currently posting open headcount roles, we are always eager to connect with exceptional senior engineers, architects, and technical specialists.
          </p>
          <div className="pt-1">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Reach Out &amp; Introduce Yourself
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
