import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-16">
      <Container>
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-accent">
            404
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
            The page you&apos;re looking for doesn&apos;t exist or may have
            moved.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/">Back to home</Button>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-foreground-secondary transition-colors duration-200 hover:text-accent"
            >
              View my work
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
