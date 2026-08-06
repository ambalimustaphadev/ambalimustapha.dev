import { Container } from "@/components/ui/Container";

export function Education() {
  return (
    <section id="education" className="border-t border-border py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Education
          </h2>

          <div className="max-w-xl">
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
