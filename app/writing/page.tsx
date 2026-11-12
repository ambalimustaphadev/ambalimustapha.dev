import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/writing/BlogCard";
import { FUTURE_TOPICS, posts } from "@/data/writing";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description:
    "Notes and writing from Mustapha Ambali on backend development, mobile applications, and building software.",
  path: "/writing",
});

export default function WritingPage() {
  return (
    <div className="writing inner">
      <Breadcrumb title="Writing" />
      <section className="tmp-section-gap">
        <div className="container">
          <div className="section-head text-align-left mb--50">
            <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
              <span className="subtitle">Writing</span>
            </div>
            <h2 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
              Notes on Software &amp; Learning
            </h2>
            <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
              Notes on software, learning, and things I&apos;m figuring out.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="row g-5">
              {posts.map((post, index) => (
                <div key={post.slug} className="col-lg-4 col-md-6 col-12">
                  <BlogCard post={post} animationOrder={(index % 3) + 1} />
                </div>
              ))}
            </div>
          ) : (
            <div className="about-us-section-card">
              <div className="about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4 ambali-writing-empty">
                <p className="card-para">
                  I haven&apos;t published anything here yet. When I have something worth sharing
                  about a project, a technical problem, or something I&apos;ve learned, I&apos;ll
                  put it here.
                </p>
                <h3 className="card-title mt--30">Things I might write about</h3>
                <div className="tag-items">
                  <ul>
                    {FUTURE_TOPICS.map((topic) => (
                      <li key={topic}>
                        <span className="tag-item">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
