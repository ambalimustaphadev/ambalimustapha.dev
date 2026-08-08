import { Code2, Database, Server, Smartphone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TechLogo } from "@/components/ui/TechLogo";
import { TECH_STACK } from "@/data/techStack";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<string, { icon: LucideIcon; label?: string }> = {
  Languages: { icon: Code2 },
  Mobile: { icon: Smartphone, label: "Mobile Development" },
  Backend: { icon: Server, label: "Backend Development" },
  Databases: { icon: Database },
  Tools: { icon: Wrench },
};

const TECH_BY_NAME = new Map(TECH_STACK.map((tech) => [tech.name, tech]));

export function Skills() {
  return (
    <section id="tools" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-center gap-3">
          <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Skills
          </h2>
        </div>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
          The tools I use to build mobile apps, backend systems, and modern web experiences.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {skills.map((group, index) => {
            const meta = CATEGORY_META[group.category];
            const Icon = meta?.icon ?? Wrench;
            const isLastOdd = index === skills.length - 1 && skills.length % 2 === 1;

            return (
              <div
                key={group.category}
                className={cn(
                  "rounded-2xl border border-border bg-surface p-5 sm:p-6",
                  isLastOdd && "sm:col-span-2",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {meta?.label ?? group.category}
                  </h3>
                </div>

                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const tech = TECH_BY_NAME.get(item);
                    return (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary"
                      >
                        {tech && <TechLogo item={tech} className="h-3 w-3 shrink-0" />}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
