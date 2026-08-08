"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Intensity = "strong" | "subtle";

type IntensityConfig = {
  /** [rampInEnd, rampOutStart] as fractions of the section's scroll-through. */
  pace: [number, number];
  y: { in: number; out: number };
  scale: { in: number; out: number };
  opacity: { in: number; out: number };
};

const PRESETS: Record<Intensity, IntensityConfig> = {
  // Hero, Featured Projects, About — the storytelling sections. A slightly
  // longer, more deliberate arrival and a visible (but still small) recede.
  strong: {
    pace: [0.3, 0.7],
    y: { in: 40, out: -12 },
    scale: { in: 0.97, out: 0.97 },
    opacity: { in: 0, out: 0.82 },
  },
  // Experience, Skills, Education, Writing, Contact — settle in quickly and
  // quietly, no scale at all, and barely recede so they never pull focus
  // away from the storytelling sections above.
  subtle: {
    pace: [0.15, 0.85],
    y: { in: 16, out: -4 },
    scale: { in: 1, out: 1 },
    opacity: { in: 0.5, out: 0.94 },
  },
};

/**
 * Wraps a homepage section so it rises gently into focus as it scrolls into
 * view, then recedes just as gently as the next section takes over — driven
 * continuously by scroll position (not a discrete on/off trigger), using
 * only opacity/transform so it stays compositor-only and cheap.
 */
export function ScrollReveal({
  children,
  intensity = "subtle",
}: {
  children: ReactNode;
  intensity?: Intensity;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const config = PRESETS[intensity];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduced-motion output stays fixed (1 / 0 / 1) regardless of scroll
  // position. The transform functions (not the `style` prop) branch on this,
  // since motion values keep a live DOM binding once passed to `style` —
  // toggling the `style` prop itself between renders doesn't reliably let go
  // of that binding.
  const opacity = useTransform(scrollYProgress, (v) =>
    shouldReduceMotion ? 1 : mapValue(v, config.pace, 1, config.opacity.in, config.opacity.out),
  );
  const y = useTransform(scrollYProgress, (v) =>
    shouldReduceMotion ? 0 : mapValue(v, config.pace, 0, config.y.in, config.y.out),
  );
  const scale = useTransform(scrollYProgress, (v) =>
    shouldReduceMotion ? 1 : mapValue(v, config.pace, 1, config.scale.in, config.scale.out),
  );

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

/**
 * Three-phase scroll-linked value: ramps from `start` toward `settled` as
 * progress moves through [0, pace[0]], holds at `settled` through the middle,
 * then ramps toward `end` through [pace[1], 1].
 */
function mapValue(
  progress: number,
  pace: [number, number],
  settled: number,
  start: number,
  end: number,
) {
  const [rampInEnd, rampOutStart] = pace;
  if (progress < rampInEnd) return lerp(start, settled, progress / rampInEnd);
  if (progress < rampOutStart) return settled;
  return lerp(settled, end, (progress - rampOutStart) / (1 - rampOutStart));
}

function lerp(start: number, end: number, t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return start + (end - start) * clamped;
}
