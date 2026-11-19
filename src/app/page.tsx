import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { TrustLogos } from "@/components/home/TrustLogos";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TeamPreview } from "@/components/home/TeamPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Setsuzoku LLP — Software, Web & Tech Company in Kakinada, India",
  description:
    "Setsuzoku LLP is an Edu Alt Tech and software company headquartered in Kakinada, Andhra Pradesh. We connect ideas to technology, engineering custom web applications, websites, UI/UX systems, and enterprise digital solutions.",
  keywords: [
    "Software Company in Kakinada",
    "Tech Company in Kakinada",
    "Web Development Company in Kakinada",
    "IT Company in Kakinada",
    "Website Design in Kakinada",
    "Software Development Andhra Pradesh",
    "Setsuzoku LLP",
    "Edu Alt Tech Company",
    "Custom Software Engineering",
    "Web Applications",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Setsuzoku LLP — Software, Web & Tech Company in Kakinada, India",
    description:
      "Setsuzoku LLP is an Edu Alt Tech and software company headquartered in Kakinada, Andhra Pradesh. We connect ideas to technology, engineering custom web applications and digital solutions.",
    url: siteConfig.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setsuzoku LLP — Software, Web & Tech Company in Kakinada, India",
    description:
      "Setsuzoku LLP is an Edu Alt Tech and software company headquartered in Kakinada, Andhra Pradesh. We connect ideas to technology, engineering custom web applications and digital solutions.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <ServicesPreview />
      <SelectedWork />
      <ProcessSection />
      <TeamPreview />
      <FinalCTA />
    </>
  );
}
