import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

type PageMetadataInput = {
  /** Page title; the layout's template appends " — Mustapha Ambali". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about" (resolved against metadataBase). */
  path: string;
  type?: "website" | "article";
  /** Optional share image; defaults to the generated /opengraph-image and /twitter-image. */
  image?: { url: string; alt: string };
  /** Articles only: ISO publication date, added as article:published_time. */
  publishedTime?: string;
};

/**
 * Per-page metadata with the page's own canonical URL and Open Graph/Twitter
 * fields. Next.js replaces (rather than merges) a parent's `openGraph` and
 * `twitter` objects when a page sets them, so every field — including the
 * share image — is set here explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  publishedTime,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [image ?? { url: "/opengraph-image", alt: SITE_NAME }],
      ...(type === "article" && publishedTime
        ? { publishedTime, authors: [SITE_NAME] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image?.url ?? "/twitter-image"],
    },
  };
}
