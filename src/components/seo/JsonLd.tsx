import React from "react";
import { siteConfig } from "@/data/site";
import type { ServiceItem } from "@/data/services";
import type { ProjectItem } from "@/data/projects";
import type { TeamMember } from "@/data/team";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Organization & LocalBusiness Schema (Setsuzoku LLP)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: ["Setsuzoku", "Setsuzoku Edu Alt Tech", "Setsuzoku Kakinada"],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/brand/setsuzoku-logo.png`,
      caption: siteConfig.name,
    },
    image: `${siteConfig.url}/brand/setsuzoku-logo.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    priceRange: "₹₹",
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kakinada",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      postalCode: "533001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.geo?.latitude || 16.9891,
      longitude: siteConfig.contact.geo?.longitude || 82.2475,
    },
    areaServed: [
      { "@type": "City", name: "Kakinada" },
      { "@type": "City", name: "Rajamahendravaram" },
      { "@type": "City", name: "Visakhapatnam" },
      { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
      { "@type": "City", name: "Hyderabad" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Worldwide" },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
      url: `${siteConfig.url}/team/uma-krishna-kanth-chokkapu`,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneRaw,
        contactType: "customer support",
        email: siteConfig.contact.email,
        areaServed: ["India", "Worldwide"],
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneRaw,
        contactType: "sales",
        email: siteConfig.contact.email,
        areaServed: ["India", "Worldwide"],
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
    ],
    sameAs: [
      siteConfig.contact.linkedin,
      siteConfig.contact.instagram,
    ].filter(Boolean),
    knowsAbout: [
      "Software Company in Kakinada",
      "Tech Company in Kakinada",
      "Web Development Company in Kakinada",
      "IT Company in Kakinada",
      "Website Design in Kakinada",
      "Software Development Company Andhra Pradesh",
      "Custom Software Engineering",
      "Web Applications Development",
      "Mobile Applications",
      "UI/UX Design Systems",
      "Brand Identity Systems",
      "Digital Transformation",
      "Edu Alt Tech",
      "Cloud Architecture",
      "Full-Stack Web Development",
      "E-Commerce Store Development",
    ],
  };
}

/**
 * WebSite Schema with Search & Identity
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * BreadcrumbList Schema for Rich SERP breadcrumbs
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; item: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http")
        ? crumb.item
        : `${siteConfig.url}${crumb.item}`,
    })),
  };
}

/**
 * Service Schema for Individual Service Pages
 */
export function getServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} Services — Setsuzoku LLP`,
    description: service.overview,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.whatWeBuild.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
  };
}

/**
 * CreativeWork / SoftwareApplication Schema for Case Studies
 */
export function getProjectSchema(project: ProjectItem) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.name,
    description: project.longDescription || project.description,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    genre: project.categoryLabel,
    url: `${siteConfig.url}/work/${project.slug}`,
    sameAs: project.websiteUrl || undefined,
    keywords: [
      project.categoryLabel,
      ...(project.technologies || []),
      ...(project.capabilities || []),
    ].join(", "),
  };
}

/**
 * Person & ProfilePage Schema for Team Members
 */
export function getPersonSchema(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.longBio || member.bio,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    email: member.email ? `mailto:${member.email}` : undefined,
    image: member.avatar
      ? member.avatar.startsWith("http")
        ? member.avatar
        : `${siteConfig.url}${member.avatar}`
      : undefined,
    sameAs: [member.linkedin, member.github].filter(Boolean),
    knowsAbout: member.expertise,
  };
}

/**
 * ItemList / Service Offer Schema for Pricing Packages
 */
export function getPricingPackagesSchema(
  packages: Array<{
    name: string;
    summary: string;
    numericPrice: number;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Setsuzoku Website Development Packages (2026)",
    description: "Official web development pricing packages and deliverables by Setsuzoku LLP.",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: `${pkg.name} Package`,
        description: pkg.summary,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: pkg.numericPrice,
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: pkg.numericPrice,
            priceCurrency: "INR",
            valueAddedTaxIncluded: false,
          },
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/pricing#packages`,
        },
      },
    })),
  };
}

/**
 * FAQPage Schema for Rich SERP Accordions
 */
export function getFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

