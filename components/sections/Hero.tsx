"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { RESUME_PATH, SITE_ROLE } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--color-accent),transparent)] opacity-[0.06]"
      />
      <Container>
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-5 text-sm text-foreground-secondary"
          >
            {SITE_ROLE}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            I build mobile apps and backend systems that solve real problems.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            I work mainly with Flutter and Python, building mobile
            experiences, REST APIs, and the systems behind them. I&apos;m
            especially interested in clean architecture, databases,
            authentication, and the engineering that makes software reliable.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Button href="/projects">
              View my work
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button href={RESUME_PATH} variant="secondary">
              Download CV
              <Download size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-12">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
