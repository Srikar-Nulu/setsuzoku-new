import { Metadata } from "next";
import PricingClientView from "./PricingClientView";
import { siteConfig } from "@/data/site";
import { RECOMMENDED_PACKAGES } from "@/data/pricing";
import {
  JsonLd,
  getBreadcrumbSchema,
  getPricingPackagesSchema,
  getFaqSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Website Development Pricing Guide (2026) — Setsuzoku LLP",
  description:
    "Transparent website development pricing for 2026. Explore starting prices from ₹8,000, 13 website types, recommended packages, add-ons, and clear commercial terms.",
  keywords: [
    "Website Development Pricing",
    "Setsuzoku LLP Pricing",
    "Web Design Packages India",
    "E-commerce Website Cost",
    "Landing Page Pricing",
    "Custom Web Application Pricing",
    "Web Development Company in Kakinada",
    "Edu Alt Tech",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Website Development Pricing Guide (2026) — Setsuzoku LLP",
    description:
      "Transparent website development pricing for 2026. Clear packages, starting prices from ₹8,000, modular add-ons, and transparent scope.",
    url: `${siteConfig.url}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Pricing Guide (2026) — Setsuzoku LLP",
    description:
      "Transparent website development pricing for 2026. Clear packages, starting prices from ₹8,000, modular add-ons, and transparent scope.",
  },
};

const PRICING_FAQS = [
  {
    question: "What are the starting prices for website development at Setsuzoku LLP?",
    answer:
      "Website development starts from ₹8,000 for a single-page landing page, ₹18,000 for a starter business website, ₹30,000 for a professional business website, ₹45,000 for an e-commerce store, and ₹1,20,000 for custom web applications.",
  },
  {
    question: "What is included in the ₹18,000 Launch Website package?",
    answer:
      "The Launch package (₹18,000) includes up to 5 responsive pages, contact form or WhatsApp CTA, basic SEO metadata, 2 revision rounds, and launch support.",
  },
  {
    question: "What is the payment schedule for web development projects?",
    answer:
      "Projects follow a structured milestone schedule: 50% advance upon project initiation, 30% after design approval or working milestone, and 20% before final deployment and launch. Displayed prices exclude GST.",
  },
  {
    question: "How long does it take to develop a business website?",
    answer:
      "Indicative timelines are 1–2 weeks for single-page landing pages, 2–5 weeks for multi-page business websites, 3–8 weeks for e-commerce platforms, and several weeks to months for custom web applications and client portals.",
  },
];

export default function PricingPage() {
  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Pricing", item: "/pricing" },
  ]);

  const packagesSchema = getPricingPackagesSchema(RECOMMENDED_PACKAGES);
  const faqSchema = getFaqSchema(PRICING_FAQS);

  return (
    <>
      <JsonLd data={[breadcrumbData, packagesSchema, faqSchema]} />
      <PricingClientView />
    </>
  );
}

