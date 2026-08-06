import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";

export function RelatedProject({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((project) => project.slug === currentSlug);
  if (index === -1 || projects.length < 2) return null;

  const next = projects[(index + 1) % projects.length];

  return (
    <div className="border-t border-border py-16 sm:py-20">
      <Container>
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-sm text-foreground-secondary">Next project</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={20}
            strokeWidth={2}
            className="shrink-0 text-foreground-secondary transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </div>
  );
}
