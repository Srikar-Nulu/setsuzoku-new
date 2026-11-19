import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import {
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms and Conditions — Setsuzoku LLP",
  description:
    "Review the official Terms and Conditions of Setsuzoku LLP governing our website, software engineering services, project contracts, milestone payments, and commercial deliverables.",
  keywords: [
    "Setsuzoku Terms and Conditions",
    "Software Development Agreement",
    "Commercial Terms Setsuzoku LLP",
    "Web Development Contract India",
    "Edu Alt Tech Terms",
  ],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions — Setsuzoku LLP",
    description:
      "Review the official Terms and Conditions of Setsuzoku LLP governing our software engineering, web development, and commercial project delivery.",
    url: `${siteConfig.url}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions — Setsuzoku LLP",
    description:
      "Review the official Terms and Conditions of Setsuzoku LLP governing our software engineering, web development, and commercial project delivery.",
  },
};

export default function TermsAndConditionsPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Terms and Conditions", item: "/terms" },
  ]);

  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "services", label: "2. Scope of Services" },
    { id: "proposals", label: "3. Quotations & Statements of Work" },
    { id: "commercial-schedule", label: "4. Milestone Payment Schedule" },
    { id: "client-responsibilities", label: "5. Client Responsibilities" },
    { id: "revisions", label: "6. Revision Policy & Scope Changes" },
    { id: "ip-code-ownership", label: "7. Code & Intellectual Property" },
    { id: "exclusions", label: "8. Exclusions & Third-Party Costs" },
    { id: "warranty-support", label: "9. Warranty & Post-Launch Support" },
    { id: "liability", label: "10. Limitation of Liability" },
    { id: "termination", label: "11. Termination & Cancellation" },
    { id: "governing-law", label: "12. Governing Law & Jurisdiction" },
    { id: "contact", label: "13. Official Inquiries" },
  ];

  const sectionNumClass =
    "w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-brand-blue dark:text-blue-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-blue-200/70 dark:border-blue-900/60";

  return (
    <div className="bg-white dark:bg-[#080C14] min-h-screen transition-colors duration-200">
      <JsonLd data={breadcrumbData} />

      {/* Page Header */}
      <section className="relative pt-14 pb-14 md:pt-20 md:pb-16 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-4xl space-y-5">
            <Badge variant="blue" size="md">
              COMMERCIAL AGREEMENT
            </Badge>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08]">
              Terms &amp; <span className="text-brand-blue dark:text-blue-400">Conditions</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-3xl">
              Clear standards. Transparent milestones. Professional engineering practices. These terms govern the use of our digital platforms and commercial engagements with Setsuzoku LLP.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono max-w-3xl">
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Effective Date
                </span>
                <span className="font-bold text-[#0B1220] dark:text-white mt-0.5 block">
                  January 1, 2026
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase tracking-wider">
                  Applicable To
                </span>
                <span className="font-bold text-[#0B1220] dark:text-white mt-0.5 block">
                  All Contracts &amp; Proposals
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
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-20">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 hidden lg:block">
            <div className="bg-slate-50/90 dark:bg-[#0E1422] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-4">
              <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <h3 className="text-[11px] font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  Contract Outline
                </h3>
              </div>

              <nav className="space-y-0.5 text-sm">
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
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Looking for package pricing and technical inclusions?
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue dark:text-blue-400 hover:underline transition-colors"
                >
                  <span>View 2026 Pricing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Main Body */}
          <div className="lg:col-span-8 space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section id="acceptance" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>01</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you or the entity you represent (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) and{" "}
                <strong className="text-[#0B1220] dark:text-white">{siteConfig.legalName}</strong> (&ldquo;Setsuzoku&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered in Kakinada, Andhra Pradesh, India.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                By browsing our website (
                <Link href="/" className="text-brand-blue dark:text-blue-400 hover:underline">
                  https://setsuzoku.in
                </Link>
                ), commissioning a project, accepting an official proposal, or remitting milestone payments, you agree to be bound by these Terms in full. If you do not agree to these terms, you must refrain from engaging our services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>02</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Scope of Services
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku LLP operates as an Edu Alt Tech and digital product engineering studio delivering specialized technical capabilities across 6 core disciplines:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">1. Websites</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">High-performance landing pages, corporate portals, and Next.js platforms.</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">2. Applications</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Bespoke web applications, authenticated portals, and SaaS MVPs.</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">3. UI/UX Design</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Figma design systems, interactive prototypes, user flow optimization.</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">4. Branding &amp; Identity</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Logos, typography systems, vector guidelines, and visual assets.</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">5. Digital Design</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Interactive graphics, marketing collateral, presentation decks.</span>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#0E1422] rounded-xl border border-slate-200/90 dark:border-slate-800">
                  <strong className="text-[#0B1220] dark:text-white block font-semibold">6. Digital Solutions</strong>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Workflow automation, database integrations, analytics telemetry.</span>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="proposals" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>03</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Quotations &amp; Statements of Work (SOW)
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                All development contracts are executed pursuant to a mutually confirmed Statement of Work (SOW), project specification document, or formal commercial proposal.
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Validity:</strong> Written price estimates and package quotations remain valid for thirty (30) calendar days from issuance.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Starting Benchmarks:</strong> Figures displayed in our general public pricing guide represent baseline estimates for defined scopes. Final contracts reflect exact requirements, integrations, and content readiness.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Commencement:</strong> Project discovery and active development sprints begin only after receipt of the initial advance payment and required access credentials.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="commercial-schedule" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>04</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Milestone Payment Schedule &amp; Taxes
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Unless otherwise specified in a formal written contract, all software projects follow our verified 3-stage milestone model:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800">
                  <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 font-bold font-mono text-sm shrink-0 tabular-nums">
                    50%
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1220] dark:text-white text-sm">
                      Advance Initiation Payment
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      Due upon contract signing to initiate technical discovery, wireframes, repository initialization, and core architectural design.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-900/60 text-brand-green-dark dark:text-emerald-400 font-bold font-mono text-sm shrink-0 tabular-nums">
                    30%
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1220] dark:text-white text-sm">
                      Milestone / Design Approval Payment
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      Due after UI/UX design sign-off or demonstration of a working prototype / staging build.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800">
                  <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/70 dark:border-blue-900/60 text-brand-blue dark:text-blue-400 font-bold font-mono text-sm shrink-0 tabular-nums">
                    20%
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1220] dark:text-white text-sm">
                      Final Launch &amp; Handover Settlement
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                      Due prior to final production domain linkage, live deployment, or code repository transfer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-800/50 rounded-xl text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1">
                <strong>Tax Notice (GST):</strong> Displayed fees exclude Goods and Services Tax (GST). Official tax invoices will include GST where legally mandated under Indian law. Payments are settled via official NEFT/RTGS bank transfer or business UPI.
              </div>
            </section>

            {/* Section 5 */}
            <section id="client-responsibilities" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>05</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Client Responsibilities &amp; Materials
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Timely project delivery requires active client collaboration:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Content &amp; Assets:</strong> The Client is responsible for supplying approved text, brand guidelines, high-resolution imagery, product data, and policy texts unless explicitly contracted as an add-on service.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Licensing Warranty:</strong> The Client warrants that all logos, imagery, and text provided to Setsuzoku are owned by the Client or properly licensed, and do not infringe third-party copyrights or trademarks.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Feedback &amp; Approvals:</strong> To maintain project timelines, the Client agrees to provide review feedback within five (5) business days of milestone submissions. Extended delays may reschedule deployment sprints.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="revisions" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>06</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Revision Policy &amp; Scope Changes
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                To guarantee budget transparency, revisions are structured as follows:
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0B1220] dark:text-white">Designated Revision Rounds:</strong> Each package or contract specifies an exact number of revision rounds (e.g., 2 rounds for Launch, 3 for Growth/Premium) covering layout adjustments, styling tweaks, and copy corrections within the agreed scope.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0B1220] dark:text-white">Scope Creep:</strong> Requests for new pages, novel database workflows, external API integrations, or fundamental redesigns requested after milestone sign-off are scoped and billed separately as change orders.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="ip-code-ownership" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>07</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Code Ownership &amp; Intellectual Property
                </h2>
              </div>
              <div className="bg-slate-50 dark:bg-[#0E1422] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-[#0B1220] dark:text-white text-sm">
                  Full Ownership Transfer Upon Settlement
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Upon receipt of 100% full and final payment, Setsuzoku assigns to the Client all custom code, graphic design assets, and database schemas created specifically for the project.
                </p>
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                  <p>
                    <strong className="text-[#0B1220] dark:text-slate-200">Open-Source &amp; Shared Libraries:</strong> Underlying open-source libraries (e.g., React, Next.js, Tailwind CSS) remain subject to their respective open-source licenses (MIT, Apache, etc.). Setsuzoku retains ownership of proprietary internal utility boilerplate developed independently of the engagement.
                  </p>
                  <p>
                    <strong className="text-[#0B1220] dark:text-slate-200">Portfolio Display:</strong> Setsuzoku retains the non-exclusive right to showcase non-confidential project screenshots, descriptions, and outcomes in our public portfolio, unless expressly restricted by a signed Non-Disclosure Agreement.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="exclusions" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>08</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Exclusions &amp; Third-Party Operational Costs
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Software development charges cover custom engineering labor and deliverables. The following recurring operational costs are third-party liabilities paid directly by the Client unless explicitly contracted:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-medium">
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Domain Name Registration
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Cloud Hosting &amp; Servers
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Payment Gateway Fees
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Business Email Suites
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Paid Themes / Plugins
                </div>
                <div className="p-3 bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 rounded-lg text-[#0B1220] dark:text-slate-200">
                  Third-Party API Usage
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="warranty-support" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>09</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Warranty &amp; Post-Launch Support
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                We take immense pride in our engineering quality:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 list-disc list-inside pl-2">
                <li>
                  <strong className="text-[#0B1220] dark:text-white">14-Day Bug-Fix Warranty:</strong> Setsuzoku provides fourteen (14) calendar days of complimentary bug-fix support following launch to address unexpected defects within the contracted scope.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Post-Warranty Maintenance:</strong> Continued feature additions, security patching, library upgrades, and server monitoring are available under monthly maintenance retainers.
                </li>
                <li>
                  <strong className="text-[#0B1220] dark:text-white">Third-Party Tampering:</strong> The complimentary bug-fix warranty is voided if the codebase is modified by unauthorized third-party developers without our prior written consent.
                </li>
              </ul>
            </section>

            {/* Section 10 */}
            <section id="liability" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>10</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                To the maximum extent permitted by applicable Indian law:
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                In no event shall Setsuzoku LLP, its partners, engineers, or affiliates be liable for indirect, incidental, punitive, or consequential damages (including loss of profits, data corruption, or business interruption) arising out of the use or inability to use the delivered software.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Setsuzoku&apos;s total aggregate liability arising from any project contract shall be strictly capped at the total amount actually paid by the Client to Setsuzoku under the specific Statement of Work in dispute.
              </p>
            </section>

            {/* Section 11 */}
            <section id="termination" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>11</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Termination &amp; Cancellation
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Either party may terminate an engagement for cause upon written notice if the other party breaches material obligations and fails to cure such breach within fourteen (14) days.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                In the event of cancellation by the Client prior to completion, the Client remains liable for payment of all work performed and milestone expenses incurred up to the effective termination date. Advance retainers for completed discovery sprints are non-refundable.
              </p>
            </section>

            {/* Section 12 */}
            <section id="governing-law" className="space-y-4 scroll-mt-24 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>12</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Governing Law &amp; Jurisdiction
                </h2>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200/90 dark:border-slate-800 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  These Terms, contracts, and all disputes arising out of or related to our services shall be governed exclusively by the{" "}
                  <strong className="text-[#0B1220] dark:text-white">Laws of the Republic of India</strong>.
                </p>
                <p>
                  Both parties agree to submit to the exclusive jurisdiction of the competent civil courts situated in{" "}
                  <strong className="text-[#0B1220] dark:text-white">Kakinada, Andhra Pradesh, India</strong> for all legal proceedings.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="contact" className="space-y-6 scroll-mt-24 pt-8 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={sectionNumClass}>13</div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">
                  Official Inquiries &amp; Notice Address
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                All formal contractual notices, inquiries, or clarifications regarding these Terms should be directed to:
              </p>

              <div className="bg-[#0B1220] dark:bg-[#0E1422] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 relative overflow-hidden">
                <div
                  className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-400">
                    Contract Administration
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{siteConfig.legalName}</h3>
                  <p className="text-xs text-slate-400">{siteConfig.descriptor}</p>
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
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <Button href="/pricing" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Pricing Guide
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact Our Team
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
