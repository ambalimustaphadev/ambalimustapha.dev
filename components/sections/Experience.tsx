import { Container } from "@/components/ui/Container";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Experience
          </h2>

          <div className="max-w-xl space-y-8">
            {experience.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                {(item.organization || item.period) && (
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {[item.organization, item.period].filter(Boolean).join(" · ")}
                  </p>
                )}
                <ul className="mt-5 space-y-2.5">
                  {item.summary.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-base leading-relaxed text-foreground-secondary"
                    >
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
