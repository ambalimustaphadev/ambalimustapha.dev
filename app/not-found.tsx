import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-28">
      <Container>
        <div className="max-w-lg">
          <p className="text-sm font-medium text-accent">404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
