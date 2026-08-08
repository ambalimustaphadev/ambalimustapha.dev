import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FUTURE_TOPICS, posts } from "@/data/writing";

export function Writing({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const isHomepage = headingLevel === "h2";
  const displayPosts = isHomepage ? posts.slice(0, 3) : posts;

  return (
    <section id="writing" className="py-16 sm:py-24">
      <Container>
        <div className="flex items-center gap-3">
          <span className="h-5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <Heading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Writing
          </Heading>
        </div>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-foreground-secondary sm:text-lg">
          Notes on software, learning, and things I&apos;m figuring out.
        </p>

        <div className="mt-10 max-w-2xl">
          {displayPosts.length > 0 ? (
            <>
              <ul className="space-y-6">
                {displayPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/writing/${post.slug}`}
                      className="group inline-flex items-center gap-1.5 text-lg font-medium text-foreground transition-colors duration-200 hover:text-accent"
                    >
                      {post.title}
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                    <p className="mt-1 text-sm text-foreground-secondary">{post.excerpt}</p>
                  </li>
                ))}
              </ul>
              {isHomepage && (
                <div className="mt-8">
                  <Button href="/writing" variant="secondary">
                    View All Articles
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 sm:p-8">
              <p className="text-base leading-relaxed text-foreground-secondary">
                I haven&apos;t published anything here yet. When I have
                something worth sharing about a project, a technical
                problem, or something I&apos;ve learned, I&apos;ll put it
                here.
              </p>
              <p className="mt-5 text-sm font-medium text-foreground-secondary">
                Things I might write about
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
      </Container>
    </section>
  );
}
