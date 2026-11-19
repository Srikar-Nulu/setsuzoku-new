import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/data/site";
import { projectsData } from "@/data/projects";
import { WorkGallery } from "@/components/work/WorkGallery";
import { Reveal } from "@/components/ui/MotionPrimitives";
import {
  JsonLd,
  getBreadcrumbSchema,
  getProjectSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Case Studies & Client Work — Setsuzoku LLP",
  description:
    "Explore our featured software engineering case studies, custom web platforms, educational software, and digital solutions delivered for organizations worldwide.",
  keywords: [
    "Setsuzoku Case Studies",
    "Software Portfolio",
    "JoySchool Platform",
    "Genesis Education Website",
    "Web Application Case Studies",
    "Digital Transformation Projects",
    "Edu Alt Tech Portfolio",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Case Studies & Client Work — Setsuzoku LLP",
    description:
      "Explore our software engineering case studies, custom web applications, and digital solutions delivered for organizations worldwide.",
    url: `${siteConfig.url}/work`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Client Work — Setsuzoku LLP",
    description:
      "Explore our software engineering case studies and digital solutions.",
  },
};

export default function WorkPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Work", item: "/work" },
  ]);

  const projectSchemas = projectsData.map(getProjectSchema);

  return (
    <div className="bg-white dark:bg-[#080C14] min-h-screen">
      <JsonLd data={[breadcrumbData, ...projectSchemas]} />

      {/* Monumental Typographic Editorial Header */}
      <section className="pt-14 pb-12 md:pt-20 md:pb-16 border-b border-slate-200/80 dark:border-slate-800/80">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="green">Our Case Studies</Badge>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-[68px] font-extrabold text-[#0B1220] dark:text-slate-50 tracking-[-0.04em] leading-[1.02]">
                  Our work.
                </h1>
              </div>
              <div className="lg:col-span-5 lg:pb-2 space-y-2">
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Software engineered around real businesses, real users, and
                  real operational challenges.
                </p>
                <p className="font-mono text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                  {String(projectsData.length).padStart(2, "0")} Delivered Case
                  Studies
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Interactive Filterable Editorial Index */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]/60 dark:bg-[#0B101C]">
        <Container>
          <WorkGallery />
        </Container>
      </section>
    </div>
  );
}
