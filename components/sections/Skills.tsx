import { Code2, Database, Server, Smartphone, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/skills";

const CATEGORY_META: Record<string, { icon: LucideIcon; label?: string }> = {
  Languages: { icon: Code2 },
  Mobile: { icon: Smartphone, label: "Mobile Development" },
  Backend: { icon: Server, label: "Backend Development" },
  Databases: { icon: Database },
  Tools: { icon: Wrench, label: "Dev Tools" },
};

export function Skills() {
  return (
    <section id="tools" className="py-16 sm:py-24">
      <Container>
        <SectionHeading>Skills</SectionHeading>
        <p className="mt-4 text-base leading-relaxed text-foreground-secondary sm:text-lg">
          Technologies and tools I work with.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const meta = CATEGORY_META[group.category];
            const Icon = meta?.icon ?? Wrench;
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-medium text-foreground">
                    {meta?.label ?? group.category}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
