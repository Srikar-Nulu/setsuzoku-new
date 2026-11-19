import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Reveal,
  ArchitecturalCrosshair,
} from "@/components/ui/MotionPrimitives";
import { ArrowRight, MessageSquare } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]/70 dark:bg-[#0B101C]">
      <Container>
        <Reveal>
          <div className="relative rounded-2xl bg-[#0B1220] dark:bg-[#0E1422] border border-slate-800 p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
            {/* Blueprint architectural hairline grid */}
            <div
              className="absolute inset-0 bg-blueprint-dark mask-radial-fade pointer-events-none"
              aria-hidden="true"
            />
            {/* Top Brand Hairline */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-blue via-blue-400 to-emerald-400"
              aria-hidden="true"
            />

            {/* Precision corner crosshairs */}
            <ArchitecturalCrosshair className="hidden sm:block absolute top-5 left-5 text-slate-700" />
            <ArchitecturalCrosshair className="hidden sm:block absolute top-5 right-5 text-slate-700" />
            <ArchitecturalCrosshair className="hidden sm:block absolute bottom-5 left-5 text-slate-700" />
            <ArchitecturalCrosshair className="hidden sm:block absolute bottom-5 right-5 text-slate-700" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              <div className="lg:col-span-8 space-y-5 text-left">
                <Badge variant="navy" size="sm">
                  Let&apos;s Connect
                </Badge>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.08] text-white text-balance">
                  Have an idea?{" "}
                  <span className="text-emerald-400">Let&apos;s build it.</span>
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
                  Tell us what you&apos;re trying to build, improve, or
                  automate. Our engineering team will outline a clear technical
                  roadmap and architecture tailored to your goals.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Collaborate with Us
                </Button>

                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-slate-700 bg-slate-900/70 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500"
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  Contact Us Direct
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
