import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { InteractiveGlobe } from "@/components/ui/InteractiveGlobe";
import { InteractiveCpu } from "@/components/ui/InteractiveCpu";
import { InteractiveCode } from "@/components/ui/InteractiveCode";
import { siteConfig } from "@/data/site";
import {
  ArrowRight,
  Users,
  Sparkles,
  PhoneCall,
  Mail,
  Award,
  Zap,
  ShieldCheck,
} from "lucide-react";

import type { Metadata } from "next";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Setsuzoku LLP — Software & Edu Alt Tech Company in Kakinada",
  description:
    "Discover Setsuzoku LLP, an Edu Alt Tech and software engineering company founded by Uma Krishna Kanth Chokkapu in Kakinada, Andhra Pradesh. We connect ideas to technology through custom software, web applications, and digital systems.",
  keywords: [
    "About Setsuzoku LLP",
    "Software Company in Kakinada",
    "Tech Company in Kakinada",
    "Web Development Company in Kakinada",
    "IT Company in Kakinada",
    "Edu Alt Tech Company",
    "Uma Krishna Kanth Chokkapu",
    "Software Agency Andhra Pradesh",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Setsuzoku LLP — Software & Edu Alt Tech Company in Kakinada",
    description:
      "Discover Setsuzoku LLP, an Edu Alt Tech and software engineering company founded by Uma Krishna Kanth Chokkapu in Kakinada, Andhra Pradesh.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Setsuzoku LLP — Software & Edu Alt Tech Company in Kakinada",
    description:
      "Discover Setsuzoku LLP, an Edu Alt Tech and software engineering company founded by Uma Krishna Kanth Chokkapu in Kakinada, Andhra Pradesh.",
  },
};

