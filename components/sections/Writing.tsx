import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FUTURE_TOPICS, posts } from "@/data/writing";

export function Writing({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;

  return (
    <section id="writing" className="border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-16">
          <Heading className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
            Writing
          </Heading>

          <div className="max-w-2xl">
            {posts.length > 0 ? (
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/writing/${post.slug}`}
                      className="group block text-lg font-medium text-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 text-sm text-foreground-secondary">
                      {post.excerpt}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <p className="text-base leading-relaxed text-foreground-secondary">
                  I haven&apos;t published anything yet. When I write about
                  backend development, Flutter, or lessons from building
                  these projects, it will show up here.
                </p>
                <p className="mt-6 text-sm font-medium text-foreground-secondary">
                  Topics I might write about
                </p>
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {FUTURE_TOPICS.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground-secondary"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
