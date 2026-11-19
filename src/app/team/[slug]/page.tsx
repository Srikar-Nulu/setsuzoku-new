import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { teamData } from "@/data/team";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { LinkedInIcon, GmailHoverIcon } from "@/components/ui/Icons";

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import {
  JsonLd,
  getBreadcrumbSchema,
  getPersonSchema,
} from "@/components/seo/JsonLd";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return teamData.map((m) => ({
    slug: m.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const member = teamData.find((m) => m.slug === params.slug);
  if (!member) return { title: "Team Member Not Found" };

  const title = `${member.name} — ${member.role} | Setsuzoku LLP`;
  const description = member.longBio || member.bio;

  return {
    title,
    description,
    keywords: [
      member.name,
      member.role,
      ...(member.expertise || []),
      "Setsuzoku LLP",
      "Team Member",
    ],
    alternates: {
      canonical: `/team/${member.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/team/${member.slug}`,
      type: "profile",
      images: [
        {
          url: member.avatar
            ? member.avatar.startsWith("http")
              ? member.avatar
              : `${siteConfig.url}${member.avatar}`
            : "/og.png",
          width: 1200,
          height: 630,
          alt: member.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        member.avatar
          ? member.avatar.startsWith("http")
            ? member.avatar
            : `${siteConfig.url}${member.avatar}`
          : "/og.png",
      ],
    },
  };
}

export default function TeamMemberPage({ params }: PageProps) {
  const member = teamData.find((m) => m.slug === params.slug);

  if (!member) {
    notFound();
  }

  const isFounder = member.hierarchyLevel === "founder";

  const breadcrumbData = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Team", item: "/team" },
    { name: member.name, item: `/team/${member.slug}` },
  ]);
  const personSchema = getPersonSchema(member);

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#080C14] min-h-screen transition-colors duration-200">
      <JsonLd data={[breadcrumbData, personSchema]} />
      <Container>
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Team Directory</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Profile Sidebar */}
          <aside className="lg:col-span-4 bg-slate-50/90 dark:bg-[#0E1422] p-7 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-6 text-center lg:text-left">
            {member.avatar ? (
              <Image
                src={member.avatar}
                alt={member.name}
                width={112}
                height={112}
                priority
                className="w-28 h-28 mx-auto lg:mx-0 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div
                className={`w-28 h-28 mx-auto lg:mx-0 rounded-2xl ${member.avatarColor} text-white font-display font-extrabold text-4xl flex items-center justify-center`}
              >
                {member.initials}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-center lg:justify-start">
                <Badge variant="blue" size="sm">{member.section}</Badge>
              </div>
              <h1 className="font-display text-2xl font-extrabold text-[#0B1220] dark:text-white tracking-tight pt-1">
                {member.name}
              </h1>
              <p className="text-sm font-semibold text-brand-blue dark:text-blue-400">
                {member.role}
              </p>
              {member.secondaryRole && (
                <p className="text-xs font-medium text-brand-green-dark dark:text-emerald-400">
                  + {member.secondaryRole}
                </p>
              )}
            </div>

            {/* Verified Contact Details */}
            {(member.email || member.linkedin) && (
              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-blue-400 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <GmailHoverIcon className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={`View LinkedIn profile for ${member.name}`}
                  >
                    <LinkedInIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="truncate">LinkedIn Profile</span>
                  </a>
                )}
              </div>
            )}

            <div className="pt-2">
              <Button
                href={member.linkedin ?? (member.email ? `mailto:${member.email}` : "/contact")}
                external={!!member.linkedin}
                variant="primary"
                size="md"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Connect with {member.name.split(" ").slice(-1)[0]}
              </Button>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <Badge variant="blue" size="sm">MEMBER PROFILE</Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
                {isFounder ? "Background & Philosophy" : "Role & Responsibilities"}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-base sm:text-lg">
                {member.longBio}
              </p>
            </div>

            {/* Key Focus Areas */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="space-y-5 pt-8 border-t border-slate-200/80 dark:border-slate-800">
                <h3 className="font-display text-xl font-bold text-[#0B1220] dark:text-white">
                  Key Focus Areas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {member.expertise.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 bg-slate-50/80 dark:bg-[#0E1422] p-4 rounded-xl border border-slate-200/90 dark:border-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-blue dark:text-blue-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#0B1220] dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
