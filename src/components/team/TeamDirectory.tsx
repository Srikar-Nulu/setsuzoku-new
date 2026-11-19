"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { teamData, TeamMember } from "@/data/team";
import { ArrowRight } from "lucide-react";
import { LinkedInIcon, GmailHoverIcon } from "@/components/ui/Icons";

export function TeamDirectory() {
  const founder = teamData.find((m) => m.hierarchyLevel === "founder");
  const coordinationTeam = teamData.filter((m) => m.hierarchyLevel === "coordination");
  const developmentTeam = teamData.filter((m) => m.hierarchyLevel === "development");
  const marketingDesignTeam = teamData.filter((m) => m.hierarchyLevel === "marketing-design");

  const renderMemberCard = (member: TeamMember) => (
    <div
      key={member.slug}
      className="group relative bg-white dark:bg-[#0E1422] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-brand-blue/50 dark:hover:border-blue-500/50 hover:bg-slate-50/50 dark:hover:bg-[#131B2E] transition-all duration-200 flex flex-col justify-between space-y-5 overflow-hidden"
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      />

      <Link href={`/team/${member.slug}`} className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          {member.avatar ? (
            <Image
              src={member.avatar}
              alt={member.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-xl ${member.avatarColor} text-white font-display font-extrabold text-xl flex items-center justify-center shrink-0`}
            >
              {member.initials}
            </div>
          )}
          <div className="pt-0.5 space-y-1 min-w-0 flex-1">
            <h3 className="font-display text-base font-bold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors leading-snug">
              {member.name}
            </h3>
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-blue dark:text-blue-400 truncate">
              {member.role}
            </span>
            {member.secondaryRole && (
              <span className="block text-[11px] font-medium text-brand-green-dark dark:text-emerald-400">
                + {member.secondaryRole}
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-[13px] leading-relaxed line-clamp-3">
          {member.bio}
        </p>
      </Link>

      {/* Action Bar */}
      <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2 text-xs min-h-[36px]">
        <Link
          href={`/team/${member.slug}`}
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-blue dark:group-hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
        >
          <span>Profile</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 shrink-0" />
        </Link>

        <div
          className="flex items-center gap-1 text-slate-400 dark:text-slate-500 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center shrink-0 text-slate-400 hover:text-red-500"
              title="Email Member"
              aria-label={`Email ${member.name}`}
            >
              <GmailHoverIcon className="w-4 h-4 text-slate-400 hover:text-red-500" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center shrink-0 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
              title="LinkedIn Profile"
              aria-label={`View LinkedIn profile for ${member.name}`}
            >
              <LinkedInIcon className="w-4 h-4 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-20">
      {/* LEVEL 1 — FOUNDER */}
      {founder && (
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-slate-200/90 dark:border-slate-800 pb-4">
            <div className="space-y-1.5">
              <Badge variant="blue" size="sm">FOUNDER</Badge>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
                Founder
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Executive Direction
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="group relative bg-slate-50/70 dark:bg-[#0E1422] rounded-2xl p-7 sm:p-9 border border-slate-200/90 dark:border-slate-800 hover:border-brand-blue/50 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between space-y-6 overflow-hidden">
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue to-brand-green"
                aria-hidden="true"
              />

              <Link href={`/team/${founder.slug}`} className="space-y-5 flex-1 flex flex-col">
                <div className="flex items-start gap-5">
                  {/* Founder Avatar */}
                  {founder.avatar ? (
                    <Image
                      src={founder.avatar}
                      alt={founder.name}
                      width={88}
                      height={88}
                      priority
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div
                      className={`w-20 h-20 rounded-xl ${founder.avatarColor} text-white font-display font-black text-2xl flex items-center justify-center shrink-0`}
                    >
                      {founder.initials}
                    </div>
                  )}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-brand-blue dark:text-blue-400 block">
                      Founder
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B1220] dark:text-white group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {founder.name}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  {founder.bio}
                </p>
              </Link>

              {/* Action Bar */}
              <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs min-h-[40px]">
                <Link
                  href={`/team/${founder.slug}`}
                  className="text-xs sm:text-sm font-semibold text-[#0B1220] dark:text-slate-200 group-hover:text-brand-blue dark:group-hover:text-blue-400 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 shrink-0" />
                </Link>

                <div
                  className="flex items-center gap-2 text-slate-400 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {founder.email && (
                    <a
                      href={`mailto:${founder.email}`}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-[#131B2E] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center shrink-0 text-slate-400 hover:text-red-500 border border-slate-200 dark:border-slate-700"
                      title="Email Founder"
                      aria-label={`Email ${founder.name}`}
                    >
                      <GmailHoverIcon className="w-4 h-4 text-slate-400 hover:text-red-500" />
                    </a>
                  )}
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white dark:bg-[#131B2E] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center justify-center shrink-0 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700"
                      title="LinkedIn Profile"
                      aria-label={`View LinkedIn profile for ${founder.name}`}
                    >
                      <LinkedInIcon className="w-4 h-4 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LEVEL 2 — PROJECT COORDINATION & LEADERSHIP */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200/90 dark:border-slate-800 pb-4">
          <div className="space-y-1.5">
            <Badge variant="blue" size="sm">COORDINATION &amp; LEADERSHIP</Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
              Project Coordination &amp; Leadership
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider tabular-nums">
            {coordinationTeam.length} Members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coordinationTeam.map((member) => renderMemberCard(member))}
        </div>
      </section>

      {/* LEVEL 3 — DEVELOPMENT & ENGINEERING */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200/90 dark:border-slate-800 pb-4">
          <div className="space-y-1.5">
            <Badge variant="green" size="sm">ENGINEERING</Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
              Development &amp; Engineering
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider tabular-nums">
            {developmentTeam.length} Developers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {developmentTeam.map((member) => renderMemberCard(member))}
        </div>
      </section>

      {/* LEVEL 4 — MARKETING, DESIGN & CLIENT RELATIONS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-slate-200/90 dark:border-slate-800 pb-4">
          <div className="space-y-1.5">
            <Badge variant="blue" size="sm">CREATIVE &amp; CLIENT RELATIONS</Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1220] dark:text-[#F1F5F9] tracking-tight">
              Marketing, Design &amp; Client Relations
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider tabular-nums">
            {marketingDesignTeam.length} Members
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {marketingDesignTeam.map((member) => renderMemberCard(member))}
        </div>
      </section>
    </div>
  );
}
