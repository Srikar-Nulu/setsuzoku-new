"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { teamData } from "@/data/team";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/ui/MotionPrimitives";
import { ArrowRight } from "lucide-react";
import { LinkedInIcon, GmailHoverIcon } from "@/components/ui/Icons";

export const TeamPreview: React.FC = () => {
  const router = useRouter();
  const selectedTeam = teamData.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#080C14] border-b border-slate-200/80 dark:border-slate-800/80">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <SectionHeading
              badge="Our Team"
              badgeVariant="blue"
              title="The people behind the technology."
              subtitle="Engineers, product architects, and technology strategists committed to software excellence."
              className="mb-0 max-w-2xl"
            />
            <div className="shrink-0">
              <Button
                href="/team"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Meet the Team
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Portrait-First Editorial Studio Gallery */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedTeam.map((member) => (
            <StaggerItem key={member.slug} className="flex">
              <div
                onClick={() => router.push(`/team/${member.slug}`)}
                className="group flex-1 bg-white dark:bg-[#0E1422] rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Portrait Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#131B2E] border-b border-slate-200/80 dark:border-slate-800">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div
                        className={`w-full h-full ${member.avatarColor} text-white font-display font-bold text-3xl flex items-center justify-center`}
                      >
                        {member.initials}
                      </div>
                    )}
                  </div>

                  {/* Typographic Nameplate & Bio */}
                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-display text-base font-bold text-[#0B1220] dark:text-slate-50 group-hover:text-brand-blue dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {member.name}
                      </h3>
                      {member.role && (
                        <p className="font-mono text-xs font-medium text-brand-blue dark:text-blue-400">
                          {member.role}
                        </p>
                      )}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between gap-2 text-xs">
                  <Link
                    href={`/team/${member.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-blue dark:group-hover:text-blue-400 inline-flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 shrink-0" />
                  </Link>

                  <div
                    className="flex items-center gap-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center justify-center shrink-0"
                        title="Email Member"
                        aria-label={`Email ${member.name}`}
                      >
                        <GmailHoverIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors inline-flex items-center justify-center shrink-0"
                        title="LinkedIn Profile"
                        aria-label={`View LinkedIn profile for ${member.name}`}
                      >
                        <LinkedInIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.12}>
          <div className="mt-12 flex justify-center">
            <Button
              href="/team"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Meet the Team
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
