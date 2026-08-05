import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";

const fieldStyles =
  "w-full rounded-md border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-secondary disabled:cursor-not-allowed disabled:opacity-60";

export function Contact({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Let&apos;s build something useful.
            </Heading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground-secondary">
              If you have a project, opportunity, or simply want to connect,
              I&apos;d be happy to hear from you.
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <div>
            <form aria-describedby="contact-form-note" className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  disabled
                  placeholder="Your name"
                  className={fieldStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  placeholder="you@example.com"
                  className={fieldStyles}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  disabled
                  placeholder="What are you working on?"
                  className={fieldStyles}
                />
              </div>
              <button
                type="submit"
                disabled
                className="inline-flex w-full items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background opacity-50 disabled:cursor-not-allowed sm:w-auto"
              >
                Send message
              </button>
              <p
                id="contact-form-note"
                className="text-sm text-foreground-secondary"
              >
                This form isn&apos;t connected yet — please reach out directly
                by email for now.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
