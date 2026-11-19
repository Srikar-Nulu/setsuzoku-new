import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/data/site";
import { teamData } from "@/data/team";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import {
  JsonLd,
  getBreadcrumbSchema,
  getPersonSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Team & Leadership — Setsuzoku LLP",
  description:
    "Meet the engineering architects, product managers, and creative specialists behind Setsuzoku LLP, an Edu Alt Tech Company founded by Uma Krishna Kanth Chokkapu.",
  keywords: [
    "Setsuzoku Team",
    "Uma Krishna Kanth Chokkapu",
    "Software Architects",
    "Edu Alt Tech Leadership",
    "Engineering Team",
    "Setsuzoku LLP",
  ],
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Our Team & Leadership — Setsuzoku LLP",
    description:
      "Meet the team behind Setsuzoku LLP, an Edu Alt Tech company founded by Uma Krishna Kanth Chokkapu.",
    url: `${siteConfig.url}/team`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team & Leadership — Setsuzoku LLP",
    description:
      "Meet the team behind Setsuzoku LLP, an Edu Alt Tech company.",
  },
};

export default function TeamPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Team", item: "/team" },
  ]);

  const personSchemas = teamData.map(getPersonSchema);

  return (
    <div className="bg-white dark:bg-[#080C14] transition-colors duration-200">
      <JsonLd data={[breadcrumbData, ...personSchemas]} />

      {/* Page Hero */}
      <section className="relative pt-14 pb-16 md:pt-20 md:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <div
          className="absolute inset-0 bg-connection-grid opacity-45 dark:opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-5">
            <Badge variant="blue" size="md">
              OUR PEOPLE
            </Badge>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight leading-[1.08] text-balance">
              The people behind{" "}
              <span className="text-brand-blue dark:text-blue-400">Setsuzoku.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
              We are a team of software architects, product engineers, and digital specialists dedicated to building software that powers real businesses.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16 md:py-24">
        <TeamDirectory />
      </Container>
    </div>
  );
}
