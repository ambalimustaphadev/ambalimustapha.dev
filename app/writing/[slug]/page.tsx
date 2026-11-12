import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/writing/ArticleBody";
import { TmpButton } from "@/components/ui/TmpButton";
import { posts } from "@/data/writing";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
import { formatPostDate, getPostBySlug, readingMinutes } from "@/lib/writing";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/writing/${post.slug}`,
    type: "article",
    image: { url: post.cover.src, alt: post.cover.alt },
    publishedTime: post.date,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/writing/${post.slug}`;
  const minutes = readingMinutes(post);
  const related = posts.filter((other) => other.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.cover.src}`,
    datePublished: post.date,
    articleSection: post.category,
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  return (
    <article className="ambali-article">
      {/* Plain <script> so the structured data is in the server-rendered HTML. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="ambali-article__header">
        <div className="container">
          <div className="ambali-article__intro">
            <nav aria-label="Breadcrumb" className="ambali-article__crumbs">
              <Link href="/writing">Writing</Link>
              <i className="fa-solid fa-angle-right" aria-hidden="true" />
              <span>{post.category}</span>
            </nav>
            <h1 className="ambali-article__title">{post.title}</h1>
            <div className="ambali-article__meta">
              <span className="ambali-article__author">
                <Image
                  src="/branding/ma-logo.png"
                  alt=""
                  width={32}
                  height={32}
                  loading="eager"
                  className="ambali-article__avatar"
                />
                {SITE_NAME}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </div>
          </div>
          <div className="ambali-article__cover">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              width={post.cover.width}
              height={post.cover.height}
              sizes="(min-width: 1100px) 1040px, 100vw"
              preload
              loading="eager"
            />
          </div>
        </div>
      </header>

      <div className="container">
        <div className="ambali-article__content">
          <ArticleBody blocks={post.content} />

          <footer className="ambali-article__footer">
            <div className="ambali-article__byline">
              <Image
                src="/branding/ma-logo.png"
                alt=""
                width={48}
                height={48}
                className="ambali-article__avatar"
              />
              <p>
                Written by <Link href="/about">{SITE_NAME}</Link>, a software developer building
                Flutter mobile apps, Python backends and AI-powered products.
              </p>
            </div>

            {related.length > 0 && (
              <nav aria-label="More writing" className="ambali-article__related">
                <h2>Keep reading</h2>
                <ul>
                  {related.map((other) => (
                    <li key={other.slug}>
                      <Link href={`/writing/${other.slug}`}>
                        <span className="ambali-article__related-category">{other.category}</span>
                        <span className="ambali-article__related-title">{other.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <TmpButton href="/writing" className="btn-border btn-md">
              All Writing
            </TmpButton>
          </footer>
        </div>
      </div>
    </article>
  );
}
