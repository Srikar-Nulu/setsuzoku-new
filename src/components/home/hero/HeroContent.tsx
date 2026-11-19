"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { STUDIO_EASE } from "@/components/ui/MotionPrimitives";

export const HeroContent: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const itemMotion = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: STUDIO_EASE },
        };

  return (
    <div className="space-y-6 sm:space-y-7 text-left max-w-[590px] z-10 w-full">
      {/* Editorial Unboxed Eyebrow */}
      <motion.div {...itemMotion(0)}>
        <Badge variant="blue" size="sm">
          Global Software Engineering Company
        </Badge>
      </motion.div>

      {/* High-Impact Display Headline — Preserved Verbatim */}
      <motion.h1
        {...itemMotion(0.06)}
        className="font-display text-4xl sm:text-5xl lg:text-[60px] xl:text-[66px] font-extrabold tracking-[-0.035em] leading-[1.05] text-[#0B1220] dark:text-slate-50 text-balance"
      >
        We connect{" "}
        <span className="text-brand-blue dark:text-blue-400">ideas</span>{" "}
        to{" "}
        <span className="text-emerald-600 dark:text-emerald-400">impact.</span>
      </motion.h1>

      {/* Supporting Value Proposition — Preserved Verbatim */}
      <motion.p
        {...itemMotion(0.12)}
        className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-[1.68] font-normal max-w-[520px]"
      >
        Software, AI and digital products engineered to turn ambitious ideas
        into real-world growth.
      </motion.p>

      {/* Primary & Secondary Actions */}
      <motion.div
        {...itemMotion(0.18)}
        className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
      >
        <Button
          href="/contact"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Start a conversation
        </Button>

        <Button
          href="https://www.setsuzoku.info"
          external={true}
          variant="outline"
          size="lg"
          className="w-full sm:w-auto group"
          icon={
            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          }
        >
          Demo
        </Button>
      </motion.div>
    </div>
  );
};
