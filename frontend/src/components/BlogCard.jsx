import { Link } from "react-router-dom";
import BlogImage from "./BlogImage";
import { formatDate, getCategory, readTime } from "../utils";

export default function BlogCard({ blog, featured = false }) {
  const category = getCategory(blog);
  const date = formatDate(blog.createdAt);
  const to = `/blogs/${blog._id}`;

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border border-line bg-panel transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_16px_48px_-16px_rgba(139,92,246,0.5)] ${
        featured ? "flex-col lg:col-span-3 lg:flex-row" : "flex-col"
      }`}
    >
      <Link
        to={to}
        tabIndex={-1}
        aria-hidden="true"
        className={featured ? "lg:w-3/5" : ""}
      >
        <BlogImage
          blog={blog}
          label={category}
          className={
            featured
              ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[320px]"
              : "aspect-[16/10]"
          }
        />
      </Link>

      <div className={`flex flex-1 flex-col gap-3 p-5 ${featured ? "lg:justify-center lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-glow/30 bg-glow/10 px-2.5 py-1 uppercase tracking-wider text-glow">
            {category}
          </span>
          {featured && (
            <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 uppercase tracking-wider text-brand">
              Featured
            </span>
          )}
          <span className="text-muted">{readTime(blog.content)} min read</span>
        </div>

        <h3 className={`font-bold leading-snug ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          <Link to={to} className="transition hover:text-glow">
            {blog.title}
          </Link>
        </h3>

        <p className={`text-sm text-muted ${featured ? "line-clamp-4 lg:text-base" : "line-clamp-3"}`}>
          {blog.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-ink">{blog.author}</p>
            {date && <p className="text-xs text-muted">{date}</p>}
          </div>
          <Link
            to={to}
            className="shrink-0 font-medium text-brand transition hover:text-glow"
          >
            Read Article <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
