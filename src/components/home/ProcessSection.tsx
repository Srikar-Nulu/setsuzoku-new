"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { InteractiveCode } from "@/components/ui/InteractiveCode";
import { Reveal, STUDIO_EASE } from "@/components/ui/MotionPrimitives";
import {
  Search,
  Compass,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { clsx } from "clsx";

interface MethodologyStage {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
}

const methodologyStages: MethodologyStage[] = [
  {
    number: "01",
    title: "UNDERSTAND",
    description:
      "We understand your business, users, workflows and the problem worth solving.",
    details: [
      "Stakeholder Discovery",
      "User Persona Analysis",
      "Technical Feasibility",
    ],
    icon: <Search className="w-5 h-5 text-blue-400" />,
    accentColor: "text-blue-400",
    accentBg: "bg-blue-500",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "We shape the product, experience and technical direction around the real requirements.",
    details: [
      "Architecture Blueprint",
      "Interactive UI/UX",
      "Database & API Schema",
    ],
    icon: <Compass className="w-5 h-5 text-blue-400" />,
    accentColor: "text-blue-400",
    accentBg: "bg-blue-500",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "We engineer reliable software with quality, security and maintainability in mind.",
    details: [
      "Clean Modern Code",
      "Automated Testing",
      "CI/CD Pipeline Integration",
    ],
    icon: <InteractiveCode className="w-5 h-5 text-emerald-400" />,
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500",
  },
  {
    number: "04",
    title: "GROW",
    description:
      "We continuously improve, automate and evolve the system as your needs grow.",
    details: [
      "Performance Optimization",
      "Scalability Monitoring",
      "Feature Iterations",
    ],
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500",
  },
];

export const ProcessSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeStage = methodologyStages[activeIdx];

  return (
    <section className="relative py-20 sm:py-28 bg-[#070B13] dark:bg-[#060911] text-white overflow-hidden border-b border-slate-800">
      {/* Architectural blueprint texture */}
      <div
        className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl space-y-3.5">
              <Badge variant="navy" size="md">
                The Setsuzoku Methodology
              </Badge>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] text-balance">
                HOW WE CONNECT IDEAS TO{" "}
                <span className="text-emerald-400">GROWTH.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                From understanding the problem to continuously improving the
                solution, every stage stays connected. Select any stage to
                inspect the methodology.
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((prev) =>
                    prev === 0 ? methodologyStages.length - 1 : prev - 1
                  )
                }
                aria-label="Previous methodology stage"
                className="w-10 h-10 rounded-lg border border-slate-800 bg-[#0C1322] hover:border-slate-600 text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-slate-400 px-2 tabular-nums">
                {activeStage.number} / 04
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((prev) => (prev + 1) % methodologyStages.length)
                }
                aria-label="Next methodology stage"
                className="w-10 h-10 rounded-lg border border-slate-800 bg-[#0C1322] hover:border-slate-600 text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Interactive 4-Station Engineering Rail */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-slate-800 bg-[#0B1220] overflow-hidden">
            {/* Horizontal Station Selector Bar */}
            <div
              role="tablist"
              aria-label="Engineering process stages"
              className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-800 divide-y sm:divide-y-0 divide-x divide-slate-800/80"
            >
              {methodologyStages.map((stage, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={stage.number}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIdx(idx)}
                    className={clsx(
                      "relative px-5 sm:px-6 py-5 text-left transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400",
                      isActive
                        ? "bg-[#111A2E]"
                        : "hover:bg-[#0E1626]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="process-stage-rail"
                        transition={{ duration: 0.28, ease: STUDIO_EASE }}
                        className={clsx(
                          "absolute inset-x-0 top-0 h-[2px]",
                          stage.accentBg
                        )}
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={clsx(
                          "font-mono text-xs font-semibold tabular-nums",
                          isActive ? stage.accentColor : "text-slate-500"
                        )}
                      >
                        Stage {stage.number}
                      </span>
                      {idx < 3 ? (
                        <ArrowRight
                          className={clsx(
                            "w-3.5 h-3.5 transition-colors",
                            isActive ? stage.accentColor : "text-slate-700"
                          )}
                        />
                      ) : (
                        <span
                          className={clsx(
                            "font-mono text-[11px]",
                            isActive ? "text-emerald-400" : "text-slate-600"
                          )}
                        >
                          Continuous
                        </span>
                      )}
                    </div>

                    <span
                      className={clsx(
                        "block font-display text-sm sm:text-base font-bold tracking-[0.04em] transition-colors",
                        isActive ? "text-white" : "text-slate-400"
                      )}
                    >
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Editorial Readout */}
            <div
              role="tabpanel"
              className="p-7 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0E1627] via-[#0B1220] to-[#080E1A]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: STUDIO_EASE }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left: Stage Identity & Narrative */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <span
                        className={clsx(
                          "font-mono text-4xl sm:text-5xl font-bold tabular-nums tracking-tight",
                          activeStage.accentColor
                        )}
                      >
                        {activeStage.number}
                      </span>
                      <span
                        className="h-9 w-px bg-slate-800"
                        aria-hidden="true"
                      />
                      <div className="w-11 h-11 rounded-xl bg-[#131C31] border border-slate-700/80 flex items-center justify-center shrink-0">
                        {activeStage.icon}
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        {activeStage.title}
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                      {activeStage.description}
                    </p>
                  </div>

                  {/* Right: Stage Deliverables Checklist */}
                  <div className="lg:col-span-5 lg:border-l lg:border-slate-800/90 lg:pl-10 space-y-4">
                    <span className="font-mono text-xs text-slate-400 block">
                      Key Stage Deliverables
                    </span>
                    <ul className="space-y-3.5">
                      {activeStage.details.map((detail, dIdx) => (
                        <li
                          key={detail}
                          className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-800/80 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <Check
                              className={clsx(
                                "w-4 h-4 shrink-0",
                                activeStage.accentColor
                              )}
                            />
                            <span className="text-sm font-medium text-slate-100">
                              {detail}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                            0{dIdx + 1}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