export default function AboutPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "About", item: "/about" },
  ]);

  return (
    <div className="bg-white dark:bg-[#080C14] transition-colors duration-200">
      <JsonLd data={breadcrumbData} />

      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <Badge variant="blue" size="md">
              ABOUT SETSUZOKU LLP
            </Badge>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08] text-balance">
              An Edu Alt Tech Company —{" "}
              <span className="text-brand-blue dark:text-blue-400">Connect • Create • Grow.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl">
              Setsuzoku LLP was founded by{" "}
              <strong className="text-[#0B1220] dark:text-slate-100 font-semibold">
                Uma Krishna Kanth Chokkapu
              </strong>{" "}
              to bridge the gap between complex ideas, alternate technologies, and flawless digital execution. We deliver{" "}
              <strong className="text-[#0B1220] dark:text-slate-100 font-semibold">
                Websites, Applications, UI/UX, Branding, Design, and Digital Solutions
              </strong>
              .
            </p>

            {/* Key Value Pillars Bar */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 border-t border-slate-200/90 dark:border-slate-800 gap-4">
              <div className="bg-slate-50/90 dark:bg-[#0E1422] p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    DESCRIPTOR
                  </p>
                  <p className="text-sm font-bold text-[#0B1220] dark:text-white">
                    An Edu Alt Tech Company
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 dark:bg-[#0E1422] p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 text-brand-green dark:text-emerald-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    OPERATING CREED
                  </p>
                  <p className="text-sm font-bold text-[#0B1220] dark:text-white">
                    Connect • Create • Grow
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 dark:bg-[#0E1422] p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    OFFERINGS
                  </p>
                  <p className="text-sm font-bold text-[#0B1220] dark:text-white">
                    6 Core Capabilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-24 space-y-24 md:space-y-32">
        {/* ============================================================ */}
        {/* COMPANY ORIGINS & FOUNDER SPOTLIGHT                          */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Company Story Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0E1422] p-7 sm:p-10 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-blue dark:text-blue-400">
                <Users className="w-5 h-5 shrink-0" />
                <h2 className="font-display text-2xl font-bold text-[#0B1220] dark:text-white">
                  What Setsuzoku (接続) Means
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                In Japanese,{" "}
                <strong className="text-[#0B1220] dark:text-white font-semibold">
                  Setsuzoku (接続)
                </strong>{" "}
                means <em>connection</em> or <em>link</em>. At Setsuzoku LLP, we act as the vital bridge linking business goals, user needs, and modern software engineering.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                As an{" "}
                <strong className="text-[#0B1220] dark:text-white font-semibold">
                  Edu Alt Tech Company
                </strong>
                , we build alternate technology educational software, enterprise applications, responsive web portals, and custom digital transformation workflows for organizations worldwide.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Badge variant="blue" size="sm">Edu Alt Tech</Badge>
              <Badge variant="green" size="sm">Connect • Create • Grow</Badge>
              <Badge variant="slate" size="sm">Setsuzoku LLP</Badge>
            </div>
          </div>

          {/* Founder Leadership Spotlight Card */}
          <div className="lg:col-span-5 bg-[#0B1220] dark:bg-[#0E1422] text-white p-7 sm:p-10 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div
              className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green"
              aria-hidden="true"
            />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-mono font-semibold text-blue-400 uppercase tracking-[0.14em]">
                <span className="h-[1.5px] w-4 bg-blue-500" aria-hidden="true" />
                <span>FOUNDER LEADERSHIP</span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                  {siteConfig.founder.name}
                </h3>
                <p className="text-sm font-semibold text-blue-400 mt-1">
                  {siteConfig.founder.title}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Guiding Setsuzoku LLP&apos;s strategic vision in digital innovation, alternate technology systems, and high-impact product engineering.
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-6 border-t border-slate-800 space-y-3 relative z-10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{siteConfig.contact.email}</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="px-3.5 py-2.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 text-xs font-semibold text-blue-300 hover:text-white transition-colors flex items-center justify-center gap-2 border border-blue-500/30 shrink-0"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span>{siteConfig.contact.phoneFormatted}</span>
                </a>
              </div>

              <Link
                href="/team/uma-krishna-kanth-chokkapu"
                className="w-full py-2 text-center text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Founder Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* OUR CORE CREED: CONNECT • CREATE • GROW                      */}
        {/* ============================================================ */}
        <section className="space-y-10">
          <SectionHeading
            badge="OUR CORE CREED"
            badgeVariant="green"
            title="Connect • Create • Grow"
            subtitle="Three foundational principles guiding every solution engineered at Setsuzoku LLP."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
            {/* Card 1: Connect */}
            <div className="group p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-[#131B2E] transition-colors duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                  <InteractiveGlobe className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                  1. Connect
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We connect vision with technical execution, bridging strategic requirements into scalable cloud architectures and software blueprints.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-brand-blue dark:text-blue-400 font-semibold tracking-wider">
                <span>STRATEGY &amp; ARCHITECTURE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 2: Create */}
            <div className="group p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-[#131B2E] transition-colors duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 text-brand-green dark:text-emerald-400 flex items-center justify-center">
                  <InteractiveCode className="w-6 h-6 text-brand-green dark:text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-brand-green dark:group-hover:text-emerald-400 transition-colors">
                  2. Create
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We craft polished Websites, Applications, UI/UX, Branding, Design, and Digital Solutions adhering to rigorous quality standards.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-brand-green dark:text-emerald-400 font-semibold tracking-wider">
                <span>DEVELOPMENT &amp; DESIGN</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 3: Grow */}
            <div className="group p-7 sm:p-8 border-r border-b border-slate-200/90 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-[#131B2E] transition-colors duration-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                  <InteractiveCpu className="w-6 h-6 text-brand-blue dark:text-blue-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors">
                  3. Grow
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We engineer adaptable systems that scale cleanly, automate workflows, and drive ongoing long-term business performance.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-brand-blue dark:text-blue-400 font-semibold tracking-wider">
                <span>OPTIMIZATION &amp; SCALING</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* OUR CORE VALUES & ENGINEERING ETHOS                          */}
        {/* ============================================================ */}
        <section className="space-y-10">
          <SectionHeading
            badge="OUR ENGINEERING VALUES"
            badgeVariant="blue"
            title="Why Ambitious Teams Choose Setsuzoku"
            subtitle="Built on technical depth, alternate technology vision, and transparent partnership."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50/70 dark:bg-[#0E1422] p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Edu Alt Tech Vision
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                We pioneer alternate technology systems and educational software workflows designed to solve real operational challenges without legacy bloat.
              </p>
            </div>

            <div className="bg-slate-50/70 dark:bg-[#0E1422] p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 text-brand-green dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Engineering Quality
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Every line of code, API schema, and UI component is crafted with rigorous standards for speed, accessibility, security, and long-term maintainability.
              </p>
            </div>

            <div className="bg-slate-50/70 dark:bg-[#0E1422] p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                Direct Collaboration
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Work directly with founder leadership and principal product engineers. No middle layers, no miscommunications — just direct alignment.
              </p>
            </div>
          </div>

          {/* Quick Link Card to Services & Work */}
          <div className="bg-[#0B1220] dark:bg-[#0E1422] text-white p-7 sm:p-10 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h4 className="font-display text-xl font-bold text-white">
                Looking for our 6 Core Service Offerings?
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explore our full breakdown of Websites, Applications, UI/UX, Branding, Design, and Digital Solutions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button href="/services" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Services
              </Button>
              <Button
                href="/work"
                variant="outline"
                size="md"
                className="border-slate-700 bg-transparent dark:bg-transparent text-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800 hover:border-slate-500 hover:text-white"
              >
                View Work
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* GLOBAL PERSPECTIVE & DIRECT CONTACT CTA                      */}
        {/* ============================================================ */}
        <section className="bg-slate-50 dark:bg-[#0E1422] p-7 sm:p-12 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-brand-blue dark:text-blue-400">
              <InteractiveGlobe variant="globe2" className="w-5 h-5 text-brand-blue dark:text-blue-400" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em]">
                GLOBAL ENGINEERING COLLABORATION
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              Ready to connect your ideas to technology?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Partner with <strong className="text-[#0B1220] dark:text-white font-semibold">Setsuzoku LLP</strong>. Reach out directly via phone or email to start your project conversation.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                <span>{siteConfig.contact.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-1.5 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Collaborate with Us
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
