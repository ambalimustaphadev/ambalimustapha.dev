import { Container } from "@/components/ui/Container";

export const FOCUS_AREAS = [
  "Backend development",
  "REST APIs",
  "Database design",
  "Authentication",
  "Mobile applications",
  "System design",
];

export function Focus() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <h2 className="mb-5 text-sm font-medium text-foreground-secondary">
          What I&apos;m building around
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {FOCUS_AREAS.map((area) => (
            <li
              key={area}
              className="rounded-full border border-accent-soft bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent"
            >
              {area}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
