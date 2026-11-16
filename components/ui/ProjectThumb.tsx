import Image from "next/image";
import type { Project } from "@/types";

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

/**
 * A project's screenshot, or — for projects without one yet — a branded
 * placeholder in the template's accent colours (never a stock photo).
 */
export function ProjectThumb({
  project,
  className = "w-100",
  sizes = "(min-width: 992px) 50vw, 100vw",
  preload = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  if (project.image) {
    return (
      <Image
        className={`${className} ambali-project-image`}
        src={project.image}
        alt={project.imageAlt ?? `${project.title} screenshot`}
        width={project.imageSize?.width ?? 1200}
        height={project.imageSize?.height ?? 900}
        sizes={sizes}
        preload={preload}
        // Inline so it wins over the template's per-card `object-fit: cover`.
        style={
          project.imageBackdrop
            ? { objectFit: "contain", background: project.imageBackdrop }
            : undefined
        }
      />
    );
  }

  return (
    <div
      className={`${className} ambali-project-placeholder`}
      role="img"
      aria-label={`${project.title} — screenshot coming soon`}
    >
      <span className="ambali-project-placeholder__mark" aria-hidden="true">
        {initials(project.title)}
      </span>
      <span className="ambali-project-placeholder__label" aria-hidden="true">
        {project.category}
      </span>
    </div>
  );
}
