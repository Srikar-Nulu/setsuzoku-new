import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import {
  Lock,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  UserCheck,
  Server,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection — Setsuzoku LLP",
  description:
    "Official Privacy Policy of Setsuzoku LLP. Comprehensive, evidence-backed disclosure of our data collection, processing, storage, India DPDPA compliance, and Google API Limited Use adherence.",
  keywords: [
    "Setsuzoku LLP Privacy Policy",
    "Data Protection Policy India",
    "DPDPA 2023 Compliance",
    "Setsuzoku Mail Studio Privacy",
    "Google API Limited Use Disclosure",
    "Kakinada Software Company Privacy",
  ],
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Data Protection — Setsuzoku LLP",
    description:
      "Comprehensive, evidence-backed Privacy Policy of Setsuzoku LLP. Details on data protection, India DPDPA compliance, and Google API user data standards.",
    url: `${siteConfig.url}/privacy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Data Protection — Setsuzoku LLP",
    description:
      "Comprehensive, evidence-backed Privacy Policy of Setsuzoku LLP. Details on data protection, India DPDPA compliance, and Google API user data standards.",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Privacy Policy", item: "/privacy" },
  ]);

  const sections = [
    { id: "introduction", label: "1. Organization & Scope" },
    { id: "information-collected", label: "2. Information We Collect" },
    { id: "how-we-use", label: "3. How We Use Information" },
    { id: "legal-basis", label: "4. Legal Grounds for Processing" },
    { id: "cookies-tracking", label: "5. Cookies & Tracking Audit" },
    { id: "third-parties", label: "6. Third-Party Integrations" },
    { id: "google-limited-use", label: "7. Google API & Limited Use" },
    { id: "security-safeguards", label: "8. Data Security & Storage" },
    { id: "retention", label: "9. Data Retention Policy" },
    { id: "deletion", label: "10. Data Deletion Procedures" },
    { id: "user-rights", label: "11. Your Legal Rights" },
    { id: "children", label: "12. Children's Privacy" },
    { id: "international", label: "13. International Processing" },
    { id: "india-compliance", label: "14. India DPDPA & IT Act" },
    { id: "policy-updates", label: "15. Policy Changes & Updates" },
    { id: "grievance-contact", label: "16. Grievance & Contact" },
  ];

  const sectionNumClass =
    "w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-blue-200/70 dark:border-blue-900/60";

  return (
    <div className="bg-white dark:bg-[#080C14] min-h-screen transition-colors duration-200">
      <JsonLd data={breadcrumbData} />

      {/* Document Header */}
      <section className="relative pt-14 pb-14 md:pt-20 md:pb-16 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-5">
            <Badge variant="blue" size="md">
              DATA PROTECTION &amp; PRIVACY AUDIT
            </Badge>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08]">
              Privacy <span className="text-brand-blue dark:text-blue-400">Policy</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl">
              This document outlines the verified privacy practices, data processing operations, and security architecture of{" "}
              <strong className="text-[#0B1220] dark:text-white font-semibold">{siteConfig.legalName}</strong> across our public website (
              <Link href="/" className="text-brand-blue dark:text-blue-400 hover:underline">
                https://www.setsuzoku.in
              </Link>
              ), software engineering services, and associated applications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Effective Date
                </span>
                <span className="font-bold text-[#0B1220] dark:text-white mt-0.5 block">
                  November 6, 2026
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Operating Entity
                </span>
                <span className="font-bold text-[#0B1220] dark:text-white mt-0.5 block">
                  {siteConfig.legalName}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Jurisdiction
                </span>
                <span className="font-bold text-[#0B1220] dark:text-white mt-0.5 block">
                  Kakinada, AP, India
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Official Email
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-bold text-brand-blue dark:text-blue-400 hover:underline truncate block mt-0.5"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="bg-slate-50/90 dark:bg-[#0E1422] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <h3 className="text-[11px] font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Policy Index
                </h3>
                <span className="text-[10px] font-mono font-semibold text-brand-green-dark dark:text-emerald-400 uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <nav className="space-y-0.5 text-sm max-h-[56vh] overflow-y-auto pr-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-slate-800/70 transition-colors font-medium text-xs truncate"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2.5">
                <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Related Documents
                </span>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline"
                >
                  <span>Terms and Conditions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <div>
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 hover:underline"
                  >
                    <span>Google Account Permissions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Policy Content */}
          <div className="lg:col-span-8 space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section id="introduction" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>01</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Organization &amp; Scope of Policy
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                This Privacy Policy is issued by <strong className="text-[#0B1220] dark:text-white">{siteConfig.legalName}</strong> (&ldquo;Setsuzoku&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), an Edu Alt Tech and software engineering limited liability partnership registered in Kakinada, Andhra Pradesh, India.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                This policy governs:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Setsuzoku Public Website:</strong> All interactions on{" "}
                  <Link href="/" className="text-brand-blue dark:text-blue-400 hover:underline">
                    https://www.setsuzoku.in
                  </Link>
                  , including informational pages, project case studies, leadership directories, and inquiry forms.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Commercial Consulting &amp; Software Projects:</strong> Custom web applications, enterprise software, design systems, branding, and cloud solutions commissioned by our clients.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Specialized Products &amp; Automation Tools:</strong> Software utilities engineered by Setsuzoku LLP, specifically including <em>Setsuzoku Mail Studio</em> (our email campaign and dispatch automation system).
                </li>
              </ul>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                This policy does not govern third-party platforms, external tools, or client websites once deployed to independent client-owned infrastructure.
              </p>
            </section>

            {/* Section 2 */}
            <section id="information-collected" className="space-y-5 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>02</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Information We Collect
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We believe in strict data minimization. Every piece of information collected corresponds to an active functional feature or operational requirement:
              </p>

              {/* Subsection 2.1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#0B1220] dark:text-white font-bold text-sm sm:text-base">
                  <UserCheck className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span>2.1 Website Inquiry &amp; Contact Forms</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  When you submit an inquiry through our{" "}
                  <Link href="/contact" className="text-brand-blue dark:text-blue-400 hover:underline">
                    Contact Form
                  </Link>{" "}
                  or the{" "}
                  <Link href="/pricing#enquiry" className="text-brand-blue dark:text-blue-400 hover:underline">
                    Pricing Consultation Form
                  </Link>
                  , we collect:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Full Name:</strong> Required (2–100 characters) to address you respectfully.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Email Address:</strong> Required (validated RFC format) to transmit project replies and quotes.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Message / Scope:</strong> Required (5–5,000 characters) to evaluate your requirements.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Organization / Company:</strong> Optional (up to 120 characters) for commercial scoping.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Phone / WhatsApp Number:</strong> Optional (up to 30 characters) for direct coordination.
                  </div>
                  <div className="p-3 bg-white dark:bg-[#131B2E] rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300">
                    <strong className="text-[#0B1220] dark:text-white">Service Requirement / Budget:</strong> Optional dropdown selection to match service tiers.
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <em>Anti-Spam Verification:</em> We include hidden honeypot form fields (
                  <code className="font-mono text-[11px] bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                    website
                  </code>
                  ,{" "}
                  <code className="font-mono text-[11px] bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                    hp
                  </code>
                  ). Legitimate user submissions leave these empty. Submissions with populated honeypots are silently dropped without data retention.
                </p>
              </div>

              {/* Subsection 2.2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-[#0B1220] dark:text-white font-bold text-sm sm:text-base">
                  <Server className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0" />
                  <span>2.2 Automated Technical Telemetry &amp; In-Memory Rate Limiting</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  When accessing our API endpoints (e.g.{" "}
                  <code className="font-mono text-[11px] bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                    /api/contact
                  </code>
                  ), our edge runtime inspects:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">IP Address:</strong> Extracted via standard reverse-proxy headers (
                    <code className="font-mono text-[11px]">x-forwarded-for</code> or{" "}
                    <code className="font-mono text-[11px]">x-real-ip</code>) solely to enforce an in-memory sliding window rate limiter (max 5 requests per 10-minute window).{" "}
                    <em>These IP records are held in volatile Node.js server RAM only, are pruned automatically every 5 minutes, and are never written to a persistent database or disk.</em>
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">HTTP Request Headers:</strong> Browser User-Agent and content-type headers used exclusively to negotiate payload parsing and maintain security defenses against DDoS abuse.
                  </li>
                </ul>
              </div>

              {/* Subsection 2.3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-[#0B1220] dark:text-white font-bold text-sm sm:text-base">
                  <Lock className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span>2.3 Contracted Client Materials &amp; NDAs</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  During contracted software engineering engagements, clients may furnish brand assets, Figma wireframes, database schemas, API credentials, or test fixtures. These materials are governed by bilateral Non-Disclosure Agreements (NDAs), isolated from public infrastructure, and accessible exclusively to assigned developers on a need-to-know basis.
                </p>
              </div>

              {/* Subsection 2.4 */}
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200/80 dark:border-blue-900/60 space-y-3">
                <div className="flex items-center gap-2 text-brand-blue dark:text-blue-400 font-bold text-sm sm:text-base">
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <span>2.4 Setsuzoku Mail Studio Application Data</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  For users authorized to operate <strong className="text-[#0B1220] dark:text-white">Setsuzoku Mail Studio</strong>, our platform processes:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">Account &amp; Workspace Data:</strong> Name, business email, account identifiers, and role-based permissions.
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">Contact Audiences:</strong> Contact names, email addresses, audience labels, and consent metadata uploaded by the client.
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">Campaign Data:</strong> Subject lines, email HTML/text bodies, scheduling rules, and campaign approval logs.
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">Google OAuth 2.0 Credentials:</strong> Specifically requesting the restricted Gmail send scope:{" "}
                    <code className="font-mono text-[11px] bg-white dark:bg-[#0E1422] px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/80 text-brand-blue dark:text-blue-300 break-all">
                      https://www.googleapis.com/auth/gmail.send
                    </code>
                    . We do NOT request mailbox read, search, or inbox management permissions.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>03</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  How We Use Information
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We process personal information strictly for legitimate commercial, engineering, and statutory purposes:
              </p>
              <div className="space-y-2.5 pt-1">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">1. Responding to Inquiries:</strong> Processing contact and pricing form data to evaluate technical feasibility, schedule discovery calls, and deliver written quotations.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">2. Project Engineering &amp; Delivery:</strong> Fulfilling contracted Statements of Work (SOW), designing UI/UX wireframes, developing web applications, and deploying software architectures.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">3. Commercial Invoicing &amp; Tax Compliance:</strong> Generating tax invoices, administering milestone settlements (50% advance / 30% milestone / 20% handover), and fulfilling Indian GST statutory obligations.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">4. Platform Security &amp; Abuse Prevention:</strong> Rate limiting incoming requests in server memory, filtering malicious script injections, and blocking automated bots.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">5. Setsuzoku Mail Studio Dispatch:</strong> Authenticating connected Google accounts to dispatch user-approved campaigns via Gmail API.
                </div>
              </div>
              <p className="text-sm font-semibold text-[#0B1220] dark:text-white pt-1">
                Setsuzoku LLP does not engage in automated individual profiling, behavioural ad-targeting, or data resale.
              </p>
            </section>

            {/* Section 4 */}
            <section id="legal-basis" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>04</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Legal Grounds for Processing (India &amp; Global Standards)
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Under the <strong className="text-[#0B1220] dark:text-white">Digital Personal Data Protection Act, 2023 (DPDPA)</strong> of India and applicable international data protection laws, we process personal data only when an established lawful basis exists:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-[#0B1220] dark:text-white block">Consent</span>
                  <p className="text-slate-600 dark:text-slate-400">When you voluntarily submit your contact details or project brief through our inquiry forms after reviewing this policy.</p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-[#0B1220] dark:text-white block">Contractual Obligation</span>
                  <p className="text-slate-600 dark:text-slate-400">Processing necessary to negotiate a proposal, execute a Statement of Work, or deliver contracted software milestones.</p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-[#0B1220] dark:text-white block">Legitimate Uses</span>
                  <p className="text-slate-600 dark:text-slate-400">Protecting the security and integrity of our web servers, mitigating brute-force attacks, and verifying authorized system access.</p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <span className="font-bold text-[#0B1220] dark:text-white block">Legal Compliance</span>
                  <p className="text-slate-600 dark:text-slate-400">Retaining financial records, invoices, and GST transaction data as required under the laws of the Republic of India.</p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="cookies-tracking" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>05</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Cookies, Analytics &amp; Tag Management
                </h2>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#0B1220] dark:text-white font-bold text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                  <span>Google Tag Manager &amp; Measurement Disclosure</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  The public Setsuzoku website (<code className="font-mono text-xs">setsuzoku.in</code>) integrates{" "}
                  <strong className="text-[#0B1220] dark:text-white">Google Tag Manager</strong> (Container ID:{" "}
                  <code className="font-mono text-xs bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                    GTM-WDJ9FZ3X
                  </code>
                  ) to manage tag deployment and evaluate aggregated, non-personalized site performance and usage metrics.
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside pl-2">
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">Aggregated Telemetry:</strong> Collects pseudonymous technical metrics (page views, browser types, screen resolutions) to improve site reliability and user experience.
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">No Third-Party Ad Selling:</strong> We do not sell telemetry data or license your interactions to data brokers or advertising exchanges.
                  </li>
                  <li>
                    <strong className="text-[#0B1220] dark:text-white">No Invasive Fingerprinting:</strong> We do not deploy cross-site biometric or hardware fingerprinting mechanisms.
                  </li>
                </ul>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  You can manage script execution and tracking cookies via your browser settings or privacy extensions (such as uBlock Origin or Google Analytics Opt-out Add-on).
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="third-parties" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>06</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Third-Party Integrations &amp; Service Providers
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku LLP utilizes verified enterprise cloud providers to deliver our digital services. Data is shared exclusively on a need-to-know basis:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Google LLC (Google Tag Manager)</span>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#131B2E] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Tag Management &amp; Analytics
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Provides script container management (<code className="font-mono text-[11px]">GTM-WDJ9FZ3X</code>) and aggregated site analytics to monitor web performance and uptime.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Google Workspace &amp; Google Apps Script</span>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#131B2E] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Webhook &amp; Email Relay
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Form submissions from <code className="font-mono text-[11px]">/api/contact</code> are forwarded over an encrypted HTTPS connection to Setsuzoku&apos;s internal Google Apps Script webhook, delivering the inquiry to authorized personnel via Google Workspace.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Vercel Inc.</span>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#131B2E] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Hosting &amp; Edge Infrastructure
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Provides global content delivery network (CDN), serverless edge execution, and TLS cryptographic termination for <code className="font-mono text-[11px]">setsuzoku.in</code>.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Supabase Inc.</span>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#131B2E] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Database &amp; Storage
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Powers secure relational database storage and authentication for specialized web applications (including Setsuzoku Mail Studio), protected by Row Level Security (RLS).
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#0B1220] dark:text-white pt-1">
                We do not sell, rent, or trade your personal data to data brokers, marketing networks, or third parties.
              </p>
            </section>

            {/* Section 7 */}
            <section id="google-limited-use" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>07</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Google API Services User Data Policy &amp; Limited Use Disclosure
                </h2>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200/80 dark:border-blue-900/60 space-y-3.5">
                <div className="flex items-center gap-2 text-brand-blue dark:text-blue-400 font-bold text-sm sm:text-base">
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <span>Setsuzoku Mail Studio — Google API Compliance</span>
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  Setsuzoku Mail Studio&apos;s use and transfer of information received from Google APIs adheres to the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue dark:text-blue-400 underline font-bold"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the Limited Use requirements.
                </p>
                <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <p className="font-semibold text-[#0B1220] dark:text-white">Specifically:</p>
                  <ul className="space-y-1.5 list-disc list-inside pl-2">
                    <li>We use Google user data strictly to provide and improve user-facing features visible and relevant to the application (sending authorized email campaigns).</li>
                    <li>We do NOT use Google user data for serving advertisements.</li>
                    <li>We do NOT sell Google user data.</li>
                    <li>We do NOT transfer Google user data to third parties except as necessary to provide the service, comply with applicable law, or protect against security threats.</li>
                    <li>We do NOT allow human access to Google user data unless the user grants affirmative consent, it is required for critical security investigations, or it is mandated by applicable law.</li>
                    <li>We do NOT use Google user data to train, fine-tune, or develop generalized artificial intelligence or machine learning models.</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-blue-200/80 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-600 dark:text-slate-300">
                    Requested Scope:{" "}
                    <code className="font-mono bg-white dark:bg-[#0E1422] px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800/80 text-brand-blue dark:text-blue-300 break-all">
                      https://www.googleapis.com/auth/gmail.send
                    </code>
                  </span>
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-brand-blue dark:text-blue-400 hover:underline"
                  >
                    <span>Manage Google Permissions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="security-safeguards" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>08</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Data Security &amp; Storage Architecture
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                In compliance with Section 43A of the Information Technology Act, 2000 and the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, Setsuzoku LLP implements verified technical safeguards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">TLS 1.3 Transport Encryption</strong>
                  <p className="text-slate-600 dark:text-slate-400">All data transferred between your browser and our servers is encrypted in transit using verified HTTPS with strict TLS 1.3 ciphers.</p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">HTTP Security Headers</strong>
                  <p className="text-slate-600 dark:text-slate-400">
                    Configured with <code className="font-mono text-[11px]">X-Content-Type-Options: nosniff</code>,{" "}
                    <code className="font-mono text-[11px]">X-Frame-Options: SAMEORIGIN</code>, and restrictive permissions policies.
                  </p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">AES-256-GCM Credential Vaulting</strong>
                  <p className="text-slate-600 dark:text-slate-400">OAuth refresh tokens in Setsuzoku Mail Studio are encrypted server-side using AES-256-GCM before persistent database storage.</p>
                </div>
                <div className="p-4 bg-slate-50/70 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">Database Row Level Security (RLS)</strong>
                  <p className="text-slate-600 dark:text-slate-400">Backend database tables enforce tenant isolation policies ensuring workspace records cannot be accessed across account boundaries.</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                While no electronic transmission is 100% immune to risk, our multi-layered defense architecture minimizes unauthorized access vectors.
              </p>
            </section>

            {/* Section 9 */}
            <section id="retention" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>09</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Data Retention Policy
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We retain personal information only for the duration necessary to satisfy the purpose for which it was gathered, or as mandated by Indian statutory regulations:
              </p>
              <div className="space-y-2.5 pt-1 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-[#0B1220] dark:text-white block">General Inquiries &amp; Quotation Requests</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">Retained for up to 180 days to facilitate technical consultation, after which non-converting records are deleted.</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-xs shrink-0 tabular-nums">180 Days</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-[#0B1220] dark:text-white block">Active Client Project Data</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">Retained through active engineering sprints and the 14-day warranty period, after which code ownership is transferred.</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-xs shrink-0">Duration of SOW</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-[#0B1220] dark:text-white block">Statutory Financial &amp; Tax Records (GST &amp; Income Tax)</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">Invoices, commercial contracts, and payment records retained under Section 44AA of the Indian Income Tax Act.</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-xs shrink-0 tabular-nums">7–8 Years</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div>
                    <strong className="text-[#0B1220] dark:text-white block">Volatile Rate-Limiter Telemetry (RAM)</strong>
                    <span className="text-slate-600 dark:text-slate-400 text-xs">Transient IP addresses used to mitigate abuse are purged automatically every 5 minutes from server memory.</span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-400 font-mono text-xs shrink-0 tabular-nums">10 Minutes Max</span>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="deletion" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>10</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Data Deletion &amp; Account Disconnection Procedures
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                You may request the deletion of your personal data held by Setsuzoku LLP through the following verified procedures:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Manual Erasure Requests:</strong> Email your deletion request to{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-blue dark:text-blue-400 font-bold hover:underline">
                    {siteConfig.contact.email}
                  </a>
                  . Upon identity confirmation, we will purge your contact details, proposal briefs, and correspondence within thirty (30) business days.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Disconnecting Google Account Access:</strong> Users of Setsuzoku Mail Studio can immediately revoke Google OAuth access at any time via the{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue dark:text-blue-400 font-bold hover:underline"
                  >
                    Google Permissions Manager
                  </a>
                  . Upon revocation, all active token authorization ceases immediately.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Statutory Exceptions:</strong> Deletion requests cannot apply to completed tax invoices, GST billing records, or accounting ledgers which Setsuzoku is legally obligated to preserve under Indian financial statutes.
                </li>
              </ul>
            </section>

            {/* Section 11 */}
            <section id="user-rights" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>11</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Your Legal Rights as a Data Principal
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Under the Digital Personal Data Protection Act, 2023 (DPDPA), you enjoy defined rights as a Data Principal:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">Right to Access &amp; Summary:</strong> Request an overview of personal data being processed and a summary of third-party disclosures.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">Right to Correction &amp; Updating:</strong> Rectify inaccurate, misleading, or outdated personal contact information.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">Right to Erasure:</strong> Seek deletion of your personal data where the original purpose of processing is fulfilled.
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                  <strong className="text-[#0B1220] dark:text-white">Right of Grievance Redressal:</strong> Submit privacy complaints directly to our designated Grievance Officer.
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                To exercise any right, contact{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-blue dark:text-blue-400 hover:underline font-bold">
                  {siteConfig.contact.email}
                </a>
                . We respond to all authenticated requests within 30 days.
              </p>
            </section>

            {/* Section 12 */}
            <section id="children" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>12</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Children&apos;s Privacy
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku LLP delivers enterprise software, commercial website development, and business technology solutions. Our services and website are intended strictly for adults (aged 18 and above) or authorized institutional representatives.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We do not knowingly collect, process, or track personal data from individuals under 18 years of age. If we learn that personal data of a minor has been submitted without verifiable parental or guardian authorization, we will promptly delete the data from our active systems.
              </p>
            </section>

            {/* Section 13 */}
            <section id="international" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>13</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  International Data Transfers
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku LLP is headquartered in India. However, to provide resilient global uptime and fast page delivery, our web applications leverage globally distributed infrastructure providers:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Vercel Edge Network:</strong> Caches static website assets across geographically distributed edge nodes.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Google Cloud Infrastructure:</strong> Transmits webhook payloads over encrypted Google Cloud networks.
                </li>
              </ul>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Where cross-border data processing occurs, transfers are conducted in compliance with applicable Indian data protection transfer regulations, standard contractual safeguards, and enterprise encryption standards.
              </p>
            </section>

            {/* Section 14 */}
            <section id="india-compliance" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>14</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  India-Specific Regulatory Compliance &amp; Governance
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku LLP operates as a <strong className="text-[#0B1220] dark:text-white">Data Fiduciary</strong> under Indian privacy law. Here is a clear, transparent assessment of our compliance status:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Digital Personal Data Protection Act, 2023 (DPDPA)</span>
                    <span className="text-[10px] font-mono font-semibold text-brand-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/80">
                      Enacted Framework
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Setsuzoku LLP complies with the core principles of DPDPA 2023: lawful purpose specification, explicit notice before data submission, data minimization, and provision of a designated Grievance Officer. As the Central Government of India finalizes the operational <em>DPDPA Rules (2025)</em> and establishes the Data Protection Board of India, our operational workflows will incorporate any supplemental guidelines upon formal commencement.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0B1220] dark:text-white">Information Technology Act, 2000 &amp; SPDI Rules, 2011</span>
                    <span className="text-[10px] font-mono font-semibold text-brand-green-dark dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/80">
                      Active Compliance
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    We maintain reasonable security practices and procedures pursuant to Section 43A of the IT Act, 2000 and the Sensitive Personal Data or Information (SPDI) Rules, 2011, implementing TLS transport security, access control segmentation, and encrypted credential handling.
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 dark:bg-amber-950/25 rounded-xl border border-amber-200/80 dark:border-amber-800/50 space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                    <span>Ongoing Compliance Roadmap</span>
                  </div>
                  <p className="leading-relaxed">
                    We regularly audit our codebase, API handlers, and infrastructure configurations. We do not claim government certifications or formal third-party regulatory approvals; instead, we prioritize factual implementation transparency, verified encryption, and prompt response to client privacy inquiries.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 15 */}
            <section id="policy-updates" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>15</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Policy Changes &amp; Version Control
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We may periodically update this Privacy Policy to reflect advancements in our software architecture, newly introduced service disciplines, or statutory amendments to Indian data protection laws.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                When changes occur, the &ldquo;Effective Date&rdquo; at the top of this page will be updated. Substantive operational modifications will be noted on this page. We encourage visitors and clients to review this policy periodically.
              </p>
            </section>

            {/* Section 16 */}
            <section id="grievance-contact" className="space-y-6 scroll-mt-24 pt-8 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>16</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Grievance Officer &amp; Contact Details
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                In compliance with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000, please direct all privacy-related inquiries, data access requests, or formal grievances to:
              </p>

              <div className="bg-[#0B1220] dark:bg-[#0E1422] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                <div
                  className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-400">
                    Data Protection &amp; Grievance Redressal
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{siteConfig.legalName}</h3>
                  <p className="text-xs text-slate-400">
                    {siteConfig.descriptor} • Attn: Grievance Officer
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{siteConfig.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors truncate">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a
                      href="https://www.setsuzoku.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      www.setsuzoku.in
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project Discussion
                </Button>
                <Button href="/terms" variant="outline" size="lg">
                  View Terms &amp; Conditions
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
