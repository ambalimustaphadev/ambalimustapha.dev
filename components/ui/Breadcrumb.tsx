import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href: string };

/** Reeni inner-page banner (breadcrumb-area) — holds the page's <h1>. */
export function Breadcrumb({ title, trail = [] }: { title: string; trail?: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  return (
    <div className="breadcrumb-area breadcrumb-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-inner text-center">
              <h1 className="title split-collab">{title}</h1>
              <nav aria-label="Breadcrumb">
                <ul className="page-list">
                  {crumbs.map((crumb) => (
                    <Fragment key={crumb.href}>
                      <li className="tmp-breadcrumb-item">
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </li>
                      <li className="icon" aria-hidden="true">
                        <i className="fa-solid fa-angle-right" />
                      </li>
                    </Fragment>
                  ))}
                  <li className="tmp-breadcrumb-item active" aria-current="page">
                    {title}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
