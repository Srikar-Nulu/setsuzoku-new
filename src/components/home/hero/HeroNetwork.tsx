"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { NetworkHub } from "./NetworkHub";
import { CapabilityNode, NodeInfo } from "./CapabilityNode";
import { useTheme } from "@/components/theme/ThemeProvider";

export const orbitalNodesData: NodeInfo[] = [
  {
    id: "ideas",
    title: "IDEAS",
    subtitle: "Vision to Strategy",
    iconName: "ideas",
    colorHex: "#0066FF",
    badgeBg: "bg-blue-50 dark:bg-blue-500/15",
    badgeBorder: "border-blue-200/80 dark:border-blue-500/30",
    badgeText: "text-brand-blue dark:text-blue-400",
    angleDeg: -72,
    radiusPx: 165,
  },
  {
    id: "software",
    title: "SOFTWARE",
    subtitle: "Custom Development",
    iconName: "software",
    colorHex: "#10B981",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-200/80 dark:border-emerald-500/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    angleDeg: 0,
    radiusPx: 170,
  },
  {
    id: "automation",
    title: "AUTOMATION",
    subtitle: "Smarter Operations",
    iconName: "automation",
    colorHex: "#0EA5E9",
    badgeBg: "bg-sky-50 dark:bg-sky-500/15",
    badgeBorder: "border-sky-200/80 dark:border-sky-500/30",
    badgeText: "text-sky-600 dark:text-sky-400",
    angleDeg: 72,
    radiusPx: 164,
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Scale Together",
    iconName: "growth",
    colorHex: "#00A844",
    badgeBg: "bg-emerald-50 dark:bg-emerald-500/15",
    badgeBorder: "border-emerald-200/80 dark:border-emerald-500/30",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    angleDeg: 144,
    radiusPx: 168,
  },
  {
    id: "ai",
    title: "AI",
    subtitle: "Intelligent Solutions",
    iconName: "ai",
    colorHex: "#2563EB",
    badgeBg: "bg-blue-50 dark:bg-blue-500/15",
    badgeBorder: "border-blue-200/80 dark:border-blue-500/30",
    badgeText: "text-blue-700 dark:text-blue-400",
    angleDeg: 216,
    radiusPx: 166,
  },
];

/* --------------------------------------------------------------------------
 * 3D GEODESIC ICOSAHEDRON MESH GENERATOR (Subdivided Frequency-2 Sphere)
 * Produces 42 unit-sphere vertices and 120 crisp triangulated edges.
 * -------------------------------------------------------------------------- */
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface GeodesicMesh {
  vertices: Vec3[];
  edges: [number, number][];
}

