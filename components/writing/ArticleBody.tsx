import type { ReactNode } from "react";
import { headingId } from "@/lib/writing";
import type { ArticleBlock } from "@/types";

/**
 * Renders the small inline syntax used in article text — `code` and **bold** —
 * as React elements (no HTML strings, so nothing is injected).
 */
export function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));
    const token = match[0];
    parts.push(
      token.startsWith("`") ? (
        <code key={index}>{token.slice(1, -1)}</code>
      ) : (
        <strong key={index}>{token.slice(2, -2)}</strong>
      ),
    );
    lastIndex = index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

const LANGUAGE_LABELS: Record<string, string> = {
  dart: "Dart",
  python: "Python",
  json: "JSON",
};

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="ambali-article__body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} id={headingId(block.text)}>
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} id={headingId(block.text)}>
                {block.text}
              </h3>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={index}>
                {block.items.map((item) => (
                  <li key={item}>
                    <InlineText text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <figure key={index} className="ambali-article__code">
                <figcaption>{LANGUAGE_LABELS[block.language] ?? block.language}</figcaption>
                <pre tabIndex={0}>
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          default:
            return (
              <p key={index}>
                <InlineText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
