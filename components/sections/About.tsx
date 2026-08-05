import { Container } from "@/components/ui/Container";

const FOCUS_AREAS = [
  "Backend development",
  "REST APIs",
  "Database architecture",
  "Authentication",
  "Mobile applications",
  "System design",
];

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <Heading className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            About
          </Heading>

          <div className="max-w-2xl">
            <div className="space-y-5 text-lg leading-relaxed text-foreground sm:text-xl">
              <p>
                I&apos;m Mustapha Ambali, a software developer with a
                background in Mass Communication. I enjoy building software
                that is practical, reliable, and designed to solve real
                problems.
              </p>
              <p>
                My work spans mobile application development and backend
                engineering, with a growing focus on building scalable
                backend systems. I enjoy designing REST APIs, structuring
                databases, implementing secure authentication, and creating
                services that are clean, maintainable, and built to perform
                reliably.
              </p>
              <p>
                I care about writing software that goes beyond simply
                working. I pay close attention to architecture, code
                quality, performance, and the small implementation details
                that make applications easier to maintain and improve over
                time. Whether I&apos;m building a mobile app or a backend
                service, I approach every project with a focus on
                simplicity, reliability, and long-term maintainability.
              </p>
              <p>
                I&apos;m always looking for opportunities to build
                meaningful products, solve challenging technical problems,
                and contribute to teams that value thoughtful engineering
                and continuous improvement.
              </p>
            </div>

            <div className="mt-10">
              <p className="mb-4 text-sm font-medium text-foreground-secondary">
                Currently focused on
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {FOCUS_AREAS.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground-secondary"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