function normalizeVec(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function buildGeodesicMesh(): GeodesicMesh {
  const t = (1 + Math.sqrt(5)) / 2;
  const rawVerts: Vec3[] = [
    { x: -1, y: t, z: 0 },
    { x: 1, y: t, z: 0 },
    { x: -1, y: -t, z: 0 },
    { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t },
    { x: 0, y: 1, z: t },
    { x: 0, y: -1, z: -t },
    { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 },
    { x: t, y: 0, z: 1 },
    { x: -t, y: 0, z: -1 },
    { x: -t, y: 0, z: 1 },
  ].map(normalizeVec);

  const baseFaces: [number, number, number][] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const vertices: Vec3[] = [...rawVerts];
  const midpointCache = new Map<string, number>();

  const getMidpoint = (i1: number, i2: number): number => {
    const key = i1 < i2 ? `${i1}-${i2}` : `${i2}-${i1}`;
    const existing = midpointCache.get(key);
    if (existing !== undefined) return existing;

    const a = vertices[i1];
    const b = vertices[i2];
    const mid = normalizeVec({
      x: (a.x + b.x) * 0.5,
      y: (a.y + b.y) * 0.5,
      z: (a.z + b.z) * 0.5,
    });
    const idx = vertices.length;
    vertices.push(mid);
    midpointCache.set(key, idx);
    return idx;
  };

  const subdividedFaces: [number, number, number][] = [];
  for (const [a, b, c] of baseFaces) {
    const ab = getMidpoint(a, b);
    const bc = getMidpoint(b, c);
    const ca = getMidpoint(c, a);
    subdividedFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  const addEdge = (i1: number, i2: number) => {
    const key = i1 < i2 ? `${i1}-${i2}` : `${i2}-${i1}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push(i1 < i2 ? [i1, i2] : [i2, i1]);
    }
  };

  for (const [a, b, c] of subdividedFaces) {
    addEdge(a, b);
    addEdge(b, c);
    addEdge(c, a);
  }

  return { vertices, edges };
}

const GEODESIC_MESH = buildGeodesicMesh();

/* Distinct 3D orbital planes tilted across latitudes so pills weave naturally around & never sit on top of center logo */
interface OrbitPlaneConfig {
  phaseOffset: number;
  tiltX: number;
  tiltZ: number;
  rx: number;
  ry: number;
  rz: number;
  yBias: number;
}

const NODE_ORBITS: OrbitPlaneConfig[] = [
  { phaseOffset: -1.15, tiltX: 0.54, tiltZ: -0.22, rx: 168, ry: 122, rz: 132, yBias: -14 },
  { phaseOffset: 0.12, tiltX: 0.42, tiltZ: 0.28, rx: 174, ry: 112, rz: 138, yBias: 16 },
  { phaseOffset: 1.38, tiltX: -0.48, tiltZ: -0.18, rx: 164, ry: 128, rz: 128, yBias: 12 },
  { phaseOffset: 2.65, tiltX: 0.58, tiltZ: 0.14, rx: 170, ry: 118, rz: 134, yBias: -18 },
  { phaseOffset: 3.92, tiltX: -0.38, tiltZ: 0.26, rx: 166, ry: 124, rz: 130, yBias: 8 },
];

function computeNode3DPosition(orbit: OrbitPlaneConfig, theta: number) {
  const angle = theta + orbit.phaseOffset;
  const x0 = Math.cos(angle) * orbit.rx;
  const z0 = Math.sin(angle) * orbit.rz;

  // Pitch around X so front/back points arc cleanly above/below center core
  const cosX = Math.cos(orbit.tiltX);
  const sinX = Math.sin(orbit.tiltX);
  const y1 = -z0 * sinX + orbit.yBias;
  const z1 = z0 * cosX;

  // Roll around Z for organic multi-axis symmetry
  const cosZ = Math.cos(orbit.tiltZ);
  const sinZ = Math.sin(orbit.tiltZ);
  const x2 = x0 * cosZ - y1 * sinZ;
  const y2 = x0 * sinZ + y1 * cosZ;

  // Perspective scale factor
  const perspective = 640 / (640 - z1 * 0.65);
  return {
    x: x2 * perspective,
    y: y2 * perspective,
    z: z1,
  };
}

export const HeroNetwork: React.FC = () => {
  const { theme } = useTheme();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [featuredNodeId, setFeaturedNodeId] = useState<string>("software");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isVisibleRef = useRef<boolean>(true);
  const hoveredIdRef = useRef<string | null>(null);
  const themeRef = useRef<string>(theme);
  const featuredIdRef = useRef<string>("software");

  useEffect(() => {
    hoveredIdRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const setNodeRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      nodeRefs.current[index] = el;
    },
    []
  );

  // Respect prefers-reduced-motion dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause non-essential RAF work when hero is scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 60fps 3D Geodesic Wireframe Sphere + 3D Orbital Node Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LOGICAL_SIZE = 500;
    const CENTER = LOGICAL_SIZE / 2;
    const SPHERE_RADIUS = 148;
    const FOCAL_LENGTH = 620;

    let rafId = 0;
    let lastTime = performance.now();
    let sphereRotY = 0.45;
    let sphereRotX = 0.28;
    let orbitTheta = 0;
    let speedMultiplier = 1;

    const syncCanvasResolution = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== LOGICAL_SIZE * dpr || canvas.height !== LOGICAL_SIZE * dpr) {
        canvas.width = LOGICAL_SIZE * dpr;
        canvas.height = LOGICAL_SIZE * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (now: number, dt: number) => {
      syncCanvasResolution();
      const isDark = themeRef.current === "dark";
      const activeHover = hoveredIdRef.current;

      // Smoothly decelerate orbit while hovering any capability node
      const targetSpeed = activeHover ? 0.1 : 1;
      speedMultiplier += (targetSpeed - speedMultiplier) * Math.min(1, dt * 6);

      if (!reducedMotion) {
        sphereRotY += dt * 0.34 * speedMultiplier;
        sphereRotX = 0.26 + Math.sin(now * 0.00045) * 0.1;
        orbitTheta += dt * 0.34 * speedMultiplier;
      }

      ctx.clearRect(0, 0, LOGICAL_SIZE, LOGICAL_SIZE);

      // 1. Project all 42 geodesic sphere vertices
      const cosY = Math.cos(sphereRotY);
      const sinY = Math.sin(sphereRotY);
      const cosX = Math.cos(sphereRotX);
      const sinX = Math.sin(sphereRotX);

      const projectedVerts = GEODESIC_MESH.vertices.map((v) => {
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        const wz = z2 * SPHERE_RADIUS;
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH - wz);
        return {
          sx: CENTER + x1 * SPHERE_RADIUS * scale,
          sy: CENTER + y2 * SPHERE_RADIUS * scale,
          zNorm: z2, // [-1..+1]
          yNorm: y2,
          xNorm: x1,
        };
      });

      // 2. Depth-sort 120 edges back-to-front for crisp 3D occlusion clarity
      const sortedEdges = GEODESIC_MESH.edges
        .map(([i1, i2]) => {
          const p1 = projectedVerts[i1];
          const p2 = projectedVerts[i2];
          return {
            p1,
            p2,
            avgZ: (p1.zNorm + p2.zNorm) * 0.5,
            avgY: (p1.yNorm + p2.yNorm) * 0.5,
            avgX: (p1.xNorm + p2.xNorm) * 0.5,
          };
        })
        .sort((a, b) => a.avgZ - b.avgZ);

      // Draw geodesic wireframe edges with Cobalt -> Cyan -> Emerald brand harmony
      for (const edge of sortedEdges) {
        const depthT = (edge.avgZ + 1) * 0.5; // 0 (back) .. 1 (front)
        const alpha = isDark
          ? 0.14 + depthT * 0.56
          : 0.14 + depthT * 0.52;

        // Smooth brand gradient mix based on spatial position
        const hueMix = (edge.avgX * 0.45 - edge.avgY * 0.55 + 1) * 0.5;
        let r: number;
        let g: number;
        let b: number;

        if (hueMix < 0.52) {
          // Setsuzoku Cobalt Blue (#0066FF / #3B82F6) -> Sky Cyan (#0EA5E9)
          const k = hueMix / 0.52;
          r = Math.round((isDark ? 59 : 0) + ((isDark ? 56 : 14) - (isDark ? 59 : 0)) * k);
          g = Math.round((isDark ? 130 : 102) + ((isDark ? 189 : 165) - (isDark ? 130 : 102)) * k);
          b = Math.round((isDark ? 246 : 255) + ((isDark ? 248 : 233) - (isDark ? 246 : 255)) * k);
        } else {
          // Sky Cyan -> Setsuzoku Emerald (#00C853 / #10B981)
          const k = (hueMix - 0.52) / 0.48;
          r = Math.round((isDark ? 56 : 14) + ((isDark ? 16 : 0) - (isDark ? 56 : 14)) * k);
          g = Math.round((isDark ? 189 : 165) + ((isDark ? 185 : 192) - (isDark ? 189 : 165)) * k);
          b = Math.round((isDark ? 248 : 233) + ((isDark ? 129 : 98) - (isDark ? 248 : 233)) * k);
        }

        ctx.beginPath();
        ctx.moveTo(edge.p1.sx, edge.p1.sy);
        ctx.lineTo(edge.p2.sx, edge.p2.sy);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.85 + depthT * 0.7;
        ctx.stroke();
      }

      // 3. Draw luminous wireframe vertices sorted back-to-front
      const sortedVerts = [...projectedVerts].sort((a, b) => a.zNorm - b.zNorm);
      for (const v of sortedVerts) {
        const depthT = (v.zNorm + 1) * 0.5;
        const isEmerald = v.xNorm - v.yNorm > 0.25;
        const radius = 1.4 + depthT * 1.5;
        const alpha = 0.25 + depthT * 0.68;

        if (depthT > 0.65) {
          ctx.beginPath();
          ctx.arc(v.sx, v.sy, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isEmerald
            ? isDark
              ? "rgba(16, 185, 129, 0.16)"
              : "rgba(0, 200, 83, 0.15)"
            : isDark
            ? "rgba(56, 189, 248, 0.18)"
            : "rgba(0, 102, 255, 0.16)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(v.sx, v.sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = isEmerald
          ? `rgba(${isDark ? "52, 211, 153" : "0, 180, 75"}, ${alpha.toFixed(3)})`
          : `rgba(${isDark ? "96, 165, 250" : "0, 102, 255"}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // 4. Update 3D orbital transforms directly on CapabilityNode DOM refs (zero React re-renders)
      let bestFrontId = featuredIdRef.current;
      let maxFrontZ = -Infinity;
      let hoveredScreenPos: { x: number; y: number; color: string } | null = null;

      orbitalNodesData.forEach((node, idx) => {
        const el = nodeRefs.current[idx];
        const orbit = NODE_ORBITS[idx];
        if (!el || !orbit) return;

        const pos = computeNode3DPosition(orbit, orbitTheta);
        const depthNorm = (pos.z + orbit.rz) / (2 * orbit.rz); // 0 (back) .. 1 (front)
        const isFront = pos.z >= -8;
        const isNodeHovered = activeHover === node.id;

        const scale = isNodeHovered
          ? 1.07
          : 0.8 + depthNorm * 0.24; // 0.80 back -> 1.04 front
        const opacity = isNodeHovered
          ? 1
          : isFront
          ? 0.92 + depthNorm * 0.08
          : 0.48 + depthNorm * 0.35;

        el.style.transform = `translate3d(calc(-50% + ${pos.x.toFixed(1)}px), calc(-50% + ${pos.y.toFixed(1)}px), 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = isNodeHovered ? "40" : isFront ? "30" : "10";

        if (isNodeHovered) {
          hoveredScreenPos = {
            x: CENTER + pos.x,
            y: CENTER + pos.y,
            color: node.colorHex,
          };
        }

        if (pos.z > maxFrontZ) {
          maxFrontZ = pos.z;
          bestFrontId = node.id;
        }
      });

      // Draw luminous connection beam from sphere center to hovered capability pill
      if (hoveredScreenPos) {
        const { x: tx, y: ty, color } = hoveredScreenPos;
        const grad = ctx.createLinearGradient(CENTER, CENTER, tx, ty);
        grad.addColorStop(0, "rgba(0, 102, 255, 0.15)");
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, color);

        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        const ctrlX = (CENTER + tx) * 0.5 + (CENTER - ty) * 0.12;
        const ctrlY = (CENTER + ty) * 0.5 + (tx - CENTER) * 0.12;
        ctx.quadraticCurveTo(ctrlX, ctrlY, tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (bestFrontId !== featuredIdRef.current) {
        featuredIdRef.current = bestFrontId;
        setFeaturedNodeId(bestFrontId);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      if (isVisibleRef.current) {
        drawFrame(now, dt);
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    // Draw initial frame synchronously
    drawFrame(lastTime, 0.016);
    if (!reducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div className="w-full flex items-center justify-center overflow-visible py-2 sm:py-4">
      <div
        ref={containerRef}
        className="relative w-[500px] h-[500px] aspect-square flex items-center justify-center mx-auto select-none overflow-visible scale-[0.64] min-[360px]:scale-[0.72] min-[420px]:scale-[0.82] sm:scale-[0.92] md:scale-[0.96] lg:scale-100 transition-transform duration-300 origin-center shrink-0"
      >
        {/* Subtle Soft Radial Atmosphere Glow Behind the 3D Sphere */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-blue-500/[0.11] via-sky-400/[0.08] to-emerald-500/[0.10] dark:from-blue-500/[0.18] dark:via-sky-400/[0.12] dark:to-emerald-500/[0.14] blur-3xl pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Subtle Outer Equatorial Orbital Trace Ring */}
        <div
          className="absolute inset-[68px] rounded-full border border-dashed border-blue-200/60 dark:border-blue-500/20 pointer-events-none z-0"
          style={{ transform: "rotateX(62deg) rotateZ(-14deg)" }}
          aria-hidden="true"
        />

        {/* High-DPI 3D Geodesic Wireframe Sphere Canvas (z-20) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* CENTRAL SETSUZOKU LUMINOUS CORE HUB (z-20) */}
        <div className="relative z-20 pointer-events-auto">
          <NetworkHub />
        </div>

        {/* 3D ORBITING FROSTED-GLASS CAPABILITY NODES (z-10 behind sphere, z-30 front pass) */}
        {orbitalNodesData.map((node, idx) => {
          const initPos = computeNode3DPosition(NODE_ORBITS[idx], 0);
          return (
            <CapabilityNode
              key={node.id}
              ref={setNodeRef(idx)}
              node={node}
              isHovered={hoveredNodeId === node.id}
              isFeatured={featuredNodeId === node.id}
              initialStyle={{
                transform: `translate3d(calc(-50% + ${initPos.x.toFixed(1)}px), calc(-50% + ${initPos.y.toFixed(1)}px), 0) scale(0.95)`,
                zIndex: initPos.z >= -8 ? 30 : 10,
              }}
              onHoverStart={() => setHoveredNodeId(node.id)}
              onHoverEnd={() => setHoveredNodeId(null)}
            />
          );
        })}
      </div>
    </div>
  );
};
