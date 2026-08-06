import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <SectionHeading>Education</SectionHeading>

          <div className="max-w-xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">
              B.Sc. Mass Communication
            </h3>
            <p className="mt-1 text-sm text-foreground-secondary">
              Adekunle Ajasin University · Second Class Upper Division
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
