import Image from "next/image";
import Link from "next/link";
import { TmpButton } from "@/components/ui/TmpButton";
import { formatPostDate, readingMinutes } from "@/lib/writing";
import type { WritingPost } from "@/types";

/** Article card in the template's blog-card-style-two design (homepage + /writing). */
export function BlogCard({ post, animationOrder = 1 }: { post: WritingPost; animationOrder?: number }) {
  const href = `/writing/${post.slug}`;
  const [day, month] = formatPostDate(post.date).split(" ");

  return (
    <article
      className={`blog-card-style-two tmponhover image-box-hover ambali-blog-card tmp-scroll-trigger tmp-fade-in animation-order-${animationOrder}`}
    >
      <div className="blog-card-img">
        <div className="img-box">
          <Link href={href} tabIndex={-1} aria-hidden="true">
            <Image
              className="w-100 ambali-blog-card__image"
              src={post.cover.src}
              alt=""
              width={post.cover.width}
              height={post.cover.height}
              sizes="(min-width: 1200px) 410px, (min-width: 768px) 50vw, 100vw"
            />
          </Link>
        </div>
        <span>
          <time dateTime={post.date}>{`${day} ${month.slice(0, 3)}`}</time>
        </span>
      </div>
      <div className="blog-content-wrap">
        <div className="blog-tags">
          <ul>
            <li>
              <span className="ambali-blog-meta">
                <i className="fa-regular fa-folder" aria-hidden="true" />
                {post.category}
              </span>
            </li>
            <li>
              <span className="ambali-blog-meta">
                <i className="fa-regular fa-clock" aria-hidden="true" />
                {readingMinutes(post)} min read
              </span>
            </li>
          </ul>
        </div>
        <h3 className="blog-title">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="ambali-blog-card__excerpt">{post.excerpt}</p>
        <div className="read-more-btn">
          <TmpButton href={href} className="btn-border btn-md">
            Read More<span className="visually-hidden">: {post.title}</span>
          </TmpButton>
        </div>
      </div>
    </article>
  );
}
