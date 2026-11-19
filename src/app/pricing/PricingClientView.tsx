"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Reveal,
  ArchitecturalCrosshair,
  STUDIO_EASE,
} from "@/components/ui/MotionPrimitives";
import {
  PRICING_HERO,
  STARTING_PRICES,
  WEBSITE_TYPES,
  RECOMMENDED_PACKAGES,
  ADD_ON_SERVICES,
  RECURRING_COSTS,
  PROJECT_TIMELINES,
  COMMERCIAL_TERMS,
  WebsiteTypeItem,
} from "@/data/pricing";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Layers,
  AlertCircle,
  Send,
  Loader2,
  Info,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";

const CATEGORIES = [
  "All Types",
  "Landing & Portfolio",
  "Business & Corporate",
  "E-Commerce",
  "Web Apps & Platforms",
  "Specialist & Content",
] as const;

export default function PricingClientView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Types");
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    company: "",
    websiteType: "Professional business website",
    budget: "₹30,000–₹60,000",
    message: "",
  });
  const [enquiryStatus, setEnquiryStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [enquiryError, setEnquiryError] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  const filteredTypes =
    selectedCategory === "All Types"
      ? WEBSITE_TYPES
      : WEBSITE_TYPES.filter((item) => item.category === selectedCategory);

  const handleSelectPackageForEnquiry = (
    packageName: string,
    price: string
  ) => {
    setEnquiryData((prev) => ({
      ...prev,
      websiteType: `Package: ${packageName} (${price})`,
      budget: price,
      message:
        prev.message ||
        `I am interested in getting started with the ${packageName} package (${price}).`,
    }));
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectTypeForEnquiry = (item: WebsiteTypeItem) => {
    setEnquiryData((prev) => ({
      ...prev,
      websiteType: item.name,
      budget: item.priceRange,
      message:
        prev.message ||
        `I would like to explore developing a ${item.name} (${item.priceRange}).`,
    }));
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enquiryStatus === "submitting") return;
    setEnquiryError("");

    const name = enquiryData.name.trim();
    const email = enquiryData.email.trim();
    const company = enquiryData.company.trim();
    const message = enquiryData.message.trim();

    if (!name || !email || !message) {
      setEnquiryStatus("error");
      setEnquiryError(
        "Please fill out your name, email address, and project description."
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEnquiryStatus("error");
      setEnquiryError("Please enter a valid email address.");
      return;
    }

    setEnquiryStatus("submitting");

    const fullMessage = [
      `[Website Development Inquiry]`,
      `Website Type / Package: ${enquiryData.websiteType}`,
      `Approximate Budget: ${enquiryData.budget}`,
      `Company / Organization: ${company || "Not specified"}`,
      `---`,
      `Project Description:`,
      message,
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          service: "Websites",
          message: fullMessage,
          website: honeypot,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message || `Submission failed with status ${res.status}`
        );
      }

      setEnquiryStatus("success");
      setEnquiryData({
        name: "",
        email: "",
        company: "",
        websiteType: "Professional business website",
        budget: "₹30,000–₹60,000",
        message: "",
      });
      setHoneypot("");
    } catch (err: unknown) {
      setEnquiryStatus("error");
      setEnquiryError(
        err instanceof Error
          ? err.message
          : "Unable to send your inquiry right now. Please try again or email info@setsuzoku.in."
      );
    }
  };

  return (
    <div className="relative bg-white dark:bg-[#080C14] min-h-screen transition-colors duration-200">
      {/* ========================================================================= */}
      {/* SECTION A: ASYMMETRIC COMMERCIAL ARCHITECTURE HERO                        */}
      {/* ========================================================================= */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-blueprint-light mask-radial-fade pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <Reveal className="lg:col-span-7 space-y-6">
              <Badge variant="blue" size="md">
                {PRICING_HERO.badge}
              </Badge>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-[-0.03em] leading-[1.06] text-balance">
                {PRICING_HERO.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal max-w-2xl leading-relaxed">
                {PRICING_HERO.subheading}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  href="#packages"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Packages
                </Button>
                <Button href="#enquiry" variant="outline" size="lg">
                  Discuss Your Project
                </Button>
              </div>
            </Reveal>

            {/* Right: Scope Note Advisory Panel */}
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0E1422] p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-blue dark:text-blue-400">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Important Scope Note</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                    2026 Edition
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {PRICING_HERO.disclaimer}
                </p>
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <a
                    href="#starting-prices"
                    className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                  >
                    01. Starting Prices
                  </a>
                  <a
                    href="#website-types"
                    className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                  >
                    02. 13 Types
                  </a>
                  <a
                    href="#packages"
                    className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                  >
                    03. Packages
                  </a>
                  <a
                    href="#add-ons"
                    className="hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                  >
                    04. Add-ons
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-24 space-y-24 md:space-y-32">
        {/* ========================================================================= */}
        {/* SECTION B: SWISS STARTING PRICES RIBBON                                   */}
        {/* ========================================================================= */}
        <section id="starting-prices" className="space-y-8 scroll-mt-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2.5">
                <Badge variant="blue" size="sm">
                  Indicative Benchmarks
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                  Website Project Starting Prices
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Labeled as baseline starting prices, not fixed final quotations.
                Scope and integrations determine final investment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              {STARTING_PRICES.map((item) => (
                <div
                  key={item.name}
                  className={clsx(
                    "p-6 border-r border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 flex flex-col justify-between group relative",
                    item.highlight
                      ? "bg-[#0B1220] dark:bg-[#131B2E] text-white"
                      : "bg-white dark:bg-[#0E1422] hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E]/70"
                  )}
                >
                  {item.highlight && (
                    <div
                      className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-emerald-400"
                      aria-hidden="true"
                    />
                  )}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={clsx(
                          "text-[11px] font-mono font-medium",
                          item.highlight
                            ? "text-slate-400"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        Starting from
                      </span>
                      {item.highlight && (
                        <span className="text-[11px] font-mono font-semibold text-emerald-400">
                          Popular
                        </span>
                      )}
                    </div>

                    <div
                      className={clsx(
                        "font-display text-2xl sm:text-[26px] font-extrabold tabular-nums tracking-tight transition-colors",
                        item.highlight
                          ? "text-white"
                          : "text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400"
                      )}
                    >
                      {item.price}
                    </div>

                    <h3
                      className={clsx(
                        "text-sm font-bold leading-snug",
                        item.highlight
                          ? "text-slate-100"
                          : "text-[#0B1220] dark:text-slate-100"
                      )}
                    >
                      {item.name}
                    </h3>

                    <p
                      className={clsx(
                        "text-xs leading-relaxed font-normal",
                        item.highlight
                          ? "text-slate-400"
                          : "text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={clsx(
                      "pt-4 mt-5 border-t",
                      item.highlight
                        ? "border-slate-800"
                        : "border-slate-200/70 dark:border-slate-800"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectPackageForEnquiry(item.name, item.price)
                      }
                      className={clsx(
                        "text-xs font-semibold flex items-center justify-between w-full transition-colors cursor-pointer",
                        item.highlight
                          ? "text-emerald-400 hover:text-emerald-300"
                          : "text-brand-blue dark:text-blue-400 hover:text-brand-blue-hover dark:hover:text-blue-300"
                      )}
                    >
                      <span>Check Scope</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* SECTION C: 13 WEBSITE TYPES SPECIFICATION CATALOG                         */}
        {/* ========================================================================= */}
        <section id="website-types" className="space-y-8 scroll-mt-24">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
              <div className="space-y-2.5 max-w-2xl">
                <Badge variant="green" size="sm">
                  Comprehensive Spectrum
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                  Website Types &amp; Indicative Price Ranges
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Explore transparent price bands and core included deliverables
                  tailored to different digital operational goals.
                </p>
              </div>

              {/* Animated Segmented Category Filter */}
              <div
                className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100/90 dark:bg-[#0E1422] border border-slate-200/80 dark:border-slate-800"
                role="tablist"
                aria-label="Filter website types by category"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(cat)}
                      className={clsx(
                        "relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap",
                        isActive
                          ? "text-white dark:text-[#0B1220]"
                          : "text-slate-600 dark:text-slate-400 hover:text-[#0B1220] dark:hover:text-slate-100"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pricing-type-tab"
                          transition={{ duration: 0.22, ease: STUDIO_EASE }}
                          className="absolute inset-0 rounded-lg bg-[#0B1220] dark:bg-white"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* 2-Column Architectural Specification Catalog */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
            <AnimatePresence mode="popLayout">
              {filteredTypes.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: STUDIO_EASE }}
                  className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E]/60 transition-colors duration-150 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                      <span className="font-mono text-sm sm:text-base font-bold text-brand-blue dark:text-blue-400 tabular-nums shrink-0">
                        {item.priceRange}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.scope}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 space-y-2">
                      <span className="block text-xs font-mono text-slate-400 dark:text-slate-500">
                        Included Scope Highlights
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {item.deliverables.map((d) => (
                          <div
                            key={d}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      Setsuzoku Delivery
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectTypeForEnquiry(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220] dark:text-slate-200 hover:text-brand-blue dark:hover:text-blue-400 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <span>Enquire This Type</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D: RECOMMENDED PACKAGES — HIGH-CONTRAST FEATURED TIER             */}
        {/* ========================================================================= */}
        <section id="packages" className="space-y-10 scroll-mt-24">
          <Reveal>
            <div className="max-w-3xl space-y-3">
              <Badge variant="blue" size="sm">
                Turnkey Tiers
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                Recommended Packages
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Carefully structured package tiers designed around transparent
                scope, verified milestones, and reliable production handovers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {RECOMMENDED_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={clsx(
                    "p-6 sm:p-7 rounded-2xl border transition-colors duration-200 flex flex-col justify-between relative overflow-hidden",
                    pkg.popular
                      ? "bg-[#0B1220] dark:bg-[#111A2E] border-slate-800 dark:border-blue-500/60 text-white shadow-xl shadow-slate-900/15 dark:shadow-none"
                      : "bg-[#F8FAFC]/80 dark:bg-[#0E1422] border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#131B2E]"
                  )}
                >
                  {pkg.popular && (
                    <div
                      className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-blue via-blue-400 to-emerald-400"
                      aria-hidden="true"
                    />
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-2 min-h-[24px]">
                        <h3
                          className={clsx(
                            "font-display text-xl font-bold",
                            pkg.popular
                              ? "text-white"
                              : "text-[#0B1220] dark:text-white"
                          )}
                        >
                          {pkg.name}
                        </h3>
                        {pkg.badge && (
                          <span
                            className={clsx(
                              "text-[11px] font-mono font-semibold shrink-0",
                              pkg.popular
                                ? "text-emerald-400"
                                : "text-slate-500 dark:text-slate-400"
                            )}
                          >
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={clsx(
                          "text-xs min-h-[34px] leading-relaxed",
                          pkg.popular
                            ? "text-slate-300"
                            : "text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {pkg.summary}
                      </p>
                    </div>

                    <div
                      className={clsx(
                        "border-y py-4",
                        pkg.popular
                          ? "border-slate-800"
                          : "border-slate-200/80 dark:border-slate-800"
                      )}
                    >
                      <span
                        className={clsx(
                          "text-[11px] font-mono block",
                          pkg.popular
                            ? "text-slate-400"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        Investment
                      </span>
                      <div
                        className={clsx(
                          "font-display text-3xl font-extrabold mt-1 tabular-nums tracking-tight",
                          pkg.popular
                            ? "text-white"
                            : "text-[#0B1220] dark:text-white"
                        )}
                      >
                        {pkg.price}
                      </div>
                      <span
                        className={clsx(
                          "text-[11px] font-medium",
                          pkg.popular
                            ? "text-slate-400"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        Excluding GST
                      </span>
                    </div>

                    {/* Included features */}
                    <div className="space-y-2.5">
                      <span
                        className={clsx(
                          "text-[11px] font-mono block",
                          pkg.popular
                            ? "text-slate-400"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        Package Inclusions
                      </span>
                      <ul
                        className={clsx(
                          "space-y-2.5 text-xs sm:text-[13px]",
                          pkg.popular
                            ? "text-slate-200"
                            : "text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2">
                            <CheckCircle2
                              className={clsx(
                                "w-3.5 h-3.5 shrink-0 mt-0.5",
                                pkg.popular
                                  ? "text-emerald-400"
                                  : "text-brand-green dark:text-emerald-400"
                              )}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Revisions & Support Meta (Unboxed hairline separation) */}
                    <div
                      className={clsx(
                        "pt-4 border-t space-y-1.5 text-xs",
                        pkg.popular
                          ? "border-slate-800 text-slate-300"
                          : "border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <div
                        className={clsx(
                          "flex items-center gap-1.5 font-semibold",
                          pkg.popular
                            ? "text-white"
                            : "text-[#0B1220] dark:text-slate-200"
                        )}
                      >
                        <Clock
                          className={clsx(
                            "w-3.5 h-3.5 shrink-0",
                            pkg.popular
                              ? "text-blue-400"
                              : "text-brand-blue dark:text-blue-400"
                          )}
                        />
                        <span>{pkg.revisions}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck
                          className={clsx(
                            "w-3.5 h-3.5 shrink-0",
                            pkg.popular
                              ? "text-emerald-400"
                              : "text-brand-green dark:text-emerald-400"
                          )}
                        />
                        <span>{pkg.support}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6">
                    <Button
                      type="button"
                      onClick={() =>
                        handleSelectPackageForEnquiry(pkg.name, pkg.price)
                      }
                      variant={pkg.popular ? "primary" : "outline"}
                      size="md"
                      fullWidth
                    >
                      {pkg.ctaText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            * All packages are grounded in clear milestone approvals. No hidden
            costs or unverified delivery guarantees.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* SECTION E: MODULAR ADD-ON SERVICES — SWISS RATE-CARD LEDGER               */}
        {/* ========================================================================= */}
        <section id="add-ons" className="space-y-8 scroll-mt-24">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2.5">
                <Badge variant="blue" size="sm">
                  Modular Enhancements
                </Badge>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                  Optional Add-on Services
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Expand your baseline package with standalone capabilities,
                design enhancements, and technical integrations.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              {ADD_ON_SERVICES.map((addon) => (
                <div
                  key={addon.name}
                  className="px-6 py-5 border-r border-b border-slate-200 dark:border-slate-800 hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E]/60 transition-colors duration-150 flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                      {addon.category}
                    </span>
                    <h4 className="text-sm sm:text-[15px] font-bold text-[#0B1220] dark:text-slate-100">
                      {addon.name}
                    </h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-brand-blue dark:text-blue-400 tabular-nums shrink-0 text-right">
                    {addon.priceRange}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 max-w-3xl">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Third-Party Notice:</strong> Third-party subscription
              fees, API usage charges, cloud hosting tiers, payment gateway
              transaction percentages, and custom domain registrations are
              billed separately at provider cost where applicable.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION F: ANNUAL AND RECURRING COSTS — UNIFIED 3-COLUMN LEDGER           */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <Reveal>
            <div className="max-w-2xl space-y-2.5">
              <Badge variant="green" size="sm">
                Operational Planning
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                Annual &amp; Recurring Operating Costs
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Planning estimates for hosting, domains, infrastructure, and
                ongoing retainers. These are kept entirely separate from
                one-time design &amp; development charges.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              {/* Column 1: Infrastructure */}
              <div className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <Layers className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                  <h3 className="font-display font-bold text-base text-[#0B1220] dark:text-white">
                    Infrastructure &amp; Domains
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {RECURRING_COSTS.filter(
                    (r) => r.type === "Infrastructure"
                  ).map((item) => (
                    <li
                      key={item.item}
                      className="flex justify-between items-baseline text-xs sm:text-sm gap-3"
                    >
                      <span className="text-slate-600 dark:text-slate-300">
                        {item.item}
                      </span>
                      <span className="font-mono font-semibold text-[#0B1220] dark:text-white text-right shrink-0 tabular-nums">
                        {item.cost}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Maintenance & Retainers */}
              <div className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <ShieldCheck className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0" />
                  <h3 className="font-display font-bold text-base text-[#0B1220] dark:text-white">
                    Maintenance &amp; Retainers
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {RECURRING_COSTS.filter(
                    (r) => r.type === "Maintenance & Retainers"
                  ).map((item) => (
                    <li
                      key={item.item}
                      className="flex justify-between items-baseline text-xs sm:text-sm gap-3"
                    >
                      <span className="text-slate-600 dark:text-slate-300">
                        {item.item}
                      </span>
                      <span className="font-mono font-semibold text-[#0B1220] dark:text-white text-right shrink-0 tabular-nums">
                        {item.cost}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Third Party */}
              <div className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between bg-[#F8FAFC]/60 dark:bg-[#131B2E]/35">
                <div>
                  <div className="flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
                    <DollarSign className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <h3 className="font-display font-bold text-base text-[#0B1220] dark:text-white">
                      Third-Party Subscriptions
                    </h3>
                  </div>
                  <div className="pt-4 space-y-3">
                    {RECURRING_COSTS.filter(
                      (r) => r.type === "Third-Party"
                    ).map((item) => (
                      <div key={item.item} className="space-y-1">
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 block">
                          {item.item}
                        </span>
                        <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 block">
                          {item.cost}
                        </span>
                      </div>
                    ))}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                      Includes SaaS platform subscriptions, email marketing
                      tiers, paid fonts/plugins, and payment gateway
                      percentages.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Billed directly by external vendors
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* SECTION G: PROJECT TIMELINES — HORIZONTAL SPRINT RIBBON                   */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <Reveal>
            <div className="max-w-2xl space-y-2.5">
              <Badge variant="blue" size="sm">
                Delivery Horizons
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                Indicative Project Timelines
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Realistic production schedules based on prompt content readiness
                and collaborative milestone feedback.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              {PROJECT_TIMELINES.map((tl, idx) => (
                <div
                  key={tl.projectType}
                  className="p-6 sm:p-7 border-r border-b border-slate-200 dark:border-slate-800 hover:bg-[#F8FAFC] dark:hover:bg-[#131B2E]/60 transition-colors duration-200 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500">
                      <span className="tabular-nums">0{idx + 1}</span>
                      <Clock className="w-4 h-4 text-brand-blue dark:text-blue-400" />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0B1220] dark:text-white">
                      {tl.projectType}
                    </h3>
                    <div className="font-display text-2xl font-extrabold text-brand-blue dark:text-blue-400 tabular-nums">
                      {tl.duration}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {tl.notes}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Sprint Milestone Model
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="bg-[#F8FAFC] dark:bg-[#0E1422] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            * Timelines commence only after verified receipt of approved copy,
            high-res media, system credentials, and initial milestone advance.
            These estimates are planning benchmarks and not guaranteed legal
            deadlines.
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION H: COMMERCIAL TERMS — 2x2 GOVERNANCE MATRIX                       */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <Reveal>
            <div className="max-w-2xl space-y-2.5">
              <Badge variant="blue" size="sm">
                Transparent Governance
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                Commercial Terms &amp; Project Policies
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Clear operating boundaries designed to establish mutual trust,
                predictable outcomes, and smooth production delivery.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-[#0E1422]">
              {COMMERCIAL_TERMS.map((term, tIdx) => (
                <div
                  key={term.title}
                  className="p-6 sm:p-8 border-r border-b border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                      <h3 className="font-display text-base font-bold text-[#0B1220] dark:text-white">
                        {term.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                      0{tIdx + 1}
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {term.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-brand-blue dark:text-blue-400 font-bold mt-0.5">
                          ·
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ========================================================================= */}
        {/* SECTION I: PROJECT ENQUIRY STUDIO (#enquiry)                              */}
        {/* ========================================================================= */}
        <Reveal>
          <section
            id="enquiry"
            className="rounded-2xl bg-[#070B13] dark:bg-[#0B101C] text-white p-7 sm:p-10 md:p-14 border border-slate-800 relative overflow-hidden scroll-mt-24"
          >
            <div
              className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-blue via-blue-400 to-emerald-400"
              aria-hidden="true"
            />
            <ArchitecturalCrosshair className="hidden sm:block absolute top-5 left-5 text-slate-700" />
            <ArchitecturalCrosshair className="hidden sm:block absolute bottom-5 right-5 text-slate-700" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Narrative */}
              <div className="lg:col-span-5 space-y-6 lg:pt-4">
                <Badge variant="navy" size="sm">
                  Get a Personalized Quotation
                </Badge>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Let&apos;s build something useful.
                </h2>

                <p className="text-slate-300 text-base leading-relaxed">
                  Tell us what you&apos;re building, and we&apos;ll help define
                  the right scope and budget.
                </p>

                <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>No obligation technical discovery</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Transparent milestone quotation valid for 30 days
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Direct response from our engineering and project team
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800">
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Or use standard contact form directly</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Interactive Form */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0E1422] text-[#0B1220] dark:text-slate-100 p-6 sm:p-8 md:p-9 rounded-2xl border border-slate-200 dark:border-slate-800">
                {enquiryStatus === "success" ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-brand-green dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#0B1220] dark:text-white">
                      Inquiry Received!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for sharing your project goals. The Setsuzoku
                      engineering and project coordination team will review your
                      requirements and follow up with a tailored scope
                      breakdown.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEnquiryStatus("idle")}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleEnquirySubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <h3 className="font-display text-lg font-bold text-[#0B1220] dark:text-white border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
                      Project Scope &amp; Budget Details
                    </h3>

                    {enquiryStatus === "error" && (
                      <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{enquiryError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="enquiry-name"
                          className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="enquiry-name"
                          required
                          disabled={enquiryStatus === "submitting"}
                          value={enquiryData.name}
                          onChange={(e) =>
                            setEnquiryData({
                              ...enquiryData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Alex Morgan"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="enquiry-email"
                          className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="enquiry-email"
                          required
                          disabled={enquiryStatus === "submitting"}
                          value={enquiryData.email}
                          onChange={(e) =>
                            setEnquiryData({
                              ...enquiryData,
                              email: e.target.value,
                            })
                          }
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Company */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="enquiry-company"
                          className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                        >
                          Business or Organisation
                        </label>
                        <input
                          type="text"
                          id="enquiry-company"
                          disabled={enquiryStatus === "submitting"}
                          value={enquiryData.company}
                          onChange={(e) =>
                            setEnquiryData({
                              ...enquiryData,
                              company: e.target.value,
                            })
                          }
                          placeholder="Organization or project name"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>

                      {/* Website Type */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="enquiry-type"
                          className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                        >
                          Website Type / Package
                        </label>
                        <select
                          id="enquiry-type"
                          disabled={enquiryStatus === "submitting"}
                          value={enquiryData.websiteType}
                          onChange={(e) =>
                            setEnquiryData({
                              ...enquiryData,
                              websiteType: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <optgroup label="Recommended Packages">
                            {RECOMMENDED_PACKAGES.map((p) => (
                              <option
                                key={p.id}
                                value={`Package: ${p.name} (${p.price})`}
                              >
                                {p.name} ({p.price})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Website Project Types">
                            {WEBSITE_TYPES.map((t) => (
                              <option key={t.id} value={t.name}>
                                {t.name} ({t.priceRange})
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    {/* Budget Bracket */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="enquiry-budget"
                        className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                      >
                        Approximate Budget
                      </label>
                      <select
                        id="enquiry-budget"
                        disabled={enquiryStatus === "submitting"}
                        value={enquiryData.budget}
                        onChange={(e) =>
                          setEnquiryData({
                            ...enquiryData,
                            budget: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="₹8,000–₹18,000">
                          ₹8,000–₹18,000 (Landing Page / Basic)
                        </option>
                        <option value="₹18,000–₹35,000">
                          ₹18,000–₹35,000 (Launch / Starter Business)
                        </option>
                        <option value="₹35,000–₹65,000">
                          ₹35,000–₹65,000 (Growth / Online Store)
                        </option>
                        <option value="₹65,000–₹1,20,000">
                          ₹65,000–₹1,20,000 (Premium / Corporate)
                        </option>
                        <option value="₹1,20,000–₹2,50,000+">
                          ₹1,20,000–₹2,50,000+ (Custom Web App / Portal)
                        </option>
                        <option value="₹2,50,000–₹8,00,000+">
                          ₹2,50,000–₹8,00,000+ (SaaS MVP / Platform)
                        </option>
                      </select>
                    </div>

                    {/* Project description */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="enquiry-desc"
                        className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-400"
                      >
                        Project Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="enquiry-desc"
                        required
                        rows={3}
                        disabled={enquiryStatus === "submitting"}
                        value={enquiryData.message}
                        onChange={(e) =>
                          setEnquiryData({
                            ...enquiryData,
                            message: e.target.value,
                          })
                        }
                        placeholder="Outline your project requirements, target pages, features, or preferred timeline..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    {/* Anti-spam honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="hp_website">Website</label>
                      <input
                        type="text"
                        id="hp_website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Privacy Notice */}
                    <div className="flex items-start gap-2 pt-1 pb-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        By submitting this project inquiry, you acknowledge our{" "}
                        <Link
                          href="/privacy"
                          className="text-brand-blue dark:text-blue-400 font-semibold hover:underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and agree to our{" "}
                        <Link
                          href="/terms"
                          className="text-brand-blue dark:text-blue-400 font-semibold hover:underline"
                        >
                          Terms and Conditions
                        </Link>
                        . Your details are handled confidentially to review
                        requirements and prepare your quote.
                      </span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={enquiryStatus === "submitting"}
                      icon={
                        enquiryStatus === "submitting" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )
                      }
                    >
                      {enquiryStatus === "submitting"
                        ? "Sending Details..."
                        : "Submit Project Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}
