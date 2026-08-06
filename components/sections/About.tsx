import { Container } from "@/components/ui/Container";

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <Heading className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            About
          </Heading>

          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-foreground sm:text-xl">
            <p>
              I&apos;m Mustapha Ambali, a software developer with a
              background in Mass Communication. I moved from writing and
              communication into software because I became increasingly
              interested in how the things I used every day were actually
              built.
            </p>
            <p>
              These days, most of my time goes into building mobile
              applications and learning the engineering behind reliable
              backend systems. I work with Flutter, Python, Flask, REST
              APIs, databases, authentication, and the usual problems that
              appear once an application becomes more than just a screen.
            </p>
            <p>
              I like software that is straightforward to understand, easy
              to maintain, and dependable in the places that matter. I&apos;m
              still learning, but I take the engineering seriously —
              especially the decisions around architecture, data, security,
              and how different parts of a system fit together.
            </p>
            <p>
              I&apos;m interested in building useful products, working
              through difficult technical problems, and continuing to
              become a better engineer.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
