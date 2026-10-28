import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../api";
import Container from "../components/Container";
import BlogImage from "../components/BlogImage";
import Alert from "../components/Alert";
import { formatDate, getCategory, readTime } from "../utils";

// Plain text is shown as paragraphs; text between ``` fences becomes a code block
function ArticleContent({ text }) {
  return text.split("```").map((part, i) => {
    if (i % 2 === 1) {
      return (
        <pre
          key={i}
          className="my-6 overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-sm leading-relaxed text-glow"
        >
          <code>{part.replace(/^[\w-]*\n/, "").trimEnd()}</code>
        </pre>
      );
    }
    if (!part.trim()) return null;
    return (
      <p key={i} className="whitespace-pre-wrap">
        {part.trim()}
      </p>
    );
  });
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setBlog(null);
    setError("");
    getBlog(id)
      .then(setBlog)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error)
    return (
      <Container size="narrow" className="space-y-4 py-12">
        <Alert type="error">{error}</Alert>
        <Link to="/" className="text-sm text-brand hover:text-glow">
          ← Back to blogs
        </Link>
      </Container>
    );

  if (!blog)
    return (
      <Container
        size="narrow"
        className="animate-pulse space-y-4 py-12"
        aria-busy="true"
      >
        <div className="h-4 w-28 rounded bg-line/50" />
        <div className="aspect-[16/9] rounded-2xl bg-line/40" />
        <div className="h-9 w-3/4 rounded bg-line/50" />
        <div className="h-4 w-full rounded bg-line/40" />
        <div className="h-4 w-5/6 rounded bg-line/40" />
      </Container>
    );

  const category = getCategory(blog);
  const date = formatDate(blog.createdAt);

  return (
    <Container size="narrow" className="py-10 sm:py-14">
      <Link to="/" className="text-sm text-muted transition hover:text-glow">
        ← Back to blogs
      </Link>

      <article className="mt-6">
        <BlogImage
          blog={blog}
          label={category}
          className="aspect-[16/9] rounded-2xl border border-line"
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-glow/30 bg-glow/10 px-2.5 py-1 uppercase tracking-wider text-glow">
            {category}
          </span>
          <span className="text-muted">{readTime(blog.content)} min read</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {blog.title}
        </h1>

        <p className="mt-4 text-lg text-muted">{blog.description}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 text-sm">
          <p>
            <span className="font-medium text-ink">By {blog.author}</span>
            {date && <span className="text-muted"> · {date}</span>}
          </p>
          <Link
            to={`/edit/${blog._id}`}
            className="rounded-lg border border-line px-3 py-1.5 text-muted transition hover:border-brand hover:text-ink"
          >
            Edit
          </Link>
        </div>

        <div className="mt-8 space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
          <ArticleContent text={blog.content || ""} />
        </div>
      </article>
    </Container>
  );
}
