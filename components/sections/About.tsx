import { Container } from "@/components/ui/Container";

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="about" className="py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <Heading className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            About
          </Heading>

          <div className="max-w-xl space-y-4 text-base leading-relaxed text-foreground sm:text-lg">
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
        </div>
      </Container>
    </section>
  );
}
