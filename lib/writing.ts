import { posts } from "@/data/writing";
import type { ArticleBlock, WritingPost } from "@/types";

const WORDS_PER_MINUTE = 220;

export function getPostBySlug(slug: string): WritingPost | undefined {
  return posts.find((post) => post.slug === slug);
}

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case "list":
      return block.items.join(" ");
    case "code":
      return ""; // code is skimmed, not read word by word
    default:
      return block.text;
  }
}

/** Estimated reading time in whole minutes (at least 1). */
export function readingMinutes(post: WritingPost): number {
  const words = post.content
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** e.g. "12 November 2026" — formatted in UTC so server and client agree. */
export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** URL-safe id for an in-article heading. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
