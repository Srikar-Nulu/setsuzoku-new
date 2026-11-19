import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/data/site";
import { Phone, MapPin } from "lucide-react";
import { GmailHoverIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  JsonLd,
  getBreadcrumbSchema,
  getOrganizationSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Setsuzoku LLP — Software & Web Development Company in Kakinada",
  description:
    "Connect with Setsuzoku LLP, an Edu Alt Tech and software engineering company headquartered in Kakinada, Andhra Pradesh. Contact us for custom web apps, mobile apps, UI/UX, and digital systems.",
  keywords: [
    "Software Company in Kakinada",
    "Tech Company in Kakinada",
    "Web Development Company in Kakinada",
    "IT Company in Kakinada",
    "Website Design in Kakinada",
    "Software Agency Andhra Pradesh",
    "Contact Setsuzoku",
    "Hire Software Engineers India",
    "Custom Software Quote",
    "Setsuzoku LLP Address",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Setsuzoku LLP — Software & Web Development Company in Kakinada",
    description:
      "Connect with Setsuzoku LLP, an Edu Alt Tech and software engineering company headquartered in Kakinada, Andhra Pradesh.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Setsuzoku LLP — Software & Web Development Company in Kakinada",
    description:
      "Connect with Setsuzoku LLP, an Edu Alt Tech and software engineering company headquartered in Kakinada, Andhra Pradesh.",
  },
};

export default function ContactPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" },
  ]);

  const organizationSchema = getOrganizationSchema();

  return (
    <div className="bg-white dark:bg-[#080C14] transition-colors duration-200">
      <JsonLd data={[breadcrumbData, organizationSchema]} />

      {/* Hero */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-5">
            <Badge variant="blue" size="md">
              START A CONVERSATION
            </Badge>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08] text-balance">
              Let&apos;s build{" "}
              <span className="text-brand-blue dark:text-blue-400">something useful.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
              Tell us about your project, digital goals, or technology needs. Our team will review your inquiry and respond promptly.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Form */}
          <ContactForm />

          {/* Right Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1220] dark:bg-[#0E1422] text-white p-7 sm:p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green"
                aria-hidden="true"
              />
              <div className="space-y-2">
                <h3 className="font-display text-xl font-extrabold text-white">
                  Direct Channels
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Reach out to Setsuzoku LLP directly through phone, email, or official web channels.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                      Phone
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                {/* Email Direct */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <GmailHoverIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                      Email Direct
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate block">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                {/* Headquarters Location */}
                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                      Headquarters
                    </span>
                    <span className="text-sm font-bold text-white block">
                      {siteConfig.contact.address}
                    </span>
                    <span className="text-xs text-slate-400">
                      Serving clients locally &amp; globally
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Contact Note */}
            <div className="bg-slate-50/90 dark:bg-[#0E1422] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-2">
              <h4 className="font-display text-sm font-bold text-[#0B1220] dark:text-white">
                Leadership
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Founder:{" "}
                <span className="font-semibold text-[#0B1220] dark:text-white">
                  {siteConfig.founder.name}
                </span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {siteConfig.descriptor} • {siteConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
