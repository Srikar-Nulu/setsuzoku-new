"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Phone, Globe, MapPin, ArrowUpRight } from "lucide-react";
import {
  GmailHoverIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/components/ui/Icons";
import { TRUSTED_ORGANIZATIONS } from "@/data/trustedOrganizations";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return null;
  }

  return (
    <footer className="relative bg-[#070B13] dark:bg-[#05080F] text-slate-300 border-t border-slate-800/90 mt-auto overflow-hidden">
      {/* Subtle architectural hairline grid across top band */}
      <div
        className="absolute inset-x-0 top-0 h-72 bg-blueprint-dark mask-radial-fade pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-16 sm:pt-20 pb-12">
        {/* Top Studio Sign-Off & Direct Navigation Rail */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-slate-800/80">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3.5">
              <Link href="/" className="inline-block shrink-0">
                <div className="bg-white px-3 py-2 rounded-lg inline-flex items-center">
                  <Image
                    src="/brand/setsuzoku-logo.png"
                    alt="Setsuzoku LLP Logo"
                    width={280}
                    height={80}
                    className="h-9 sm:h-10 w-auto object-contain"
                  />
                </div>
              </Link>
              <span
                className="h-6 w-px bg-slate-800 hidden sm:inline-block"
                aria-hidden="true"
              />
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                {siteConfig.descriptor} · Kakinada, AP
              </span>
            </div>

            <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed">
              Setsuzoku LLP is an Edu Alt Tech and software company headquartered
              in Kakinada, Andhra Pradesh. We connect ideas to technology,
              delivering custom web applications, design systems, and digital
              solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 shrink-0">
            <div className="flex items-center gap-3 text-xs font-mono font-medium text-slate-400">
              <span className="text-blue-400">Connect</span>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <span className="text-emerald-400">Create</span>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <span className="text-amber-400">Grow</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#070B13] hover:bg-slate-100 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Main Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-14 border-b border-slate-800/80">
          {/* MSME Registration Identity Block */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-mono text-xs font-medium text-slate-400">
              Official Registration
            </h4>
            <div className="p-4 sm:p-5 rounded-xl bg-[#0C1322] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center gap-4 max-w-md">
              <div className="bg-white p-2 rounded-lg shrink-0 self-start sm:self-center flex items-center justify-center overflow-hidden">
                <Image
                  src="/brand/msme-logo.jpg"
                  alt="Ministry of MSME, Government of India"
                  width={220}
                  height={220}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <span className="text-[11px] font-mono font-medium text-emerald-400 block leading-tight">
                  {siteConfig.registration.msme.category}
                </span>
                <p className="text-sm font-display font-bold text-slate-100 tracking-tight">
                  {siteConfig.registration.msme.enterprise}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {siteConfig.registration.msme.authority}
                </p>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-medium text-slate-400">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-medium text-slate-400">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerLinks.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-300 hover:text-white transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-medium text-slate-400">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="tabular-nums">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
                >
                  <GmailHoverIcon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Kakinada, Andhra Pradesh, India</span>
                </span>
              </li>
              <li>
                <a
                  href="https://setsuzoku.in"
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
                >
                  <Globe className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                  <span>www.setsuzoku.in</span>
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4">
                {siteConfig.contact.linkedin && (
                  <a
                    href={siteConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                    aria-label="Setsuzoku LinkedIn Company Page"
                  >
                    <LinkedInIcon className="w-4 h-4 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {siteConfig.contact.instagram && (
                  <a
                    href={siteConfig.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-300 hover:text-slate-100 transition-colors"
                    aria-label="Setsuzoku Instagram Page"
                  >
                    <InstagramIcon className="w-4 h-4 shrink-0" />
                    <span>
                      {siteConfig.contact.instagramHandle || "@setsuzoku_llp"}
                    </span>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Credibility Ledger: Trusted By & Professional Engagements */}
        <div className="py-10 border-b border-slate-800/80 space-y-8">
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h4 className="font-mono text-xs font-medium text-slate-200">
                Trusted By
              </h4>
              <p className="text-xs text-slate-400">
                Empowering institutions and educational enterprises with digital
                solutions
              </p>
            </div>

            {/* 5 Verified Organization Logos — strictly contained */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-center">
              {TRUSTED_ORGANIZATIONS.map((org) => (
                <div
                  key={org.name}
                  className="rounded-lg bg-white/[0.97] border border-slate-800/40 px-4 py-3 h-20 flex items-center justify-center overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
                  title={org.name}
                  aria-label={org.name}
                >
                  <Image
                    src={org.logo}
                    alt={org.alt}
                    width={160}
                    height={48}
                    unoptimized
                    className={`h-auto w-auto max-h-12 max-w-[85%] object-contain ${org.sizeClass || ""}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Professional Engagements */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <h5 className="font-mono font-medium text-slate-200">
                  Professional Engagements
                </h5>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-slate-400">
                  Advisory &amp; Tech Implementations
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Providing technology and digital solutions to professionals
                associated with the{" "}
                <span className="text-white font-semibold">
                  Indian School of Business (ISB)
                </span>
                .
              </p>
            </div>
            <div className="shrink-0">
              <span className="font-mono text-xs font-medium text-blue-400">
                Executive Solutions
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Rail */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights
              reserved.
            </p>
            <span className="hidden sm:inline text-slate-700" aria-hidden="true">
              ·
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-150"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
          <p className="text-slate-400 font-mono text-[11px] text-center md:text-right">
            {siteConfig.descriptor} · {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
};
