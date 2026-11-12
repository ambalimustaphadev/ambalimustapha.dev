import Link from "next/link";
import type { ReactNode } from "react";

type TmpButtonProps = {
  href: string;
  children: ReactNode;
  /** Extra Reeni button modifiers, e.g. "btn-border btn-md" or "w-100". */
  className?: string;
  /** Font Awesome classes for the sliding icon. Defaults to the template's arrow. */
  icon?: string;
};

const ARROW_ICON = "fa-sharp fa-regular fa-arrow-right";

function isPlainAnchor(href: string) {
  return (
    /^(https?:)?\/\//.test(href) ||
    href.startsWith("mailto:") ||
    // Static files (e.g. the CV PDF) are served from /public, not routed.
    /\.[a-z0-9]+$/i.test(href)
  );
}

/** The Reeni "hover-icon-reverse" pill button used throughout Demo 17. */
export function TmpButton({ href, children, className, icon = ARROW_ICON }: TmpButtonProps) {
  const classes = ["tmp-btn hover-icon-reverse radius-round", className].filter(Boolean).join(" ");
  const content = (
    <span className="icon-reverse-wrapper">
      <span className="btn-text">{children}</span>
      <span className="btn-icon" aria-hidden="true">
        <i className={icon} />
      </span>
      <span className="btn-icon" aria-hidden="true">
        <i className={icon} />
      </span>
    </span>
  );

  if (isPlainAnchor(href)) {
    const external = /^(https?:)?\/\//.test(href);
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
