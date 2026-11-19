import gsap from "gsap";

export interface AnimationRefs {
  containerRef: React.RefObject<SVGSVGElement | null>;
  blueCharRef: React.RefObject<SVGGElement | null>;
  greenCharRef: React.RefObject<SVGGElement | null>;
  contactBurstRef: React.RefObject<SVGGElement | null>;
  contactPulseRef: React.RefObject<SVGCircleElement | null>;
  particlesGroupRef: React.RefObject<SVGGElement | null>;
  connectionCircleRef: React.RefObject<SVGGElement | null>;
  connectionLineBlueRef: React.RefObject<SVGLineElement | null>;
  connectionLineGreenRef: React.RefObject<SVGLineElement | null>;
  wordmarkGroupRef: React.RefObject<SVGGElement | null>;
  taglineGroupRef: React.RefObject<SVGGElement | null>;
}

export const buildSetsuzokuTimeline = (
  refs: AnimationRefs,
  onComplete?: () => void
): gsap.core.Timeline => {
  console.log("GSAP timeline created (10.0s reference master timeline)");

  const {
    blueCharRef,
    greenCharRef,
    contactBurstRef,
    contactPulseRef,
    particlesGroupRef,
    connectionCircleRef,
    connectionLineBlueRef,
    connectionLineGreenRef,
    wordmarkGroupRef,
    taglineGroupRef,
  } = refs;

  const blueChar = blueCharRef.current;
  const greenChar = greenCharRef.current;
  const contactBurst = contactBurstRef.current;
  const contactPulse = contactPulseRef.current;
  const particlesGroup = particlesGroupRef.current;
  const connectionCircle = connectionCircleRef.current;
  const connectionLineBlue = connectionLineBlueRef.current;
  const connectionLineGreen = connectionLineGreenRef.current;
  const wordmarkGroup = wordmarkGroupRef.current;
  const taglineGroup = taglineGroupRef.current;

  // Master 10-second timeline creation
  const tl = gsap.timeline({
    paused: true,
    onStart: () => {
      console.log("Loading animation started");
    },
    onComplete: () => {
      console.log("Loading animation completed");
      if (onComplete) onComplete();
    },
  });

  // Timeline Labels for strict reference rhythm matching
  tl.addLabel("start", 0.0)
    .addLabel("entrance", 0.8)
    .addLabel("approach", 1.5)
    .addLabel("prep", 2.7)
    .addLabel("highfive", 3.3)
    .addLabel("hold_highfive", 4.2)
    .addLabel("connection_line", 4.9)
    .addLabel("connection_circle", 5.2)
    .addLabel("settle", 5.9)
    .addLabel("wordmark", 6.4)
    .addLabel("tagline", 7.1)
    .addLabel("final_hold", 7.7);

  // 1. Synchronous Initial Setup (Phase 0: 0.00s - 0.80s Pure White Blank Screen)
  if (blueChar) {
    gsap.set(blueChar, { opacity: 0, x: -600, y: 0, scale: 1 });
    const blueRun = blueChar.querySelector("#blue-run-pose");
    const blueHf = blueChar.querySelector("#blue-highfive-pose");
    const blueTrails = blueChar.querySelectorAll(".blue-trail");
    if (blueRun) gsap.set(blueRun, { opacity: 1 });
    if (blueHf) gsap.set(blueHf, { opacity: 0 });
    if (blueTrails) gsap.set(blueTrails, { opacity: 0 });
  }

  if (greenChar) {
    gsap.set(greenChar, { opacity: 0, x: 600, y: 0, scale: 1 });
    const greenRun = greenChar.querySelector("#green-run-pose");
    const greenHf = greenChar.querySelector("#green-highfive-pose");
    const greenTrails = greenChar.querySelectorAll(".green-trail");
    if (greenRun) gsap.set(greenRun, { opacity: 1 });
    if (greenHf) gsap.set(greenHf, { opacity: 0 });
    if (greenTrails) gsap.set(greenTrails, { opacity: 0 });
  }

  if (contactBurst) {
    gsap.set(contactBurst, { opacity: 0, scale: 0, transformOrigin: "638px 180px" });
  }
  if (contactPulse) {
    gsap.set(contactPulse, { opacity: 0, scale: 0, transformOrigin: "638px 222px" });
  }
  if (particlesGroup) {
    const particles = particlesGroup.querySelectorAll(".particle");
    gsap.set(particles, { opacity: 0, scale: 0, x: 0, y: 0 });
  }

  if (connectionLineBlue) {
    gsap.set(connectionLineBlue, { strokeDashoffset: 250 });
  }
  if (connectionLineGreen) {
    gsap.set(connectionLineGreen, { strokeDashoffset: 250 });
  }

  if (connectionCircle) {
    gsap.set(connectionCircle, { opacity: 0, scale: 0, transformOrigin: "638px 380px" });
  }

  if (wordmarkGroup) {
    const letters = wordmarkGroup.querySelectorAll(".wordmark-letter");
    gsap.set(letters, { opacity: 0, y: 15, transformOrigin: "50% 50%" });
  }

  if (taglineGroup) {
    gsap.set(taglineGroup, { opacity: 0, y: 12 });
  }

  // 2. Phase 1: Character Entrance (0.80s - 1.50s)
  tl.to(
    blueChar,
    {
      duration: 0.7,
      x: -160,
      opacity: 1,
      ease: "power2.out",
    },
    0.8
  );

  if (blueChar) {
    const blueTrails = blueChar.querySelectorAll(".blue-trail");
    tl.to(
      blueTrails,
      {
        duration: 0.35,
        opacity: 0.6,
        stagger: 0.1,
        ease: "power1.out",
      },
      0.85
    ).to(
      blueTrails,
      {
        duration: 0.35,
        opacity: 0,
        ease: "power2.in",
      },
      1.15
    );
  }

  tl.to(
    greenChar,
    {
      duration: 0.7,
      x: 160,
      opacity: 1,
      ease: "power2.out",
    },
    0.8
  );

  if (greenChar) {
    const greenTrails = greenChar.querySelectorAll(".green-trail");
    tl.to(
      greenTrails,
      {
        duration: 0.35,
        opacity: 0.6,
        stagger: 0.1,
        ease: "power1.out",
      },
      0.85
    ).to(
      greenTrails,
      {
        duration: 0.35,
        opacity: 0,
        ease: "power2.in",
      },
      1.15
    );
  }

  // 3. Phase 2: Approach (1.50s - 2.70s)
  tl.to(
    blueChar,
    {
      duration: 1.2,
      x: -40,
      ease: "power3.out",
    },
    1.5
  );

  tl.to(
    greenChar,
    {
      duration: 1.2,
      x: 40,
      ease: "power3.out",
    },
    1.5
  );

  // 4. Phase 3: High-Five Preparation (2.70s - 3.30s)
  tl.to(
    blueChar,
    {
      duration: 0.6,
      x: 0,
      ease: "power2.inOut",
    },
    2.7
  );

  tl.to(
    greenChar,
    {
      duration: 0.6,
      x: 0,
      ease: "power2.inOut",
    },
    2.7
  );

  // Arm/Pose transition from Running to High-Five right before contact
  if (blueChar) {
    const blueRun = blueChar.querySelector("#blue-run-pose");
    const blueHf = blueChar.querySelector("#blue-highfive-pose");
    tl.to(blueRun, { duration: 0.15, opacity: 0, ease: "power1.in" }, 2.95)
      .to(blueHf, { duration: 0.15, opacity: 1, ease: "power1.out" }, 2.95);
  }

  if (greenChar) {
    const greenRun = greenChar.querySelector("#green-run-pose");
    const greenHf = greenChar.querySelector("#green-highfive-pose");
    tl.to(greenRun, { duration: 0.15, opacity: 0, ease: "power1.in" }, 2.95)
      .to(greenHf, { duration: 0.15, opacity: 1, ease: "power1.out" }, 2.95);
  }

  // 5. Phase 4: High-Five Hero Moment (3.30s - 4.20s)
  tl.to(
    [blueChar, greenChar],
    {
      duration: 0.08,
      scale: 0.97,
      ease: "power2.in",
    },
    3.3
  ).to(
    [blueChar, greenChar],
    {
      duration: 0.18,
      scale: 1.0,
      ease: "back.out(2)",
    },
    3.38
  );

  // Radial Impact Rays
  tl.fromTo(
    contactBurst,
    { scale: 0, opacity: 0 },
    { scale: 1.25, opacity: 1, duration: 0.2, ease: "power2.out" },
    3.3
  ).to(
    contactBurst,
    { scale: 1.0, opacity: 0.9, duration: 0.4, ease: "power1.inOut" },
    3.5
  );

  // Circular Pulse Wave
  tl.fromTo(
    contactPulse,
    { scale: 0, opacity: 0 },
    { scale: 1.5, opacity: 0.8, duration: 0.2, ease: "power2.out" },
    3.3
  ).to(
    contactPulse,
    { scale: 3.2, opacity: 0, duration: 0.45, ease: "power3.out" },
    3.5
  );

  // Particle Burst
  if (particlesGroup) {
    const particles = particlesGroup.querySelectorAll(".particle");
    particles.forEach((p, index) => {
      const angle = (index / particles.length) * Math.PI * 2;
      const distance = 40 + (index % 3) * 18;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      tl.to(
        p,
        {
          duration: 0.4,
          x: targetX,
          y: targetY,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        },
        3.3
      ).to(
        p,
        {
          duration: 0.3,
          opacity: 0,
          scale: 0.2,
          ease: "power1.in",
        },
        3.6
      );
    });
  }

  // 6. Phase 5: Hold High-Five Composition (4.20s - 4.90s)
  tl.to({}, { duration: 0.7 }, 4.2);

  // 7. Phase 6: Bottom Connection Line (4.90s - 5.50s)
  tl.to(
    [connectionLineBlue, connectionLineGreen],
    {
      duration: 0.6,
      strokeDashoffset: 0,
      ease: "power2.out",
    },
    4.9
  );

  // 8. Phase 7: Circular Connection Element (5.20s - 5.90s)
  tl.fromTo(
    connectionCircle,
    { scale: 0, opacity: 0, rotation: -45 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.7,
      ease: "back.out(1.7)",
    },
    5.2
  );

  // 9. Phase 8: Logo Settle (5.90s - 6.50s)
  tl.to(
    [blueChar, greenChar],
    {
      duration: 0.6,
      y: -2,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    },
    5.9
  );

  // 10. Phase 9: SETSUZOKU Wordmark Letter Reveal (6.40s - 7.10s)
  if (wordmarkGroup) {
    const letters = wordmarkGroup.querySelectorAll(".wordmark-letter");
    tl.to(
      letters,
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.07,
        ease: "power3.out",
      },
      6.4
    );
  }

  // 11. Phase 10: Tagline Reveal (7.10s - 7.70s)
  if (taglineGroup) {
    tl.to(
      taglineGroup,
      {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      },
      7.1
    );
  }

  // 12. Phase 11: Final Hold (7.70s - 10.00s) — Exact 2.3-second hold on completed logo
  tl.to({}, { duration: 2.3 }, 7.7);

  return tl;
};
