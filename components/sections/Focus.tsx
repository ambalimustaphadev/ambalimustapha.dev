import { Container } from "@/components/ui/Container";

const FOCUS_AREAS = [
  "Backend development",
  "REST APIs",
  "Database design",
  "Authentication",
  "Mobile applications",
  "System design",
];

export function Focus() {
  return (
    <section className="border-t border-border py-10 sm:py-14">
      <Container>
        <h2 className="mb-5 text-sm font-medium text-foreground-secondary">
          What I&apos;m building around
        </h2>
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
      </Container>
    </section>
  );
}
