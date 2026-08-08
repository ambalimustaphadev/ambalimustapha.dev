import Image from "next/image";
import { Clock3, Download, Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getPrimaryProjects } from "@/data/projects";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";
import {
  AVAILABILITY,
  CAREER_START_YEAR,
  CONTACT_EMAIL,
  LOCATION,
  RESUME_PATH,
  SITE_URL,
} from "@/lib/constants";

const INFO_ROWS = [
  { icon: MapPin, label: "Location", value: LOCATION },
  { icon: Mail, label: "Email", value: CONTACT_EMAIL },
  { icon: Globe, label: "Website", value: SITE_URL.replace(/^https?:\/\//, "") },
  { icon: Clock3, label: "Availability", value: AVAILABILITY },
];

// Border sides for a 4-item panel that's 1 column on mobile (stacked list)
// and 2 columns from sm+ (2x2 grid) — index order matches INFO_ROWS.
const INFO_BORDERS = [
  "border-b border-border sm:border-r",
  "border-b border-border",
  "border-b border-border sm:border-b-0 sm:border-r",
  "",
];

const technologyCount = new Set(skills.flatMap((group) => group.items)).size;

const STATS = [
  { value: `${getPrimaryProjects().length}`, label: "Projects" },
  {
    value: `${Math.max(1, new Date().getFullYear() - CAREER_START_YEAR)}+`,
    label: "Years Learning",
  },
  { value: `${technologyCount}+`, label: "Technologies" },
  { value: "100%", label: "Commitment" },
];

// Border sides for a 4-item panel that's 2 columns on mobile (2x2 grid) and
// 4 columns from sm+ (single row) — index order matches STATS.
const STATS_BORDERS = [
  "border-b border-r border-border sm:border-b-0",
  "border-b border-border sm:border-b-0 sm:border-r",
  "border-r border-border",
  "",
];

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="about" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-16">
          <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:mx-0 lg:max-w-[280px]">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_70%)] opacity-15 blur-2xl"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border bg-surface ring-4 ring-accent-soft">
              <Image
                src="/images/port-pic.png"
                alt="Mustapha Ambali"
                fill
                priority
                sizes="(min-width: 1024px) 280px, 260px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <Heading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                About Me
              </Heading>
            </div>

            <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-foreground-secondary sm:text-lg">
              <p>
                I&apos;m a software developer with a background in Mass
                Communication. I build practical mobile applications and
                backend systems with Flutter, Python, and PostgreSQL.
              </p>
              <p>
                I care about clean architecture, dependable systems, and
                software that solves real problems.
              </p>
            </div>

            <div className="mt-6">
              <Button
                href={RESUME_PATH}
                variant="secondary"
                className="border-accent text-accent hover:bg-accent-soft"
              >
                Download CV
                <Download size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                {INFO_ROWS.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={cn("flex items-start gap-3 px-5 py-4", INFO_BORDERS[i])}
                  >
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <dt className="text-xs text-foreground-secondary">{label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface">
              <dl className="grid grid-cols-2 sm:grid-cols-4">
                {STATS.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={cn("px-4 py-5 text-center", STATS_BORDERS[i])}
                  >
                    <dd className="text-2xl font-bold text-accent sm:text-[1.75rem]">
                      {value}
                    </dd>
                    <dt className="mt-1 text-xs text-foreground-secondary">{label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
