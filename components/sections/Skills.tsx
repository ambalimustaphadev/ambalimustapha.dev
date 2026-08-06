import { Container } from "@/components/ui/Container";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="tools" className="border-t border-border py-14 sm:py-20">
      <Container>
        <h2 className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
          Tools I work with
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-foreground">
                {group.category}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-foreground-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
