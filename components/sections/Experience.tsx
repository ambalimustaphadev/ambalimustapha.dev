import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-center gap-3">
          <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Experience
          </h2>
        </div>
        <p className="mt-4 text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
          My professional journey so far.
        </p>

        <div className="mt-10 max-w-2xl sm:mt-12">
          {experience.map((item, index) => {
            const isLast = index === experience.length - 1;
            return (
              <div key={item.title} className="relative flex gap-4 sm:gap-6">
                <div className="hidden w-28 shrink-0 pt-1.5 text-right sm:block">
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
                  {!isLast && <span className="my-2 w-px flex-1 bg-border" aria-hidden="true" />}
                </div>

                <div className={cn("min-w-0 flex-1", !isLast && "pb-8 sm:pb-10")}>
                  {item.period && (
                    <p className="text-xs font-medium uppercase leading-snug tracking-wider text-accent sm:hidden">
                      {item.period}
                    </p>
                  )}
                  <h3 className="mt-1 text-lg font-semibold text-foreground sm:mt-0 sm:text-xl">
                    {item.title}
                  </h3>
                  {item.organization && (
                    <p className="mt-1 text-sm text-foreground-secondary">{item.organization}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
