import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TRUSTED_ORGANIZATIONS } from "@/data/trustedOrganizations";
import { Reveal } from "@/components/ui/MotionPrimitives";

export const TrustLogos: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 dark:bg-[#0B101C] border-b border-slate-200/80 dark:border-slate-800/80">
      <Container>
        <Reveal y={12} duration={0.45}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <p className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
              Trusted to build what matters
            </p>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400">
              Empowering institutions and educational enterprises with digital
              solutions
            </p>
          </div>

          {/* Unified Architectural 5-Logo Credibility Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-white/[0.97]">
            {TRUSTED_ORGANIZATIONS.map((org, idx) => (
              <div
                key={org.name}
                title={org.name}
                aria-label={org.name}
                className={`group relative border-r border-b border-slate-200/90 dark:border-slate-300/60 px-5 py-4 h-24 flex items-center justify-center overflow-hidden bg-white transition-colors duration-200 hover:bg-slate-50/70 ${
                  idx === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <Image
                  src={org.logo}
                  alt={org.alt}
                  width={160}
                  height={48}
                  unoptimized
                  className={`h-auto w-auto max-h-12 max-w-[84%] object-contain transition-transform duration-200 group-hover:scale-[1.04] ${org.sizeClass || ""}`}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
