import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TmpButton } from "@/components/ui/TmpButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// The template ships no 404 design, so this is assembled from Demo 17 parts:
// the inner-page banner, a centred section head and the template buttons.
export default function NotFound() {
  return (
    <div className="not-found inner">
      <Breadcrumb title="Page Not Found" />
      <section className="tmp-section-gap">
        <div className="container">
          <div className="section-head ambali-not-found">
            <div className="section-sub-title center-title">
              <span className="subtitle">Error 404</span>
            </div>
            <p className="ambali-not-found__code" aria-hidden="true">
              404
            </p>
            <h2 className="title">This page doesn&apos;t exist</h2>
            <p className="description section-sm">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <div className="ambali-not-found__actions">
              <TmpButton href="/">Back to Home</TmpButton>
              <TmpButton href="/projects" className="btn-border">
                View My Work
              </TmpButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
