import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <SectionHeading>Experience</SectionHeading>

          <div className="max-w-2xl">
            {experience.map((item, index) => (
              <div key={item.title} className="relative flex gap-4 sm:gap-6">
                <div className="w-16 shrink-0 pt-1.5 text-right sm:w-28">
                  {item.period && (
                    <p className="text-xs font-medium uppercase leading-snug tracking-wider text-accent">
                      {item.period}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <span
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-accent bg-background"
                    aria-hidden="true"
                  />
                  {index < experience.length - 1 && (
                    <span className="my-2 w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>

                <div className={index < experience.length - 1 ? "flex-1 pb-10" : "flex-1"}>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  {item.organization && (
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {item.organization}
                    </p>
                  )}
                  <ul className="mt-4 space-y-2.5">
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
