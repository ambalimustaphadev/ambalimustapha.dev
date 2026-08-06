import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { CaseStudySection } from "@/types";

export function CaseStudySections({ sections }: { sections: CaseStudySection[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <div
          key={section.heading}
          className={cn("py-10 sm:py-14", index > 0 && "border-t border-border")}
        >
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
              <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
                {section.heading}
              </h2>

              <div className="max-w-xl space-y-4">
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-foreground-secondary sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2.5 pt-1">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-base leading-relaxed text-foreground"
                      >
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Container>
        </div>
      ))}
    </>
  );
}
