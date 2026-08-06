import type { TechStackItem } from "@/data/techStack";

export function TechLogo({
  item,
  className,
}: {
  item: TechStackItem;
  className?: string;
}) {
  // Next.js's mark is officially black-on-light / white-on-dark, not a fixed
  // hex — so it inherits the theme's foreground instead of a literal color
  // that would vanish against a dark card.
  const color = item.name === "Next.js" ? undefined : item.color;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label={item.name}
      className={className}
      style={color ? { color } : undefined}
    >
      <path d={item.path} />
    </svg>
  );
}
