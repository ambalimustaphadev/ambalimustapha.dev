import Image from "next/image";
import { Clock3, Download, Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FOCUS_AREAS } from "@/components/sections/Focus";
import { getPrimaryProjects } from "@/data/projects";
import { skills } from "@/data/skills";
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

const technologyCount = new Set(skills.flatMap((group) => group.items)).size;

const STATS = [
  {
    value: `${Math.max(1, new Date().getFullYear() - CAREER_START_YEAR)}+`,
    label: "Years building",
  },
  { value: `${getPrimaryProjects().length}`, label: "Projects in progress" },
  { value: `${technologyCount}+`, label: "Technologies" },
  { value: `${FOCUS_AREAS.length}`, label: "Focus areas" },
];

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="about" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[280px] lg:mx-0">
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
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <SectionHeading as={headingLevel}>About</SectionHeading>

            <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-foreground sm:text-lg">
              <p>
                I&apos;m Mustapha Ambali, a software developer with a
                background in Mass Communication. I moved into software
                because I became increasingly interested in how the things I
                used every day were actually built.
              </p>
              <p>
                These days, I spend most of my time building mobile
                applications and learning backend engineering through real
                projects — the kind where you have to actually deal with
                authentication, data, and the details that only show up once
                an app becomes more than a screen.
              </p>
              <p>
                I like software that&apos;s straightforward to understand and
                dependable in the places that matter. I&apos;m still
                learning, but I take it seriously — especially the decisions
                around architecture and how different parts of a system fit
                together.
              </p>
            </div>

            <div className="mt-7">
              <Button href={RESUME_PATH} variant="secondary">
                Download CV
                <Download size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>

            <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {INFO_ROWS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-foreground-secondary">{label}</dt>
                    <dd className="truncate text-sm font-medium text-foreground">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-surface px-4 py-4 text-center"
                >
                  <dd className="text-2xl font-semibold text-accent">{value}</dd>
                  <dt className="mt-1 text-xs text-foreground-secondary">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
