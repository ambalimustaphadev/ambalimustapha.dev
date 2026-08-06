import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { SITE_NAME, SITE_ROLE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="rounded-sm text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-1 text-sm text-foreground-secondary">{SITE_ROLE}</p>
          </div>

          <SocialLinks />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-foreground-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}
          </p>
          <p>Built with Next.js</p>
        </div>
      </Container>
    </footer>
  );
}
