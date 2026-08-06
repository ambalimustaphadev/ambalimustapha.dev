import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="contact" className="border-t border-border py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have something you&apos;re working on?
            </Heading>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary sm:text-lg">
              Whether it&apos;s a project, an opportunity, or just a
              technical conversation, I&apos;d be happy to hear from you.
            </p>
            <p className="mt-6 text-sm text-foreground-secondary">
              Prefer email? Reach me directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              or find me on{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
