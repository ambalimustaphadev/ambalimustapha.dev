import { BlogCard } from "@/components/writing/BlogCard";
import { TmpButton } from "@/components/ui/TmpButton";
import { posts } from "@/data/writing";

/** Demo 17 "Latest Blog" section (components/common/Blogs2.jsx), showing real articles. */
export function LatestWriting({
  parentClass = "blog-and-news-are tmp-section-gapTop",
}: {
  parentClass?: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className={parentClass} id="blog">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Blog</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Notes on Building Software <br />
            That People Depend On
          </h2>
        </div>
        <div className="row g-5">
          {posts.slice(0, 3).map((post, index) => (
            <div key={post.slug} className="col-lg-4 col-md-6 col-12">
              <BlogCard post={post} animationOrder={index + 1} />
            </div>
          ))}
        </div>
        <div className="text-center mt--50 tmp-scroll-trigger tmp-fade-in animation-order-1">
          <TmpButton href="/writing">View All Writing</TmpButton>
        </div>
      </div>
    </section>
  );
}
