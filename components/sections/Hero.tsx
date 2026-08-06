"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { RESUME_PATH, SITE_NAME } from "@/lib/constants";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--color-accent),transparent)] opacity-[0.06]"
      />
      <Container>
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          variants={container}
          className="max-w-2xl"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            {SITE_NAME}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-xl font-medium text-foreground-secondary sm:text-2xl"
          >
            Software Developer building mobile apps and backend systems.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg"
          >
            I work mainly with Flutter and Python, building mobile
            applications, REST APIs, and the systems behind them. I&apos;m
            interested in clean architecture, databases, authentication, and
            software that holds up beyond the first version.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-4">
            <Button href="/projects">
              View my work
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button href={RESUME_PATH} variant="secondary">
              Download CV
              <Download size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
