import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <Heading className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s build something useful.
          </Heading>
          <p className="mt-5 text-lg leading-relaxed text-foreground-secondary">
            Have a project in mind, an opportunity to discuss, or just want
            to say hello? I&apos;d be happy to hear from you.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
              Email
            </Button>
            <Button href={GITHUB_URL} variant="secondary">
              <GithubIcon size={16} />
              GitHub
            </Button>
            {LINKEDIN_URL && (
              <Button href={LINKEDIN_URL} variant="secondary">
                <LinkedinIcon size={16} />
                LinkedIn
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
