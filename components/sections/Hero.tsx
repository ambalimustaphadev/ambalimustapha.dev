"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TechLogo } from "@/components/ui/TechLogo";
import { TECH_STACK } from "@/data/techStack";

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
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <motion.div
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={container}
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Software Developer
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Mustapha <span className="text-accent">Ambali</span>
            </motion.h1>

            <motion.div variants={item} className="relative mx-auto mt-5 w-[200px] sm:hidden">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--color-accent),transparent_68%)] opacity-30 blur-3xl"
              />
              <div className="relative aspect-[9/8] w-full overflow-hidden">
                <Image
                  src="/images/port-pic.png"
                  alt="Portrait of Mustapha Ambali"
                  fill
                  priority
                  sizes="200px"
                  className="object-cover object-[center_82%] [mask-image:radial-gradient(ellipse_62%_68%_at_50%_50%,black_40%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_62%_68%_at_50%_50%,black_40%,transparent_95%)]"
                />
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-5 max-w-lg text-base leading-relaxed text-foreground-secondary sm:text-lg"
            >
              I build mobile apps and backend systems with Flutter and
              Python, focusing on clean architecture, scalable APIs, and
              software that solves real problems.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap max-[379px]:flex-col gap-4 max-[379px]:gap-3"
            >
              <Button href="/projects" className="max-[379px]:w-full min-[380px]:max-sm:flex-1">
                View My Projects
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="max-[379px]:w-full min-[380px]:max-sm:flex-1"
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-5">
              <SocialLinks />
            </motion.div>

            <motion.div variants={item} className="mt-8 sm:mt-10">
              <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
                Technologies I work with
              </p>
              <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-2 xl:gap-2.5">
                {TECH_STACK.map((tech) => {
                  const accent = tech.name === "Next.js" ? "var(--color-foreground)" : tech.color;
                  return (
                    <li
                      key={tech.name}
                      style={{ "--tech-accent": accent } as React.CSSProperties}
                      className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-border bg-surface px-1 py-3 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[color:var(--tech-accent)] hover:shadow-[0_12px_22px_-14px_var(--tech-accent)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-0.5"
                        style={{ backgroundColor: accent }}
                      />
                      <TechLogo item={tech} className="h-5 w-5 shrink-0" />
                      <span className="text-[10px] font-medium leading-tight text-foreground-secondary">
                        {tech.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? "visible" : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative mx-auto hidden w-full max-w-sm sm:block lg:max-w-lg"
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,var(--color-accent),transparent_68%)] opacity-30 blur-3xl"
            />
            <div className="relative aspect-[9/8] w-full overflow-hidden">
              <Image
                src="/images/port-pic.png"
                alt="Portrait of Mustapha Ambali"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 340px"
                className="object-cover object-[center_82%] [mask-image:radial-gradient(ellipse_62%_68%_at_50%_50%,black_40%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_62%_68%_at_50%_50%,black_40%,transparent_95%)]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
