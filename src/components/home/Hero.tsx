"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { HeroContent } from "./hero/HeroContent";
import { HeroNetwork } from "./hero/HeroNetwork";
import { ArchitecturalCrosshair } from "@/components/ui/MotionPrimitives";
import { ChevronDown } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-12 md:pt-16 md:pb-16 overflow-hidden bg-white dark:bg-[#080C14] border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Precision Architectural Blueprint Grid with Radial Fade */}
      <div
        className="absolute inset-0 bg-blueprint-light mask-radial-fade pointer-events-none"
        aria-hidden="true"
      />

      {/* Restrained Atmospheric Ambient Field */}
      <div
        className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.08] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-0 w-[520px] h-[520px] rounded-full bg-emerald-500/[0.035] dark:bg-emerald-500/[0.06] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Subtle Corner Drafting Marks */}
        <div className="relative">
          <ArchitecturalCrosshair className="hidden xl:block absolute -top-4 -left-4" />
          <ArchitecturalCrosshair className="hidden xl:block absolute -top-4 -right-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[490px] lg:min-h-[540px]">
            {/* LEFT: Editorial Display Statement & Primary Actions */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <HeroContent />
            </div>

            {/* RIGHT: Interactive Orbital Capability Network */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              <HeroNetwork />
            </div>
          </div>
        </div>

        {/* Architectural Bottom Anchor Rail */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            An Edu Alt Tech Company · Kakinada, Andhra Pradesh
          </p>

          <a
            href="#services-preview"
            onClick={(e) => {
              e.preventDefault();
              const elem = document.getElementById("services-preview");
              if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollBy({ top: 480, behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-blue-400 transition-colors cursor-pointer"
            aria-label="Scroll to explore services"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>

          <div className="hidden sm:flex items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-brand-blue dark:text-blue-400">Connect</span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
            <span className="text-emerald-600 dark:text-emerald-400">Create</span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">/</span>
            <span>Grow</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
