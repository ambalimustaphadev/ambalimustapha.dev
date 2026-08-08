import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-center gap-3">
          <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Education
          </h2>
        </div>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
          The foundation behind what I build today.
        </p>

        <div className="mt-10 flex max-w-2xl gap-4 sm:gap-5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-accent"
            aria-hidden="true"
          >
            <GraduationCap size={18} strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">
              B.Sc. Mass Communication
            </h3>
            <p className="mt-1 text-sm text-foreground-secondary">
              Adekunle Ajasin University — Second Class Upper Division
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
              Studied Mass Communication with a focus on writing, media, and communication.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
